import React from 'react';

export interface WindowInstance {
    id: string;
    appId: string;
    title: string;
    icon: React.ReactElement<{ className?: string }>;
    x: number;
    y: number;
    width: number;
    height: number;
    isMaximized: boolean;
    isMinimized: boolean;
    zIndex: number;
    data?: any;
}

export interface AppDefinition {
    id: string;
    name: string;
    icon: React.ReactElement<{ className?: string }>;
    component?: React.FC<{ windowId: string; data?: any }>;
    externalUrl?: string; // For apps that open in a new tab
    baseData?: any; // For persistent data associated with an app definition
    storeCategory?: 'app' | 'game'; // For the store UI
    imageUrl?: string; // For store posters/images

    // Fields for detail page
    publisher?: string;
    rating?: number;
    ratingCount?: string;
    category?: string;
    description?: string;
    screenshots?: string[];
    features?: string[];
    releaseDate?: string;
    lastUpdated?: string;
    systemRequirements?: string;
    reviewSummary?: string;
    reviewTags?: string[];
}

export interface ContextMenuItem {
    label: string;
    icon?: React.ReactElement;
    action: () => void;
    separator?: boolean;
    disabled?: boolean;
}

export interface ContextMenuData {
    x: number;
    y: number;
    items: ContextMenuItem[];
}

export interface FileSystemItem {
    id:string;
    name: string;
    type: 'file' | 'folder' | 'app';
    icon: React.ReactElement<{ className?: string }>;
    content?: any; // content for files, children for folders
    mimeType?: string;
    modified?: string; // For recent files list display string
    dateModified?: number; // For sorting
    size?: number; // in bytes
    location?: string; // For recent files list
    appId?: string;
    data?: any;
    x?: number; // For desktop icon position
    y?: number; // For desktop icon position
}

export interface ClipboardItem {
    item: FileSystemItem | null;
    mode: 'copy' | 'cut' | null;
}

export type DesktopContextType = {
    windows: WindowInstance[];
    openApp: (appId: string, data?: any) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    toggleMinimize: (id: string) => void;
    toggleMaximize: (id: string) => void;
    updateWindowPosition: (id: string, x: number, y: number) => void;
    updateWindowSize: (id: string, width: number, height: number) => void;
    wallpaper: string;
    setWallpaper: (url: string) => void;
    contextMenu: ContextMenuData | null;
    setContextMenu: (data: ContextMenuData | null) => void;
    runningApps: { [key: string]: number };
    activeWindowId: string | null;
    fileSystem: FileSystemItem;
    setFileSystem: React.Dispatch<React.SetStateAction<FileSystemItem>>;
    addFileSystemItem: (item: FileSystemItem, parentId: string) => void;
    deleteFileSystemItem: (itemId: string) => void;
    updateFileSystemItem: (itemId: string, updates: Partial<FileSystemItem>) => void;
    clipboard: ClipboardItem;
    setClipboard: (item: FileSystemItem | null, mode: 'copy' | 'cut') => void;
    pasteFromClipboard: (parentId: string) => void;
};


// Add global types for File System Access API
declare global {
  interface FileSystemFileHandle {
    getFile(): Promise<File>;
    readonly kind: 'file';
    name: string;
  }

  interface Window {
    showOpenFilePicker(options?: {
      multiple?: boolean;
      excludeAcceptAllOption?: boolean;
      types?: {
        description?: string;
        accept?: Record<string, string[]>;
      }[];
    }): Promise<FileSystemFileHandle[]>;
  }
}