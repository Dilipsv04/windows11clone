
import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import type { WindowInstance, DesktopContextType, ContextMenuData, FileSystemItem, ClipboardItem } from '../types';
import { APP_DEFINITIONS, INITIAL_FILE_SYSTEM } from '../constants';

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

// Pure recursive helper to create a deep copy of a file/folder with new IDs
const deepCloneItem = (item: FileSystemItem): FileSystemItem => {
    const newItem: FileSystemItem = {
        ...item,
        id: `fs-item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: item.name.includes(" - Copy") ? item.name : `${item.name} - Copy`,
    };
    if (item.type === 'folder' && Array.isArray(item.content)) {
        newItem.content = item.content.map(child => deepCloneItem(child));
    }
    return newItem;
};

// Pure recursive helper to add an item to the file system tree
const addRecursive = (node: FileSystemItem, itemToAdd: FileSystemItem, parentId: string): FileSystemItem => {
    if (node.id === parentId && node.type === 'folder') {
        return {
            ...node,
            content: [...(Array.isArray(node.content) ? node.content : []), itemToAdd]
        };
    }
    if (node.type === 'folder' && Array.isArray(node.content)) {
        return {
            ...node,
            content: node.content.map(child => addRecursive(child, itemToAdd, parentId)),
        };
    }
    return node;
};

// Pure recursive helper to delete an item from the file system tree
const deleteRecursive = (node: FileSystemItem, itemId: string): FileSystemItem | null => {
    if (node.id === itemId) {
        return null;
    }
    if (node.type === 'folder' && Array.isArray(node.content)) {
        return {
            ...node,
            content: node.content
                .map(child => deleteRecursive(child, itemId))
                .filter((child): child is FileSystemItem => child !== null),
        };
    }
    return node;
};


export const DesktopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [windows, setWindows] = useState<WindowInstance[]>([]);
    const [fileSystem, setFileSystem] = useState<FileSystemItem>(INITIAL_FILE_SYSTEM);
    const [wallpaper, setWallpaper] = useState<string>('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXlrajZsbGIyOTY5c3A1b3l2N3g0eG9weWFjbXdna2t3dWtwd2dnayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hXMCde68zjgrvhWBDr/giphy.gif');
    const [contextMenu, setContextMenu] = useState<ContextMenuData | null>(null);
    const [nextZIndex, setNextZIndex] = useState(10);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [clipboard, setClipboard] = useState<ClipboardItem>({ item: null, mode: null });

    const openApp = useCallback((appId: string, data?: any) => {
        const appDef = APP_DEFINITIONS[appId];
        if (!appDef) return;

        if (appDef.externalUrl) {
            window.open(appDef.externalUrl, '_blank', 'noopener,noreferrer');
            return;
        }

        setWindows(prev => {
            const newZIndex = nextZIndex + 1;
            setNextZIndex(newZIndex);
            
            const windowData = { ...(appDef.baseData || {}), ...(data || {}) };

            const newWindow: WindowInstance = {
                id: `win_${Date.now()}`,
                appId,
                title: data?.name || appDef.name,
                icon: appDef.icon,
                x: 100 + (prev.length % 10) * 30,
                y: 100 + (prev.length % 10) * 30,
                width: 800,
                height: 600,
                isMaximized: false,
                isMinimized: false,
                zIndex: newZIndex,
                data: windowData, // Pass merged data to the window instance
            };
            setActiveWindowId(newWindow.id);
            return [...prev, newWindow];
        });
    }, [nextZIndex]);
    
    const addFileSystemItem = useCallback((item: FileSystemItem, parentId: string) => {
        setFileSystem(currentFs => addRecursive(currentFs, item, parentId));
    }, []);

    const deleteFileSystemItem = useCallback((itemId: string) => {
        setFileSystem(currentFs => deleteRecursive(currentFs, itemId) || currentFs);
    }, []);

    const updateFileSystemItem = useCallback((itemId: string, updates: Partial<FileSystemItem>) => {
        const findAndUpdate = (node: FileSystemItem): FileSystemItem => {
            if (node.id === itemId) {
                return { ...node, ...updates };
            }
    
            if (node.type === 'folder' && Array.isArray(node.content)) {
                return {
                    ...node,
                    content: node.content.map(child => findAndUpdate(child)),
                };
            }
    
            return node;
        };
    
        setFileSystem(currentFs => findAndUpdate(currentFs));
    }, []);

    const pasteFromClipboard = useCallback((parentId: string) => {
        if (!clipboard.item) return;
        const { item, mode } = clipboard;

        // Prevent pasting a folder into itself or one of its own children
        if (item.type === 'folder' && item.id === parentId) return;
        
        const findItemById = (root: FileSystemItem, id: string): FileSystemItem | null => {
            if (root.id === id) return root;
            if (root.type === 'folder' && Array.isArray(root.content)) {
                for (const child of root.content) {
                    const found = findItemById(child, id);
                    if (found) return found;
                }
            }
            return null;
        };
        
        if (item.type === 'folder' && findItemById(item, parentId)) {
            console.error("Cannot paste a folder into one of its own subdirectories.");
            return;
        }

        if (mode === 'cut') {
            setFileSystem(currentFs => {
                const fsWithoutItem = deleteRecursive(currentFs, item.id);
                if (!fsWithoutItem) return currentFs; // Should not happen if not deleting root
                return addRecursive(fsWithoutItem, item, parentId);
            });
            setClipboard({ item: null, mode: null });
        } else if (mode === 'copy') {
            const newItem = deepCloneItem(item);
            addFileSystemItem(newItem, parentId);
        }
    }, [clipboard, addFileSystemItem]);


    const closeWindow = useCallback((id: string) => {
        setWindows(prev => {
            const remainingWindows = prev.filter(win => win.id !== id);
            if (activeWindowId === id) {
                if (remainingWindows.length > 0) {
                    const topWindow = [...remainingWindows].sort((a, b) => b.zIndex - a.zIndex)[0];
                    setActiveWindowId(topWindow.id);
                } else {
                    setActiveWindowId(null);
                }
            }
            return remainingWindows;
        });
    }, [activeWindowId]);

    const focusWindow = useCallback((id:string) => {
        if (windows.find(w => w.id === id)?.zIndex === nextZIndex && activeWindowId === id) {
            // If it's already the top-most and active window, and we're not un-minimizing, do nothing.
            const win = windows.find(w => w.id === id);
            if(win && !win.isMinimized) return;
        };
        
        const newZIndex = nextZIndex + 1;
        setNextZIndex(newZIndex);
        setWindows(prev => prev.map(win => win.id === id ? { ...win, zIndex: newZIndex, isMinimized: false } : win));
        setActiveWindowId(id);
    }, [nextZIndex, windows, activeWindowId]);

    const toggleMinimize = useCallback((id: string) => {
        setWindows(prev => prev.map(win => {
            if (win.id === id) {
                if (!win.isMinimized && id === activeWindowId) {
                    const otherWindows = prev.filter(w => w.id !== id && !w.isMinimized);
                    const nextActive = otherWindows.length > 0 ? [...otherWindows].sort((a, b) => b.zIndex - a.zIndex)[0].id : null;
                    setActiveWindowId(nextActive);
                }
                return { ...win, isMinimized: !win.isMinimized };
            }
            return win;
        }));
    }, [activeWindowId]);
    
    const toggleMaximize = useCallback((id: string) => {
      setWindows(prev => prev.map(win => win.id === id ? { ...win, isMaximized: !win.isMaximized } : win));
    }, []);

    const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
        setWindows(prev => prev.map(win => win.id === id ? { ...win, x, y } : win));
    }, []);

    const updateWindowSize = useCallback((id: string, width: number, height: number) => {
        setWindows(prev => prev.map(win => win.id === id ? { ...win, width, height } : win));
    }, []);
    
    const runningApps = useMemo(() => {
        return windows.reduce((acc, win) => {
            if (!win.isMinimized) {
                acc[win.appId] = (acc[win.appId] || 0) + 1;
            }
            return acc;
        }, {} as { [key: string]: number });
    }, [windows]);

    const value: DesktopContextType = {
        windows,
        openApp,
        closeWindow,
        focusWindow,
        toggleMinimize,
        toggleMaximize,
        updateWindowPosition,
        updateWindowSize,
        wallpaper,
        setWallpaper: (url: string) => setWallpaper(url),
        contextMenu,
        setContextMenu,
        runningApps,
        activeWindowId,
        fileSystem,
        setFileSystem,
        addFileSystemItem,
        deleteFileSystemItem,
        updateFileSystemItem,
        clipboard,
        setClipboard: (item, mode) => setClipboard({ item, mode }),
        pasteFromClipboard,
    };

    return <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>;
};

export const useDesktop = (): DesktopContextType => {
    const context = useContext(DesktopContext);
    if (context === undefined) {
        throw new Error('useDesktop must be used within a DesktopProvider');
    }
    return context;
};