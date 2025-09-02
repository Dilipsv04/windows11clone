import React from 'react';

const GamePlayer: React.FC<{ data?: { url?: string, name?: string } }> = ({ data }) => {
    if (!data?.url) {
        return <div className="p-4 text-red-400">Error: Game URL not found.</div>;
    }

    return (
        <div className="w-full h-full bg-black">
            <iframe
                src={data.url}
                className="w-full h-full border-none"
                title={data.name || 'Game'}
                sandbox="allow-scripts allow-same-origin allow-popups"
            />
        </div>
    );
};

export default GamePlayer;
