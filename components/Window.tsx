import React, { useRef } from 'react';
import type { WindowInstance } from '../types';
import { useDesktop } from '../context/DesktopContext';
import { APP_DEFINITIONS } from '../constants';
import { CloseIcon, MaximizeIcon, MinimizeIcon, RestoreIcon } from '../assets/icons';
import useDraggable from '../hooks/useDraggable';
import useResizable from '../hooks/useResizable';

const Window: React.FC<WindowInstance> = (win) => {
    const { id, appId, title, icon, x, y, width, height, isMaximized, zIndex, data } = win;
    const { closeWindow, focusWindow, toggleMinimize, toggleMaximize } = useDesktop();
    const windowRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useDraggable(windowRef, headerRef, win);
    useResizable(windowRef, win);

    const AppContent = APP_DEFINITIONS[appId]?.component;
    if (!AppContent) return null;

    const windowClasses = [
        "absolute bg-[#2b2b2b]/80 backdrop-blur-xl text-white rounded-lg window-shadow flex flex-col border border-white/10",
        isMaximized ? "top-0 left-0 w-full h-[calc(100%-3rem)] rounded-none border-0" : "",
    ].join(' ');

    return (
        <div
            ref={windowRef}
            className={windowClasses}
            style={isMaximized ? { zIndex } : { top: y, left: x, width, height, zIndex }}
            onMouseDown={() => focusWindow(id)}
        >
            <div ref={headerRef} className="flex items-center justify-between h-10 px-1 bg-[#202020]/60 rounded-t-lg cursor-grab active:cursor-grabbing flex-shrink-0">
                <div className="flex items-center gap-2 pl-2">
                    {icon}
                    <span className="text-sm">{title}</span>
                </div>
                <div className="flex items-center">
                    <button className="h-full px-4 flex items-center justify-center hover:bg-white/10" onClick={() => toggleMinimize(id)}><MinimizeIcon /></button>
                    <button className="h-full px-4 flex items-center justify-center hover:bg-white/10" onClick={() => toggleMaximize(id)}>{isMaximized ? <RestoreIcon /> : <MaximizeIcon />}</button>
                    <button className="h-full px-4 flex items-center justify-center hover:bg-red-500 rounded-tr-lg" onClick={() => closeWindow(id)}><CloseIcon /></button>
                </div>
            </div>
            <div className="flex-grow overflow-auto bg-[#202020]">
                <AppContent windowId={id} data={data} />
            </div>
            {!isMaximized && (
                <>
                    <div className="absolute -left-1 -top-1 w-2 h-2 cursor-nwse-resize resizer" data-direction="top-left"></div>
                    <div className="absolute -right-1 -top-1 w-2 h-2 cursor-nesw-resize resizer" data-direction="top-right"></div>
                    <div className="absolute -left-1 -bottom-1 w-2 h-2 cursor-nesw-resize resizer" data-direction="bottom-left"></div>
                    <div className="absolute -right-1 -bottom-1 w-2 h-2 cursor-nwse-resize resizer" data-direction="bottom-right"></div>
                    <div className="absolute top-0 -left-1 w-2 h-full cursor-ew-resize resizer" data-direction="left"></div>
                    <div className="absolute top-0 -right-1 w-2 h-full cursor-ew-resize resizer" data-direction="right"></div>
                    <div className="absolute left-0 -top-1 w-full h-2 cursor-ns-resize resizer" data-direction="top"></div>
                    <div className="absolute left-0 -bottom-1 w-full h-2 cursor-ns-resize resizer" data-direction="bottom"></div>
                </>
            )}
        </div>
    );
};

export default Window;