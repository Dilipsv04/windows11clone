
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useDesktop } from '../context/DesktopContext';
import type { FileSystemItem, ContextMenuItem } from '../types';
import { RECENT_FILES } from '../constants';
import { 
    FolderIcon, CloseIcon, ChevronRightIcon, SearchIcon, PictureIcon, TextFileIcon, FileIcon,
    ViewIcon, DetailsIcon, ChevronDownIcon, CutIcon, CopyIcon, PasteIcon, VideoFileIcon, AudioFileIcon, PDFFileIcon
} from '../assets/icons';

const NavItem: React.FC<{icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void}> = ({ icon, label, active, onClick }) => (
    <div className={`flex items-center gap-3 px-3 py-1.5 rounded-md cursor-pointer ${active ? 'bg-white/10' : 'hover:bg-white/20'}`} onClick={onClick}>
        {icon}
        <span className="text-sm">{label}</span>
    </div>
);

// Helpers
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

const findPath = (root: FileSystemItem, id: string): FileSystemItem[] | null => {
    if (root.id === id) return [root];
    if (root.type === 'folder' && Array.isArray(root.content)) {
        for (const item of root.content) {
            const path = findPath(item, id);
            if (path) return [root, ...path];
        }
    }
    return null;
};

const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const FileExplorer: React.FC<{ windowId: string }> = () => {
    const { 
        openApp, setWallpaper, setContextMenu, fileSystem, addFileSystemItem, 
        deleteFileSystemItem, updateFileSystemItem, clipboard, setClipboard, pasteFromClipboard
    } = useDesktop();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [tabs, setTabs] = useState<string[]>(['root']);
    const [activeTab, setActiveTab] = useState(0);
    const [histories, setHistories] = useState<{ [key: number]: string[] }>({ 0: ['root'] });
    const [historyIndices, setHistoryIndices] = useState<{ [key: number]: number }>({ 0: 0 });
    
    // Functional State
    const [viewMode, setViewMode] = useState<'grid' | 'details'>('grid');
    const [sortConfig, setSortConfig] = useState<{ key: keyof FileSystemItem | 'type'; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
    const [renamingId, setRenamingId] = useState<string | null>(null);

    const currentDirId = histories[activeTab]?.[historyIndices[activeTab]] || 'root';
    const currentDirectory = useMemo(() => findItemById(fileSystem, currentDirId) || fileSystem, [fileSystem, currentDirId]);
    const currentPath = useMemo(() => findPath(fileSystem, currentDirId) || [fileSystem], [fileSystem, currentDirId]);

    const sortedContent = useMemo(() => {
        const content = Array.isArray(currentDirectory.content) ? [...currentDirectory.content] : [];
        if (sortConfig.key) {
            content.sort((a, b) => {
                if (a.type === 'folder' && b.type !== 'folder') return -1;
                if (a.type !== 'folder' && b.type === 'folder') return 1;

                const aVal = a[sortConfig.key] ?? '';
                const bVal = b[sortConfig.key] ?? '';
                
                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return sortConfig.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
                }
                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return content;
    }, [currentDirectory.content, sortConfig]);

    const navigateTo = (dirId: string) => {
        setRenamingId(null);
        const currentHistory = histories[activeTab]?.slice(0, historyIndices[activeTab] + 1) || [];
        const newHistory = [...currentHistory, dirId];
        setHistories(prev => ({ ...prev, [activeTab]: newHistory }));
        setHistoryIndices(prev => ({ ...prev, [activeTab]: newHistory.length - 1 }));
        const newTabs = [...tabs];
        newTabs[activeTab] = dirId;
        setTabs(newTabs);
    };
    
    const goBack = () => historyIndices[activeTab] > 0 && setHistoryIndices(prev => ({ ...prev, [activeTab]: prev[activeTab] - 1 }));
    const goForward = () => historyIndices[activeTab] < (histories[activeTab]?.length || 0) - 1 && setHistoryIndices(prev => ({ ...prev, [activeTab]: prev[activeTab] - 1 }));
    const goUp = () => {
        if (currentPath.length > 1) {
            navigateTo(currentPath[currentPath.length - 2].id);
        }
    }

    const handleItemDoubleClick = (item: FileSystemItem) => {
        if (item.type === 'folder') navigateTo(item.id);
        else if (item.appId) openApp(item.appId, item);
    };

    const addTab = () => {
        const newTabIndex = tabs.length;
        setTabs([...tabs, 'root']);
        setHistories(prev => ({ ...prev, [newTabIndex]: ['root'] }));
        setHistoryIndices(prev => ({ ...prev, [newTabIndex]: 0 }));
        setActiveTab(newTabIndex);
    };

    const closeTab = (index: number) => {
        if (tabs.length === 1) return;
        const newTabs = tabs.filter((_, i) => i !== index);
        setTabs(newTabs);
        setActiveTab(0);
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        for (const file of files) {
             const getAppAndIcon = (mimeType: string) => {
                if (mimeType.startsWith('image/')) return { appId: 'image-viewer', icon: <PictureIcon /> };
                if (mimeType.startsWith('text/')) return { appId: 'notepad', icon: <TextFileIcon /> };
                if (mimeType.startsWith('video/')) return { appId: 'video-audio-player', icon: <VideoFileIcon /> };
                if (mimeType.startsWith('audio/')) return { appId: 'video-audio-player', icon: <AudioFileIcon /> };
                if (mimeType === 'application/pdf') return { appId: 'pdf-viewer', icon: <PDFFileIcon /> };
                return { appId: undefined, icon: <FileIcon /> };
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
            
            const newItemId = `fs-item-${Date.now()}-${file.name}`;
            addFileSystemItem({
                id: newItemId,
                name: file.name, icon, type: 'file', appId, content, mimeType: file.type,
                dateModified: file.lastModified,
                size: file.size,
                data: { id: newItemId, name: file.name, content, mimeType: file.type }
            }, currentDirId);
        }
        e.target.value = '';
    };

    const handleNewFolder = () => {
        const newFolder: FileSystemItem = {
            id: `fs-item-${Date.now()}-new-folder`,
            name: 'New folder', type: 'folder', icon: <FolderIcon />, content: [],
            dateModified: Date.now(), size: 0,
        };
        addFileSystemItem(newFolder, currentDirId);
        setRenamingId(newFolder.id);
    };

    const handleRename = (itemId: string, newName: string) => {
        if (newName.trim()) {
            updateFileSystemItem(itemId, { name: newName.trim() });
        }
        setRenamingId(null);
    };

    const handleSort = (key: keyof FileSystemItem | 'type') => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleItemContextMenu = (e: React.MouseEvent, item: FileSystemItem) => {
        e.preventDefault();
        e.stopPropagation();
        let items: ContextMenuItem[] = [
            { label: 'Open', action: () => handleItemDoubleClick(item) },
            { label: 'Cut', icon: <CutIcon />, action: () => setClipboard(item, 'cut') },
            { label: 'Copy', icon: <CopyIcon />, action: () => setClipboard(item, 'copy'), separator: true },
            { label: 'Rename', action: () => setRenamingId(item.id) },
            { label: 'Delete', action: () => deleteFileSystemItem(item.id), separator: true },
            { label: 'Properties', action: () => {} }
        ];
        if (item.type === 'file' && item.mimeType?.startsWith('image/')) {
             items.splice(1, 0, { label: 'Set as background', action: () => {
                if (typeof item.content === 'string') setWallpaper(item.content);
             }});
        }
        setContextMenu({x: e.clientX, y: e.clientY, items });
    };

    const handleBackgroundContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // BUG FIX: Prevents desktop context menu from opening
        if ((e.target as HTMLElement).closest('[data-fs-item="true"]')) return;
        
        const menuItems: ContextMenuItem[] = [
            { label: 'Import files', action: () => fileInputRef.current?.click() },
            { label: 'New folder', action: handleNewFolder, separator: true },
        ];

        if (clipboard.item) {
            menuItems.splice(1, 0, { label: 'Paste', icon: <PasteIcon/>, action: () => pasteFromClipboard(currentDirId) });
        }

        menuItems.push({ label: 'Properties', action: () => {} });

        setContextMenu({ x: e.clientX, y: e.clientY, items: menuItems});
    };

    const renderGridItem = (item: FileSystemItem) => {
        const isCut = clipboard.mode === 'cut' && clipboard.item?.id === item.id;
        return (
            <div 
                key={item.id}
                data-fs-item="true"
                onDoubleClick={() => handleItemDoubleClick(item)} 
                onContextMenu={(e) => handleItemContextMenu(e, item)} 
                className={`flex flex-col items-center p-2 rounded-md hover:bg-white/10 cursor-pointer text-center w-full ${isCut ? 'opacity-50' : ''}`}
            >
                {React.isValidElement(item.icon) ? React.cloneElement(item.icon, { className: "w-16 h-16" }) : item.icon}
                {renamingId === item.id ? (
                     <input
                        type="text"
                        defaultValue={item.name}
                        autoFocus
                        onBlur={(e) => handleRename(item.id, e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRename(item.id, e.currentTarget.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gray-900 text-white text-sm text-center border border-blue-500 rounded-sm w-full mt-2"
                    />
                ) : (
                    <p className="font-semibold text-sm mt-2 break-words w-full">{item.name}</p>
                )}
            </div>
        );
    }

    const renderDetailsItem = (item: FileSystemItem) => {
        const isCut = clipboard.mode === 'cut' && clipboard.item?.id === item.id;
        return (
            <div 
                key={item.id}
                data-fs-item="true"
                onDoubleClick={() => handleItemDoubleClick(item)} 
                onContextMenu={(e) => handleItemContextMenu(e, item)} 
                className={`grid grid-cols-[3fr,1fr,1fr,1fr] items-center px-2 py-2 rounded hover:bg-white/10 text-sm ${isCut ? 'opacity-50' : ''}`}
            >
                <div className="flex items-center gap-2 truncate">
                    {React.isValidElement(item.icon) ? React.cloneElement(item.icon, { className: "w-5 h-5" }) : item.icon}
                    {renamingId === item.id ? (
                        <input
                            type="text"
                            defaultValue={item.name}
                            autoFocus
                            onBlur={(e) => handleRename(item.id, e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleRename(item.id, e.currentTarget.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-900 text-white text-sm border border-blue-500 rounded-sm w-full"
                        />
                    ) : (
                        <span>{item.name}</span>
                    )}
                </div>
                <span>{item.dateModified ? new Date(item.dateModified).toLocaleString() : ''}</span>
                <span>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
                <span className="text-right">{item.type === 'file' && item.size ? formatBytes(item.size) : ''}</span>
            </div>
        );
    }

    const renderDetailsHeader = () => {
        const HeaderCell: React.FC<{ label: string, sortKey: keyof FileSystemItem | 'type', className?: string }> = ({ label, sortKey, className }) => (
            <div onClick={() => handleSort(sortKey)} className={`flex items-center gap-1 cursor-pointer ${className}`}>
                <span>{label}</span>
                {sortConfig.key === sortKey && <ChevronDownIcon className={`w-3 h-3 transition-transform ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />}
            </div>
        );
        return (
            <div className="grid grid-cols-[3fr,1fr,1fr,1fr] text-gray-400 px-2 py-1 text-sm font-semibold border-b border-gray-700">
                <HeaderCell label="Name" sortKey="name" />
                <HeaderCell label="Date modified" sortKey="dateModified" />
                <HeaderCell label="Type" sortKey="type" />
                <HeaderCell label="Size" sortKey="size" className="justify-end" />
            </div>
        );
    };

    return (
        <div className="h-full w-full flex flex-col bg-[#202020] text-white">
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple style={{ display: 'none' }} aria-hidden="true" />
            <div className="flex items-center bg-[#202020] flex-shrink-0">
                {tabs.map((tabId, index) => {
                     const tabDirName = findItemById(fileSystem, tabId)?.name || 'Home';
                     return (
                         <div
                            key={index}
                            className={`flex items-center gap-2 px-4 py-2 border-r border-gray-700/50 cursor-pointer ${activeTab === index ? 'bg-[#2b2b2b]' : 'hover:bg-gray-700/50'}`}
                            onClick={() => setActiveTab(index)}
                        >
                            <FolderIcon className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">{tabDirName}</span>
                            <button onClick={(e) => { e.stopPropagation(); closeTab(index); }} className="p-1 rounded-full hover:bg-gray-600">
                                <CloseIcon className="w-3 h-3"/>
                            </button>
                        </div>
                     )
                })}
                <button onClick={addTab} className="px-3 py-2 text-lg hover:bg-gray-700/50">+</button>
            </div>
            
             <div className="h-[48px] bg-[#2b2b2b] flex-shrink-0 flex items-center justify-between px-2 border-b border-gray-700/50">
                <div className="flex items-center gap-1">
                     <button onClick={goBack} disabled={historyIndices[activeTab] === 0} className="p-2 rounded hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"><ChevronRightIcon className="w-5 h-5 transform rotate-180"/></button>
                     <button onClick={goForward} disabled={historyIndices[activeTab] >= (histories[activeTab]?.length || 0) - 1} className="p-2 rounded hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"><ChevronRightIcon className="w-5 h-5"/></button>
                      <button onClick={goUp} disabled={currentPath.length <= 1} className="p-2 rounded hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"><ChevronRightIcon className="w-5 h-5 transform -rotate-90"/></button>
                </div>
                <div className="flex-grow mx-2 bg-gray-800 border border-gray-700 rounded p-1 flex items-center text-sm">
                    {currentPath.map((p, i) => (
                        <React.Fragment key={p.id}>
                            <span className="px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer" onClick={() => navigateTo(p.id)}>{p.name}</span>
                            {i < currentPath.length - 1 && <ChevronRightIcon className="w-4 h-4 text-gray-500" />}
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-gray-800 rounded px-2 border border-gray-700">
                        <SearchIcon className="text-gray-400" />
                        <input type="text" placeholder={`Search ${currentDirectory.name}`} className="bg-transparent text-sm text-white p-1.5 outline-none w-48" />
                    </div>
                     <div className="flex items-center bg-gray-800 rounded border border-gray-700 p-1">
                        <button onClick={() => setViewMode('grid')} className={`p-1 rounded ${viewMode === 'grid' ? 'bg-blue-600' : 'hover:bg-white/10'}`}><ViewIcon className="w-4 h-4" /></button>
                        <button onClick={() => setViewMode('details')} className={`p-1 rounded ${viewMode === 'details' ? 'bg-blue-600' : 'hover:bg-white/10'}`}><DetailsIcon className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>

            <div className="flex flex-grow overflow-hidden">
                <div className="w-[240px] bg-[#2b2b2b] p-2 flex-shrink-0 flex flex-col gap-1">
                    <NavItem icon={<FolderIcon className="w-5 h-5"/>} label="Home" active={currentDirId === 'root'} onClick={() => navigateTo('root')} />
                    <div className="h-px w-full bg-white/10 my-2"></div>
                    <NavItem icon={<FolderIcon className="w-5 h-5"/>} label="Desktop" active={currentDirId === 'desktop'} onClick={() => navigateTo('desktop')} />
                    <NavItem icon={<FolderIcon className="w-5 h-5"/>} label="Documents" active={currentDirId === 'docs'} onClick={() => navigateTo('docs')} />
                    <NavItem icon={<FolderIcon className="w-5 h-5"/>} label="Downloads" active={currentDirId === 'downloads'} onClick={() => navigateTo('downloads')} />
                    <NavItem icon={<FolderIcon className="w-5 h-5"/>} label="Pictures" active={currentDirId === 'pics'} onClick={() => navigateTo('pics')} />
                    <NavItem icon={<FolderIcon className="w-5 h-5"/>} label="Music" active={currentDirId === 'music'} onClick={() => navigateTo('music')} />
                    <NavItem icon={<FolderIcon className="w-5 h-5"/>} label="Videos" active={currentDirId === 'videos'} onClick={() => navigateTo('videos')} />
                </div>

                <div className="flex-grow overflow-y-auto" onContextMenu={handleBackgroundContextMenu}>
                    {currentDirId === 'root' ? (
                        <div className="p-4">
                             <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">Quick access</h2>
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2 mb-6">
                                {(Array.isArray(fileSystem.content) ? (fileSystem.content as FileSystemItem[]).filter(item => item.type === 'folder') : []).map(item => (
                                    <div key={item.id} data-fs-item="true" onDoubleClick={() => handleItemDoubleClick(item)} onContextMenu={(e) => handleItemContextMenu(e,item)} className="flex items-center p-2 rounded-md hover:bg-white/10 cursor-pointer">
                                        {React.isValidElement(item.icon) ? React.cloneElement(item.icon, { className: "w-10 h-10"}) : item.icon}
                                        <div className="ml-3">
                                            <p className="font-semibold text-sm">{item.name}</p>
                                            <p className="text-xs text-gray-400">Folder</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">Recent</h2>
                            <div className="text-sm">
                                <div className="grid grid-cols-[2fr,1fr,1fr] text-gray-400 px-2 py-1">
                                    <span>Name</span>
                                    <span>Date modified</span>
                                    <span>Location</span>
                                </div>
                                {RECENT_FILES.map(file => (
                                     <div key={file.id} data-fs-item="true" className="grid grid-cols-[2fr,1fr,1fr] items-center px-2 py-2 rounded hover:bg-white/10">
                                        <span className="flex items-center gap-2 truncate">{file.icon} {file.name}</span>
                                        <span>{file.modified}</span>
                                        <span className="truncate">{file.location}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        viewMode === 'grid' ? (
                             <div className="p-4 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
                                {sortedContent.map(renderGridItem)}
                             </div>
                        ) : (
                            <div>
                                {renderDetailsHeader()}
                                {sortedContent.map(renderDetailsItem)}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileExplorer;