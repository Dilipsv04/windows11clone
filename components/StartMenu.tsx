import React, { useState } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { APP_DEFINITIONS, RECENT_FILES } from '../constants';
import { SearchIcon, UserIcon, PowerIcon } from '../assets/icons';

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose }) => {
    const { openApp } = useDesktop();
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    const pinnedAppIds = [
        'browser', 'file-explorer', 'store', 'settings', 'notepad', 'paint', 
        'calculator', 'clock', 'terminal', 'weather', 'minesweeper',
    ];

    const allApps = Object.values(APP_DEFINITIONS).sort((a, b) => a.name.localeCompare(b.name));
    const filteredApps = allApps.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleAppClick = (appId: string) => {
        openApp(appId);
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 z-[999]"
            onClick={onClose}
        >
            <div 
                className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[600px] h-[650px] bg-gray-800/80 backdrop-blur-2xl rounded-lg p-6 shadow-2xl animate-fade-in-up flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="w-full bg-gray-700/50 rounded-md p-2 flex items-center mb-6">
                    <SearchIcon className="w-5 h-5 text-gray-400 mx-2" />
                    <input 
                        type="text" 
                        placeholder="Search for apps, settings, and documents" 
                        className="bg-transparent text-white w-full outline-none px-2"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                {searchTerm ? (
                    <div className="overflow-y-auto">
                        <h2 className="text-white text-lg font-semibold mb-2">Search Results</h2>
                        <div className="grid grid-cols-1 gap-2">
                            {filteredApps.map(appDef => (
                                <div key={appDef.id} onClick={() => handleAppClick(appDef.id)} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        {appDef.icon}
                                    </div>
                                    <span className="text-white text-sm">{appDef.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-white text-lg font-semibold">Pinned</h2>
                                <button className="text-sm text-white bg-white/10 px-3 py-1 rounded-md hover:bg-white/20">All apps &gt;</button>
                            </div>
                            <div className="grid grid-cols-6 gap-4">
                                {pinnedAppIds.map(id => {
                                    const appDef = APP_DEFINITIONS[id];
                                    if (!appDef) return null;
                                    return (
                                        <div key={id} onClick={() => handleAppClick(id)} className="flex flex-col items-center justify-center gap-2 py-2 hover:bg-white/10 rounded-md cursor-pointer text-center">
                                            <div className="w-12 h-12 flex items-center justify-center">
                                                {React.isValidElement(appDef.icon) ? React.cloneElement(appDef.icon, { className: "w-8 h-8"}) : appDef.icon}
                                            </div>
                                            <span className="text-white text-xs w-full break-words">{appDef.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-white text-lg font-semibold mb-2">Recommended</h2>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                {RECENT_FILES.map(file => (
                                    <div key={file.id} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer">
                                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                                          {file.icon}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm truncate">{file.name}</p>
                                            <p className="text-gray-400 text-xs">{file.modified}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                <div className="mt-auto h-16 flex-shrink-0 -mx-6 -mb-6 px-6 py-2 bg-gray-700/40 rounded-b-lg flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-white/10 rounded-md">
                        <UserIcon className="w-8 h-8 rounded-full bg-gray-600 p-1"/>
                        <span className="text-sm">User</span>
                    </div>
                    <button className="p-2 rounded-md hover:bg-white/10">
                        <PowerIcon className="w-5 h-5"/>
                    </button>
                </div>

            </div>
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translate(-50%, 10px); }
                    to { opacity: 1; transform: translate(-50%, 0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default StartMenu;