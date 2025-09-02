
import React from 'react';

export const FolderIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-12 h-12 text-yellow-500 ${className}`}>
        <path d="M19.5 21a3 3 0 003-3v-9a3 3 0 00-3-3h-5.25v-1.5a3 3 0 00-3-3h-3.75a3 3 0 00-3 3v1.5H4.5a3 3 0 00-3 3v9a3 3 0 003 3h15z" />
    </svg>
);

export const FileExplorerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10z"/>
    </svg>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.946 1.55l-.261 1.042a2.25 2.25 0 01-1.282 1.282l-1.042.261c-.887.247-1.55.98-1.55 1.847v2.242c0 .868.663 1.6 1.55 1.847l1.042.261a2.25 2.25 0 011.282 1.282l.261 1.042c.247.887.98 1.55 1.847 1.55h2.242c.868 0 1.6-.663 1.847-1.55l.261-1.042a2.25 2.25 0 011.282-1.282l1.042-.261c.887-.247 1.55-.98 1.55-1.847v-2.242c0-.868-.663-1.6-1.55-1.847l-1.042-.261a2.25 2.25 0 01-1.282-1.282l-.261-1.042c-.247-.887-.98-1.55-1.847-1.55h-2.242zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" clipRule="evenodd" />
    </svg>
);

export const TaskManagerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 21h16.5M16.5 3.75h.008v.008H16.5V3.75z" />
    </svg>
);

export const TextFileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export const PictureIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

export const VideoFileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export const AudioFileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V7.5A2.25 2.25 0 0013.5 5.25v1.5c0 .621.504 1.125 1.125 1.125v-1.5a2.25 2.25 0 00-2.25-2.25H9.75m5.373 0a2.25 2.25 0 00-2.25 2.25v1.5c0 .621.504 1.125 1.125 1.125" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export const PDFFileIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`text-red-500 ${className}`}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 15.5H8V9h1.5v6.5zm3.75-2.01c0 .54-.45.99-1 .99H11v1.52H9.5V9h3.11c.53 0 .96.43.96.96v4.57c-.01.01-.01.01-.01.02z" />
        <path d="M11 10.49h1.25c.14 0 .25.11.25.25v.5c0 .14-.11.25-.25.25H11v-.99z" />
    </svg>
);

export const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export const NotepadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

export const PaintIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.385m5.043.025a15.994 15.994 0 001.622-3.385m3.388 1.62a15.994 15.994 0 00-1.622-3.385m-5.043.025a15.998 15.998 0 01-3.388-1.62m5.043-.025a15.998 15.998 0 00-3.388 1.62m-1.622 3.385a15.994 15.994 0 01-1.622 3.385m5.043.025a15.994 15.994 0 00-1.622 3.385M12 21a9 9 0 100-18 9 9 0 000 18zm0 0a8.958 8.958 0 01-1.743-.227 1.5 1.5 0 01-1.442-1.442A8.958 8.958 0 0112 3a8.958 8.958 0 011.743.227 1.5 1.5 0 011.442 1.442A8.958 8.958 0 0112 21z" />
    </svg>
);

export const SnippingToolIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.843 15.232L9.157 16.546a.75.75 0 010 1.06l-1.314 1.314a.75.75 0 01-1.06 0L5.47 17.606a.75.75 0 010-1.06l1.314-1.314a.75.75 0 011.06 0zM16.5 7.5l-1.314 1.314a.75.75 0 01-1.06 0L12.812 7.5a.75.75 0 010-1.06L14.125 5.125a.75.75 0 011.06 0L16.5 6.44a.75.75 0 010 1.06z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.496 14.577l-1.12-1.12a3.375 3.375 0 010-4.773l1.12-1.12a3.375 3.375 0 014.773 0l1.12 1.12a3.375 3.375 0 010 4.773l-1.12 1.12a3.375 3.375 0 01-4.773 0z" />
    </svg>
);

export const ToDoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const MaximizeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15m-6 0l-3.75 3.75M9 9l3.75-3.75" />
    </svg>
);

export const MinimizeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

export const RestoreIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 3.75H9v1.5h6v-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75A2.25 2.25 0 016.75 4.5h10.5A2.25 2.25 0 0119.5 6.75v10.5A2.25 2.25 0 0117.25 19.5H6.75A2.25 2.25 0 014.5 17.25V6.75z" />
    </svg>
);

export const WindowsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3 3h8.5v8.5H3V3zm0 10.5h8.5V22H3v-8.5zM12.5 3H21v8.5h-8.5V3zm0 10.5H21V22h-8.5v-8.5z"/>
    </svg>
);
export const PinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);
export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);
export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);


export const SearchIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

export const ViewIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);

export const DetailsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const CutIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" transform="rotate(90 12 12)" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25h15" />
    </svg>
);

export const CopyIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m2.25 0a2.25 2.25 0 01-2.25 2.25H8.25a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h6.75a2.25 2.25 0 012.25 2.25v2.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 1.5H6.75A2.25 2.25 0 004.5 3.75v10.5A2.25 2.25 0 006.75 16.5h.75" />
    </svg>
);

export const PasteIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25V4.5A2.25 2.25 0 019 2.25h3a2.25 2.25 0 012.25 2.25v.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 15h6M9 18h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 21V5.25A2.25 2.25 0 016.75 3h10.5a2.25 2.25 0 012.25 2.25v15.75A2.25 2.25 0 0117.25 21H6.75A2.25 2.25 0 014.5 21z" />
    </svg>
);
export const SaveIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.958L3.59 15.872A2.25 2.25 0 005.74 18.25h12.52a2.25 2.25 0 002.15-2.378L17.09 5.708A2.25 2.25 0 0014.942 3.75H12M9 3.75v3.375c0 .621.504 1.125 1.125 1.125h2.75A1.125 1.125 0 0014.25 7.125V3.75M9 3.75a2.25 2.25 0 012.25-2.25h1.5a2.25 2.25 0 012.25 2.25" />
    </svg>
);
export const PlayIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.536 0 3.284L7.279 20.99c-1.25.722-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);
export const PauseIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3zm7.5 0a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
    </svg>
);
export const StopIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3-3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
    </svg>
);
export const PencilIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
    </svg>
);
export const EraserIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.273 5.625a2.475 2.475 0 00-3.5-3.5L8.33 10.569a2.475 2.475 0 000 3.5l-1.34 1.34a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06l1.34-1.34a2.475 2.475 0 000-3.5L3.727 9.375a2.475 2.475 0 00-3.5 3.5L8.67 21.318a2.475 2.475 0 003.5 0L20.273 9.213a2.475 2.475 0 000-3.588z" />
    </svg>
);
export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.06-1.06l-3.102 3.101-1.531-1.531a.75.75 0 00-1.06 1.06l2.06 2.06a.75.75 0 001.06 0l3.632-3.632z" clipRule="evenodd" />
    </svg>
);
export const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.9h1.368c1.603 0 2.816 1.336 2.816 2.9zM10.5 6h3a.75.75 0 01.75.75v11.5a.75.75 0 01-1.5 0V7.5a.75.75 0 01.75-.75h-1.5a.75.75 0 01-.75.75V18a.75.75 0 01-1.5 0V7.5A.75.75 0 0110.5 6z" clipRule="evenodd" />
    </svg>
);
export const ProcessesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
);
export const PerformanceIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375l-4.5 4.5-2.25-2.25L9 12.375" />
    </svg>
);
export const AppHistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
export const SystemIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.871A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
);

export const BluetoothIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.176 3.693l11.648 11.648-5.824 5.824V3.693l5.824-5.824L6.176 15.341" />
    </svg>
);
export const NetworkIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.045A9.957 9.957 0 0112 14.25c1.828 0 3.523.472 4.966 1.285m-9.932 0A9.956 9.956 0 0112 14.25c1.828 0 3.523.472 4.966 1.285M12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
);

export const PersonalizationIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.385m5.043.025a15.994 15.994 0 001.622-3.385m3.388 1.62a15.994 15.994 0 00-1.622-3.385m-5.043.025a15.998 15.998 0 01-3.388-1.62m5.043-.025a15.998 15.998 0 00-3.388 1.62m-1.622 3.385a15.994 15.994 0 01-1.622 3.385m5.043.025a15.994 15.994 0 00-1.622 3.385M12 21a9 9 0 100-18 9 9 0 000 18zm0 0a8.958 8.958 0 01-1.743-.227 1.5 1.5 0 01-1.442-1.442A8.958 8.958 0 0112 3a8.958 8.958 0 011.743.227 1.5 1.5 0 011.442 1.442A8.958 8.958 0 0112 21z" />
    </svg>
);


// =============== NEW ICONS START HERE ===============

// --- System UI Icons ---

export const UserIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
export const PowerIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
    </svg>
);

export const AppsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);

export const AccountsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

export const TimeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const GamingIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M13.5 3.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5S11.172 5 12 5s1.5-.672 1.5-1.5zM8 7.5c0-.828-.672-1.5-1.5-1.5S5 6.672 5 7.5 5.672 9 6.5 9s1.5-.672 1.5-1.5zm8.5 1.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zM12 11c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-7.5 4.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm15 0c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5z"/>
    </svg>
);

export const AccessibilityIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
    </svg>
);

export const PrivacyIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.75 9.75 0 007.69-15.11A9.75 9.75 0 0012 2.25 9.75 9.75 0 004.31 5.89 9.75 9.75 0 0012 21z" />
    </svg>
);
export const UpdateIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-3.181-4.991v4.99" />
    </svg>
);

export const HomeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955a.75.75 0 01-1.06 1.06L12 4.06l-8.47 8.47a.75.75 0 01-1.06-1.06z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75v6.75a.75.75 0 00.75.75h3.75a.75.75 0 00.75-.75v-4.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v4.5a.75.75 0 00.75.75h3.75a.75.75 0 00.75-.75v-6.75" />
    </svg>
);
export const LibraryIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
);
export const StarIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
);
export const ReloadIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-3.181-4.991v4.99" />
    </svg>
);
export const LockClosedIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 5.25a3.75 3.75 0 107.5 0v3h-7.5v-3z" clipRule="evenodd" />
    </svg>
);
export const DotsVerticalIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
    </svg>
);
export const CodeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
);


// --- Base App Icons ---

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.032c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm-1.82 13.911V8.057L16.29 12l-6.11 3.943z"/>
  </svg>
);

export const EdgeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.01 17.5c-4.14 0-7.5-3.36-7.5-7.5S7.87 4.5 12.01 4.5c4.14 0 7.5 3.36 7.5 7.5s-3.36 7.5-7.5 7.5zm.5-9.5c.28 0 .5.22.5.5v3c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5z"/>
        <path d="M12.5,9H11v1h1.5V9z M13,11.5c0-0.83-0.67-1.5-1.5-1.5h-2C8.67,10,8,10.67,8,11.5v2C8,14.33,8.67,15,9.5,15h2 c0.83,0,1.5-0.67,1.5-1.5V11.5z"/>
    </svg>
);

export const CalculatorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5h15V4.5H4.5v15zm2.25-12h10.5M6.75 12h10.5m-10.5 4.5h10.5M9 6.75V9m6-2.25V9m-6 3.75V15m6-2.25V15" />
    </svg>
);

export const TerminalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 3-3 3m4.5-6l3 3-3 3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18v15H3v-15z" />
    </svg>
);

export const StoreIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.618L18.36 8 12 11.382 5.64 8 12 4.618zM4 8.382V16.5l8 4.364 8-4.364V8.382L12 12.618 4 8.382z"/>
    </svg>
);
export const WeatherIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

export const MineIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-8h2v6h-2V9z"/>
    </svg>
);

export const GameControllerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

// --- Web App Icons ---
// Social
export const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.024C18.343 21.128 22 16.991 22 12z"/></svg>);
export const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);
export const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163C8.847 0 8.447.011 7.183.065 2.502.272.272 2.502.065 7.183.011 8.447 0 8.847 0 12s.011 3.553.065 4.817c.207 4.68 2.43 6.908 7.118 7.118 1.265.054 1.667.065 4.817.065s3.553-.011 4.817-.065c4.68-.207 6.908-2.43 7.118-7.118.054-1.265.065-1.667.065-4.817s-.011-3.553-.065-4.817C21.728 2.502 19.498.272 14.817.065 13.553.011 13.153 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>);
export const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>);
export const RedditIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12c0 4.17 2.52 7.76 6.04 9.25.4.07.55-.17.55-.38v-1.37c-2.44.53-2.95-1.18-2.95-1.18-.36-.93-.89-1.18-.89-1.18-.73-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.45.55.38C19.48 19.76 22 16.17 22 12c0-5.52-4.48-10-10-10z"/></svg>);
export const PinterestIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12c0 4.3 2.8 7.93 6.64 9.35.01-.79.05-1.92.25-2.71.2-.79.91-3.83.91-3.83s-.23-.46-.23-1.14c0-1.07.62-1.87 1.4-1.87.66 0 .97.49.97 1.08 0 .65-.42 1.63-.64 2.54-.18.75.38 1.37.94 1.37 1.36 0 2.41-1.83 2.41-3.8 0-1.61-1.07-2.79-2.93-2.79-2.18 0-3.53 1.62-3.53 3.32 0 .64.21 1.34.47 1.73.05.08.06.15.04.23-.08.31-.26.85-.3.97-.05.15-.2.2-.42.12-1.3-.57-1.88-2.13-1.88-3.52 0-2.73 2.23-5.3 6.2-5.3 3.31 0 5.56 2.36 5.56 5.06 0 3.29-1.82 5.86-4.5 5.86-1.11 0-2.16-.86-1.88-1.88.3-.92.87-1.82.87-1.82s.22-.92.22-1.99c0-.85-.49-1.5-1.09-1.5-.9 0-1.57.94-1.57 2.11 0 .78.27 1.34.27 1.34s-1.03 4.35-1.22 5.15C5.5 20.3 5.08 21.31 5.08 22.38c.15.02.3.02.46.02 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>);
export const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm4.89 7.42h-2.5V13c0 1.1-.9 2-2 2s-2-.9-2-2V7.42H7.92v-.03c.01-1.3.93-2.39 2.2-2.39h3.75c1.28 0 2.2 1.09 2.2 2.39v.03z"/></svg>);
export const DiscordIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19.54 5.32c-1.2-.74-2.51-1.26-3.92-1.57-.22-.05-.45-.02-.63.13-.18.15-.29.38-.26.61.16 1.2.53 2.32.96 3.36-1.42.23-2.83.23-4.25 0 .43-1.04.8-2.16.96-3.36.03-.23-.08-.46-.26-.61-.18-.15-.41-.18-.63-.13-1.41.31-2.72.83-3.92 1.57C3.12 7.82 2 10.87 2 14.15c0 3.31 1.78 6.13 4.38 7.57.37.2.79.12 1.06-.17.27-.29.35-.71.2-1.09-.32-.82-.6-1.68-.82-2.57.49.09.98.16 1.48.2.49.04.99.06 1.48.06s.99-.02 1.48-.06c.5-.04.99-.11 1.48-.2-.22.89-.5 1.75-.82 2.57-.15.38-.07.8.2 1.09.27.29.69.37 1.06.17 2.6-1.44 4.38-4.26 4.38-7.57 0-3.28-1.12-6.33-2.46-8.83zM8.44 14.93c-.8 0-1.45-.7-1.45-1.55S7.64 11.83 8.44 11.83s1.45.7 1.45 1.55-.65 1.55-1.45 1.55zm7.12 0c-.8 0-1.45-.7-1.45-1.55s.65-1.55 1.45-1.55 1.45.7 1.45 1.55-.65 1.55-1.45 1.55z"/></svg>);

// Entertainment
export const NetflixIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.5V6.5l3 7v2h-3zm3 0V6.5l3 7v2h-3z"/></svg>);
export const SpotifyIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.75 13.5c-.2.3-.58.4-.88.2-2.43-1.48-5.48-1.82-9.04-.99-.35.08-.68-.16-.76-.5s.16-.68.5-.76c3.84-.91 7.15-.53 9.87.99.3.19.4.58.2.88zm.9-2.52c-.25.38-.73.5-1.11.25-2.78-1.7-6.9-2.15-10.12-1.18-.43.13-.88-.13-1-.56s.13-.88.56-1c3.62-1.07 8.16-.57 11.28 1.33.38.24.49.73.25 1.11zm.1-2.92c-3.22-1.95-8.58-2.1-11.8.93-.5.3-.87.93-.57 1.43s.93.87 1.43.57c3.65-2.22 9.57-1.9 13.25 1.38.45.28 1.05.1 1.33-.35s.1-1.05-.35-1.33c-.01 0-.01 0 0 0z"/></svg>);
export const TwitchIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M3.33 2H20.67C21.4 2 22 2.6 22 3.33V16.11c0 .73-.6 1.33-1.33 1.33H16.22l-3.11 3.11H10l-3.11-3.11H3.33C2.6 17.44 2 16.84 2 16.11V3.33C2 2.6 2.6 2 3.33 2zm5.84 9.17h1.78v-4.45H9.17v4.45zm5.33 0h1.78v-4.45h-1.78v4.45z"/></svg>);
export const SoundCloudIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M6.1 12.3c0-.1.1-.3.1-.4 0-.1 0-.2-.1-.3s-.1-.2-.1-.3c0-.1 0-.2.1-.3l.1-.3c0-.1 0-.2-.1-.3s-.1-.2-.1-.3l-.2-.2c-.1-.1-.1-.2-.1-.3 0-.1 0-.2.1-.3s.1-.2.1-.3l.1-.2c.1-.1.1-.2.1-.3 0-.1 0-.2-.1-.3l-.1-.2c0-.1 0-.2.1-.3s.1-.2.1-.3l.2-.2c.1-.1.1-.2.1-.3 0-.1 0-.2-.1-.3l-.1-.2c-.1-.1-.1-.2-.1-.3 0-.1 0-.2.1-.3s.1-.2.1-.3c0-.1 0-.2-.1-.3l-.1-.2c0-.1 0-.2.1-.3.1-.1.1-.2.2-.3l.1-.2c.1 0 .1-.1.2-.2 0-.1.1-.2.1-.3l.1-.2c.1 0 .1-.1.2-.2l.2-.3c.1 0 .2-.1.2-.2l.2-.2c.1 0 .2-.1.2-.2l.3-.3c.1 0 .2-.1.2-.2l.2-.2c.1 0 .2-.1.3-.2l.3-.3c.1 0 .2-.1.2-.2l.2-.2c.1 0 .2-.1.3-.1l.3-.2c.1 0 .2-.1.2-.1l.3-.2c.1 0 .2-.1.3-.1l.3-.2c.1 0 .2 0 .2-.1l.4-.2c.1 0 .2 0 .3-.1l.3-.1c.1 0 .2 0 .3-.1l.3-.1c.1 0 .2 0 .3-.1l.3 0c.1 0 .2 0 .3 0h.3c.1 0 .2 0 .3 0 .1 0 .2 0 .3.1l.3.1c.1 0 .2 0 .3.1l.3.1c.1 0 .2 0 .3.1l.3.1c.1 0 .2 0 .2.1l.4.2c.1 0 .2 0 .3.1l.3.2c.1 0 .2.1.2.1l.3.2c.1 0 .2.1.3.1l.3.2c.1 0 .2.1.2.2l.2.2c.1 0 .2.1.2.2l.2.2c.1 0 .2.1.2.2l.3.3c.1 0 .2.1.2.2l.2.2c.1 0 .1.1.2.2l.2.3c.1 0 .1.1.2.2l.1.2c.1 0 .1.2.1.3v.2c0 .1.1.2.1.3v.2c0 .1.1.2.1.3v.2c0 .1.1.2.1.3v.3c0 .1.1.2.1.3v.2c0 .1 0 .2.1.3v.3c0 .1 0 .2.1.3v.2c0 .1 0 .2.1.3v.3c0 .1 0 .2.1.3v.2c0 .1 0 .2-.1.3v.3c0 .1 0 .2-.1.3v.2c0 .1 0 .2-.1.3v.3c0 .1 0 .2-.1.3v.2c0 .1-.1.2-.1.3v.2c0 .1-.1.2-.1.3v.2c0 .1-.1.2-.1.3v.3c0 .1-.1.2-.1.3v.2c0 .1-.1.2-.2.3l-.1.2c-.1.1-.1.2-.2.3l-.1.2c-.1.1-.1.2-.2.3l-.1.2c-.1.1-.2.2-.2.3l-.2.2c-.1.1-.2.2-.2.3l-.2.2c-.1.1-.2.2-.3.3l-.2.2c-.1.1-.2.2-.2.3l-.2.2c-.1.1-.2.2-.3.2l-.2.2c-.1.1-.2.2-.3.2l-.3.2c-.1.1-.2.1-.3.2l-.3.2c-.1.1-.2.1-.3.2l-.3.2c-.1.1-.2.1-.3.1l-10-2.8z"/></svg>);
export const IMDbIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4.25 15.5H6v-7h1.75v7zm3.5 0H9.5v-7h1.75v7zm3.5 0h-1.75v-7h1.75v7zm3.5 0h-1.75v-7H18v7z"/></svg>);
export const GiphyIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12.5 7.5h-1v9h1v-9zm3 0h-1v9h1v-9zm-6 0h-1v9h1v-9zm9-3h-1v1.5h-1.5v-1.5h-3v1.5h-1.5v-1.5h-3v1.5h-1.5v-1.5h-1c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h12c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5z"/></svg>);

// Productivity
export const GoogleDriveIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 13.5l-3-5h4.5l3 5h-4.5zm-3.75-6l1.5-2.5h6l1.5 2.5h-9z"/></svg>);
export const DropboxIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 6.5l-5.5 4-5.5-4 5.5-4 5.5 4zm0 5l-5.5 4-5.5-4 5.5-4 5.5 4zm0 5l-5.5 4-5.5-4 5.5-4 5.5 4zm11-10l-5.5 4-5.5-4 5.5-4 5.5 4zm-11 5l5.5 4-5.5 4-5.5-4 5.5-4z"/></svg>);
export const TrelloIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14H6v-8h6v8zm7 0h-6v-5h6v5z"/></svg>);
export const SlackIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M8.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-2-1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 2a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5-2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2 1.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-2-1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 2a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5-2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>);
export const NotionIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2V7h2v10z"/></svg>);
export const FigmaIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4V6zm0 12a4 4 0 0 1-4-4 4 4 0 0 1 4-4v8zm-4-8a4 4 0 0 1 4-4v4H8zm8 0a4 4 0 0 1 4 4 4 4 0 0 1-4-4z"/></svg>);
export const CanvaIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>);
export const Microsoft365Icon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9L14.5 12 10 16.5z"/></svg>);
export const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => TextFileIcon({className});
export const SpreadsheetIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M4 4h16v16H4V4zm2 2v2h2V6H6zm4 0v2h2V6h-2zm4 0v2h2V6h-2zM6 10v2h2v-2H6zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zM6 14v2h2v-2H6zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z"/></svg>);
export const PresentationIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M4 4h16v12H4V4zm2 2v8h12V6H6zM4 18h16v2H4v-2z"/></svg>);

// Developer
export const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98.03-2.68-.04-.25-.49-1.27.1-2.65 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.59 1.38.14 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.72c0 .27.18.57.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/></svg>);
export const StackOverflowIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19 19v-6h2v8H3v-8h2v6h14zM8.41 11.59L17 14.17l-.59.81L7.83 12.4l.58-.81zm.58-3.18L18 11.17l-.59.81L8.41 9.22l.58-.81zM11 4l9 6.5-.59.81L11 5.61V4zm-1 2.61L1.59 13.5l.59.81L11 8.39V6.61zM6 15h12v2H6v-2z"/></svg>);
export const CodePenIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2L2 8.5V15.5L12 22L22 15.5V8.5L12 2ZM12 4.1L19.9 9.5L12 14.9L4.1 9.5L12 4.1ZM3.5 10.3L12 15.8L20.5 10.3V14.7L12 20L3.5 14.7V10.3Z"/></svg>);

// News & Reference
export const WikipediaIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-5.5H9v-1h2V9h2v1.5h2v1h-2V17h-2z"/></svg>);
export const NYTimesIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-8h2v8zm4 0h-2v-8h2v8z"/></svg>);
export const DuolingoIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4h2v4zm0-6h-2V6h2v4z"/></svg>);

// Shopping
export const AmazonIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5c-2.21 0-4-1.79-4-4s1.79-4 4-4c.75 0 1.45.22 2.05.59l-1.46 1.46c-.2-.05-.4-.08-.59-.08-1.1 0-2 .9-2 2s.9 2 2 2c.19 0 .39-.03.59-.08l1.46 1.46C12.45 15.28 11.75 15.5 11 15.5z"/></svg>);
export const EbayIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 14H7v-4h2v4zm4 0h-2v-4h2v4zm4 0h-2v-4h2v4zm-6-6H7V6h2v4zm4 0h-2V6h2v4z"/></svg>);

// Other
export const GoogleMapsIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>);
export const UnsplashIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6 13h12v-2H6v2zm0-4h12V7H6v2z"/></svg>);
