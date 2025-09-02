import React, { useState, useEffect } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { APP_DEFINITIONS } from '../constants';
import StartMenu from './StartMenu';
import ContextMenu from './ContextMenu';
import { WindowsIcon, CloseIcon, PinIcon } from '../assets/icons';
import type { ContextMenuItem } from '../types';

const Taskbar: React.FC = () => {
    const { windows, focusWindow, toggleMinimize, openApp, closeWindow, setContextMenu, contextMenu, activeWindowId } = useDesktop();
    const [time, setTime] = useState(new Date());
    const [isStartMenuOpen, setStartMenuOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const pinnedApps = ['browser', 'file-explorer', 'store', 'settings'];

    const handleAppClick = (appId: string) => {
        const openWindows = windows.filter(w => w.appId === appId);
        if (openWindows.length > 0) {
            const topWindow = openWindows.sort((a, b) => b.zIndex - a.zIndex)[0];
            const isActive = topWindow.id === activeWindowId;

            if (isActive && !topWindow.isMinimized) {
                toggleMinimize(topWindow.id);
            } else {
                focusWindow(topWindow.id);
            }
        } else {
            openApp(appId);
        }
    };

    const handleIconRightClick = (e: React.MouseEvent, appId: string) => {
        e.preventDefault();
        e.stopPropagation();

        const openWindowsForApp = windows.filter(win => win.appId === appId);

        const items: ContextMenuItem[] = [
            ...openWindowsForApp.map(win => ({
                label: `Close ${win.title}`,
                icon: <CloseIcon />,
                action: () => closeWindow(win.id),
            })),
            { label: 'Close all windows', action: () => openWindowsForApp.forEach(win => closeWindow(win.id)), separator: openWindowsForApp.length > 0 },
            { label: `${APP_DEFINITIONS[appId].name}`, action: () => openApp(appId) },
            { label: 'Unpin from taskbar', icon: <PinIcon />, action: () => { /* Pinning logic */ } },
        ];

        const rect = e.currentTarget.getBoundingClientRect();
        const menuHeight = items.length * 36 + 10;
        setContextMenu({ x: rect.left, y: rect.top - menuHeight, items });
    };

    const taskbarApps = [...new Set([...pinnedApps, ...windows.map(w => w.appId)])];

    return (
        <>
            {contextMenu && <ContextMenu {...contextMenu} />}
            <div 
                className="absolute bottom-0 left-0 right-0 h-12 bg-[#202020]/70 backdrop-blur-xl flex items-center justify-center z-[1000]"
                onClick={() => setContextMenu(null)}
            >
                <div className="flex items-center">
                    <button
                        className="p-3 text-white rounded-md hover:bg-white/20 transition-colors"
                        onClick={() => setStartMenuOpen(!isStartMenuOpen)}
                    >
                        <WindowsIcon />
                    </button>
                    {taskbarApps.map(appId => {
                        const appDef = APP_DEFINITIONS[appId];
                        if (!appDef) return null;
                        
                        const isRunning = windows.some(w => w.appId === appId);
                        const isActive = windows.some(w => w.appId === appId && w.id === activeWindowId && !w.isMinimized);

                        return (
                            <button
                                key={appId}
                                className="p-3 text-white rounded-md hover:bg-white/20 relative h-full flex items-center"
                                onClick={() => handleAppClick(appId)}
                                onContextMenu={(e) => handleIconRightClick(e, appId)}
                            >
                                {React.isValidElement(appDef.icon) ? React.cloneElement(appDef.icon, { className: 'w-6 h-6' }) : appDef.icon}
                                {isRunning && (
                                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] bg-blue-400 rounded-full transition-all duration-200 ${isActive ? 'w-8' : 'w-5'}`}></span>
                                )}
                            </button>
                        );
                    })}
                </div>
                <div className="absolute right-0 top-0 h-full flex items-center text-white text-xs px-4 text-center">
                    <div>
                        <div>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        <div>{time.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                </div>
            </div>
            <StartMenu isOpen={isStartMenuOpen} onClose={() => setStartMenuOpen(false)} />
        </>
    );
};

export default Taskbar;