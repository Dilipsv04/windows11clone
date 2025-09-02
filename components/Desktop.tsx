
import React, { useState, useCallback, useRef, useMemo } from 'react';
import { useDesktop } from '../context/DesktopContext';
import Window from './Window';
import ContextMenu from './ContextMenu';
import SelectionBox from './SelectionBox';
import type { FileSystemItem, ContextMenuItem } from '../types';
import { PictureIcon, TextFileIcon, FileIcon, VideoFileIcon, AudioFileIcon, PDFFileIcon } from '../assets/icons';

const findItemById = (root: FileSystemItem, id: string): FileSystemItem | null => {
    if (root.id === id) return root;
    if (root.type === 'folder' && Array.isArray(root.content)) {
        for (const item of root.content) {
            const found = findItemById(item, id);
            if (found) return found;
        }
    }
    return null;
};

const Desktop: React.FC = () => {
    const { windows, wallpaper, openApp, setContextMenu, contextMenu, addFileSystemItem, deleteFileSystemItem, fileSystem, updateFileSystemItem } = useDesktop();
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [selectionBox, setSelectionBox] = useState<{ x: number, y: number, width: number, height: number } | null>(null);
    const [startPos, setStartPos] = useState<{ x: number, y: number } | null>(null);
    const desktopRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const wasDragged = useRef(false);
    const [draggingItem, setDraggingItem] = useState<{ id: string, offsetX: number, offsetY: number } | null>(null);

    const desktopItems = useMemo(() => {
        const desktopFolder = findItemById(fileSystem, 'desktop');
        return (desktopFolder?.content as FileSystemItem[]) || [];
    }, [fileSystem]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0 || (e.target as HTMLElement).closest('[data-desktop-item="true"]') || (e.target as HTMLElement).closest('.window-shadow')) {
            return;
        }
        
        setContextMenu(null);
        setStartPos({ x: e.clientX, y: e.clientY });
        setSelectionBox({ x: e.clientX, y: e.clientY, width: 0, height: 0 });
        if (!e.ctrlKey && !e.shiftKey) {
            setSelectedItems(new Set());
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (draggingItem && desktopRef.current) {
            wasDragged.current = true;
            const desktopRect = desktopRef.current.getBoundingClientRect();
            const newX = e.clientX - desktopRect.left - draggingItem.offsetX;
            const newY = e.clientY - desktopRect.top - draggingItem.offsetY;
            updateFileSystemItem(draggingItem.id, { x: newX, y: newY });
            return;
        }

        if (!startPos) return;

        const x = Math.min(startPos.x, e.clientX);
        const y = Math.min(startPos.y, e.clientY);
        const width = Math.abs(startPos.x - e.clientX);
        const height = Math.abs(startPos.y - e.clientY);

        setSelectionBox({ x, y, width, height });

        const newSelectedItems = new Set(selectedItems);
        desktopItems.forEach(item => {
            const itemElement = document.getElementById(item.id);
            if (itemElement) {
                const rect = itemElement.getBoundingClientRect();
                const box = {x, y, width, height};
                const intersects = rect.left < box.x + box.width &&
                                   rect.left + rect.width > box.x &&
                                   rect.top < box.y + box.height &&
                                   rect.top + rect.height > box.y;
                if (intersects) {
                    newSelectedItems.add(item.id);
                } else if (!e.ctrlKey && !e.shiftKey) {
                    newSelectedItems.delete(item.id);
                }
            }
        });
        setSelectedItems(newSelectedItems);
    };

    const handleMouseUp = () => {
        setStartPos(null);
        setSelectionBox(null);
        setDraggingItem(null);
        setTimeout(() => { wasDragged.current = false; }, 0);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        for (const file of files) {
             const getAppAndIcon = (mimeType: string) => {
                const iconClass = "w-12 h-12";
                if (mimeType.startsWith('image/')) return { appId: 'image-viewer', icon: <PictureIcon className={iconClass} /> };
                if (mimeType.startsWith('text/')) return { appId: 'notepad', icon: <TextFileIcon className={iconClass} /> };
                if (mimeType.startsWith('video/')) return { appId: 'video-audio-player', icon: <VideoFileIcon className={iconClass} /> };
                if (mimeType.startsWith('audio/')) return { appId: 'video-audio-player', icon: <AudioFileIcon className={iconClass} /> };
                if (mimeType === 'application/pdf') return { appId: 'pdf-viewer', icon: <PDFFileIcon className={iconClass} /> };
                return { appId: undefined, icon: <FileIcon className={iconClass} /> };
            };

            const { appId, icon } = getAppAndIcon(file.type);
            
            let content;
            if (appId === 'notepad') {
                content = await file.text();
            } else if (appId) {
                content = URL.createObjectURL(file);
            } else {
                content = null;
            }
            const itemId = `fs-item-${Date.now()}-${file.name}`;
            const newItem: FileSystemItem = {
                id: itemId,
                name: file.name,
                icon: icon,
                type: 'file',
                appId: appId,
                content: content,
                mimeType: file.type,
                dateModified: file.lastModified,
                size: file.size,
                x: Math.random() * 200 + 200,
                y: Math.random() * 200 + 50,
                data: {
                    id: itemId,
                    name: file.name,
                    content: content,
                    mimeType: file.type,
                }
            };
            addFileSystemItem(newItem, 'desktop');
        }
        e.target.value = '';
    };
    
    const handleBackgroundContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (target.closest('[data-desktop-item="true"]')) return;

        const items: ContextMenuItem[] = [
            { label: 'Refresh', action: () => console.log('Refresh') },
            { label: 'Import files', action: handleImportClick, separator: true },
            { label: 'New', action: () => {} },
            { label: 'Display settings', action: () => openApp('settings'), separator: true },
            { label: 'Personalize', action: () => openApp('settings') },
        ];
        setContextMenu({ x: e.clientX, y: e.clientY, items });
    };

    const handleItemContextMenu = (e: React.MouseEvent, item: FileSystemItem) => {
        e.preventDefault();
        e.stopPropagation();
        let items: ContextMenuItem[];

        if (item.type === 'file') {
            items = [
                { label: 'Open', action: () => handleItemDoubleClick(item) },
                { label: 'Delete', action: () => deleteFileSystemItem(item.id), separator: true },
                { label: 'Properties', action: () => {} },
            ];
        } else { // 'app' or 'folder'
             items = [
                { label: 'Open', action: () => handleItemDoubleClick(item) },
                { label: 'Properties', action: () => {} },
            ];
        }
        setContextMenu({ x: e.clientX, y: e.clientY, items });
    };

    const handleItemMouseDown = (e: React.MouseEvent, item: FileSystemItem) => {
        e.stopPropagation();
        if (e.button !== 0) return;

        if (!e.ctrlKey && !selectedItems.has(item.id)) {
            setSelectedItems(new Set([item.id]));
        }

        const targetElement = e.currentTarget as HTMLElement;
        const rect = targetElement.getBoundingClientRect();
        
        setDraggingItem({
            id: item.id,
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top,
        });
    };
    
    const handleItemClick = (e: React.MouseEvent, item: FileSystemItem) => {
        e.stopPropagation();
        if (wasDragged.current) return;

        if (e.ctrlKey) {
            setSelectedItems(prev => {
                const newSet = new Set(prev);
                if (newSet.has(item.id)) {
                    newSet.delete(item.id);
                } else {
                    newSet.add(item.id);
                }
                return newSet;
            });
        } else {
            setSelectedItems(new Set([item.id]));
        }
    };


    const handleItemDoubleClick = (item: FileSystemItem) => {
        if (item.appId) {
            const launchData = item.type === 'file' ? item : item.data;
            if (item.type === 'file' && item.content === null) return;
            openApp(item.appId, launchData);
        }
    };

    return (
        <div
            ref={desktopRef}
            className="absolute inset-0 h-full w-full"
            style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onContextMenu={handleBackgroundContextMenu}
            onClick={(e) => {
                if ((e.target as HTMLElement) === desktopRef.current) {
                    setContextMenu(null)
                    setSelectedItems(new Set());
                }
            }}
        >
            <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                style={{ display: 'none' }}
                aria-hidden="true"
            />
            <div className="p-4 h-full relative">
                {desktopItems.map((item) => (
                    <div
                        key={item.id}
                        id={item.id}
                        data-desktop-item="true"
                        className={`absolute flex flex-col items-center justify-start p-2 rounded-md transition-colors duration-100 w-[90px] h-[90px] cursor-pointer`}
                        style={{ left: item.x || 0, top: item.y || 0, backgroundColor: selectedItems.has(item.id) ? 'rgba(0, 120, 215, 0.3)' : 'transparent' }}
                        onMouseDown={(e) => handleItemMouseDown(e, item)}
                        onClick={(e) => handleItemClick(e, item)}
                        onDoubleClick={() => handleItemDoubleClick(item)}
                        onContextMenu={(e) => handleItemContextMenu(e, item)}
                    >
                        <div className="w-12 h-12">
                            {item.icon}
                        </div>
                        <span 
                            className="text-white text-xs text-center mt-1" 
                            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}
                        >
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
            
            {windows.filter(w => !w.isMinimized).map(win => <Window key={win.id} {...win} />)}
            
            {contextMenu && <ContextMenu {...contextMenu} />}
            {selectionBox && <SelectionBox {...selectionBox} />}
        </div>
    );
};

export default Desktop;