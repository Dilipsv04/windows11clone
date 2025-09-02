
import React, { useState, useEffect } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { SaveIcon, TextFileIcon } from '../assets/icons';
import type { FileSystemItem } from '../types';

const Notepad: React.FC<{ windowId: string; data?: any }> = ({ data }) => {
    const { addFileSystemItem, updateFileSystemItem } = useDesktop();
    const [content, setContent] = useState('');
    const [isSaved, setIsSaved] = useState(true);

    useEffect(() => {
        if (data && typeof data.content === 'string') {
            setContent(data.content);
            setIsSaved(true);
        } else {
            setContent('');
            setIsSaved(false); // New files are unsaved
        }
    }, [data]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        setIsSaved(false);
    };

    const handleSave = () => {
        if (data && data.id) { // Save existing file
            updateFileSystemItem(data.id, { 
                content: content,
                size: new Blob([content]).size,
                dateModified: Date.now(),
                data: { ...data, content: content }
            });
            setIsSaved(true);
        } else { // Save As for new file
            const fileName = prompt("Enter file name:", "Untitled.txt");
            if (fileName) {
                 const newItemId = `fs-item-${Date.now()}-${fileName}`;
                 const newItem: FileSystemItem = {
                    id: newItemId,
                    name: fileName,
                    icon: <TextFileIcon />,
                    type: 'file',
                    appId: 'notepad',
                    content: content,
                    mimeType: 'text/plain',
                    dateModified: Date.now(),
                    size: new Blob([content]).size,
                    data: { id: newItemId, name: fileName, content: content, mimeType: 'text/plain' }
                 };
                 addFileSystemItem(newItem, 'docs'); // Save to Documents
                 setIsSaved(true);
                 // This is a simplified save as, it does not yet update the window's context to the new file.
            }
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-gray-800 text-white">
            <div className="flex-shrink-0 bg-[#2b2b2b] p-1 flex items-center">
                <button onClick={handleSave} className="flex items-center gap-2 px-2 py-1 text-sm rounded hover:bg-white/10 disabled:opacity-50" disabled={isSaved}>
                    <SaveIcon className="w-4 h-4" />
                    <span>Save</span>
                </button>
            </div>
            <textarea
                value={content}
                onChange={handleContentChange}
                className="w-full h-full bg-gray-900 text-white p-4 font-mono text-sm resize-none outline-none"
                placeholder="Start typing..."
            />
        </div>
    );
};

export default Notepad;