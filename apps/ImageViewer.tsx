
import React from 'react';

const ImageViewer: React.FC<{ windowId: string; data?: any }> = ({ data }) => {
    if (!data || typeof data.content !== 'string') {
        return <div className="p-4 text-red-400">Invalid image data.</div>;
    }

    return (
        <div className="w-full h-full flex items-center justify-center bg-black">
            <img src={data.content} alt={data.name} className="max-w-full max-h-full object-contain" />
        </div>
    );
};

export default ImageViewer;
