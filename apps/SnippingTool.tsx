
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { useDesktop } from '../context/DesktopContext';
import { PictureIcon } from '../assets/icons';

const SnippingOverlay: React.FC<{ onSnip: (rect: { x: number, y: number, width: number, height: number }) => void }> = ({ onSnip }) => {
    const [startPos, setStartPos] = useState<{ x: number, y: number } | null>(null);
    const [endPos, setEndPos] = useState<{ x: number, y: number } | null>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        setStartPos({ x: e.clientX, y: e.clientY });
        setEndPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (startPos) {
            setEndPos({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        if (startPos && endPos) {
            const rect = {
                x: Math.min(startPos.x, endPos.x),
                y: Math.min(startPos.y, endPos.y),
                width: Math.abs(startPos.x - endPos.x),
                height: Math.abs(startPos.y - endPos.y),
            };
            if (rect.width > 0 && rect.height > 0) {
                 onSnip(rect);
            }
        }
    };

    const selectionStyle = startPos && endPos ? {
        left: Math.min(startPos.x, endPos.x),
        top: Math.min(startPos.y, endPos.y),
        width: Math.abs(startPos.x - endPos.x),
        height: Math.abs(startPos.y - endPos.y),
    } : {};

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="fixed inset-0 bg-black/30 cursor-crosshair z-[5000]"
        >
            {startPos && <div className="absolute border-2 border-dashed border-white bg-white/20" style={selectionStyle}></div>}
        </div>
    );
};


const SnippingTool: React.FC<{ windowId: string }> = ({ windowId }) => {
    const { closeWindow, addFileSystemItem } = useDesktop();
    const [isSnipping, setIsSnipping] = useState(false);

    const handleNewSnip = () => {
        setIsSnipping(true);
        // We could minimize the snipping tool window here, but for simplicity we'll just overlay.
    };

    const handleSnip = async (rect: { x: number, y: number, width: number, height: number }) => {
        setIsSnipping(false);
        const rootElement = document.getElementById('root');
        if (!rootElement) return;

        try {
            const canvas = await html2canvas(rootElement, { useCORS: true, allowTaint: true, x: rect.x, y: rect.y, width: rect.width, height: rect.height });
            const dataUrl = canvas.toDataURL('image/png');
            
            const now = new Date();
            const fileName = `Screenshot ${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}.png`;

            const newItemId = `fs-item-${Date.now()}-${fileName}`;
            addFileSystemItem({
                id: newItemId,
                name: fileName,
                icon: <PictureIcon className="w-12 h-12" />,
                type: 'file',
                appId: 'image-viewer',
                content: dataUrl,
                mimeType: 'image/png',
                dateModified: Date.now(),
                size: dataUrl.length,
                data: { id: newItemId, name: fileName, content: dataUrl, mimeType: 'image/png' }
            }, 'desktop');

        } catch (error) {
            console.error("Failed to capture screen:", error);
        }
        
        closeWindow(windowId);
    };

    return (
        <>
            {isSnipping && <SnippingOverlay onSnip={handleSnip} />}
            <div className="p-4 bg-[#202020] h-full flex items-center justify-center">
                <button onClick={handleNewSnip} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                    New Snip
                </button>
            </div>
        </>
    );
};

export default SnippingTool;
