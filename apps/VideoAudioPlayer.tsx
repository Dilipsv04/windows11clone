
import React from 'react';

const VideoAudioPlayer: React.FC<{ windowId: string; data?: any }> = ({ data }) => {
    if (!data || typeof data.content !== 'string' || !data.mimeType) {
        return <div className="p-4 text-red-400">Invalid media data.</div>;
    }

    const isVideo = data.mimeType.startsWith('video/');
    const isAudio = data.mimeType.startsWith('audio/');

    return (
        <div className="w-full h-full flex items-center justify-center bg-black">
            {isVideo && (
                <video src={data.content} controls autoPlay className="max-w-full max-h-full">
                    Your browser does not support the video tag.
                </video>
            )}
            {isAudio && (
                 <div className="p-4">
                    <p className="text-white text-center mb-4">{data.name}</p>
                    <audio src={data.content} controls autoPlay>
                        Your browser does not support the audio element.
                    </audio>
                 </div>
            )}
            {!isVideo && !isAudio && (
                 <div className="p-4 text-yellow-400">Unsupported media type: {data.mimeType}</div>
            )}
        </div>
    );
};

export default VideoAudioPlayer;
