import React, { useState, useMemo } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { APP_DEFINITIONS } from '../constants';
import { FileSystemItem, AppDefinition } from '../types';
import { SearchIcon, HomeIcon, AppsIcon, GamingIcon, LibraryIcon, ChevronRightIcon, ChevronLeftIcon, StarIcon, CheckCircleIcon } from '../assets/icons';

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

const NavItem: React.FC<{icon: React.ReactNode, label: string, active: boolean, onClick: () => void}> = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center p-2 rounded-md h-20 w-full transition-colors ${active ? 'bg-white/10' : 'hover:bg-white/20'}`}>
        {icon}
        <span className="text-xs mt-1">{label}</span>
    </button>
);

const Store: React.FC = () => {
    const { addFileSystemItem, deleteFileSystemItem, fileSystem, openApp } = useDesktop();
    const [activeView, setActiveView] = useState('Home');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApp, setSelectedApp] = useState<AppDefinition | null>(null);

    const allApps = useMemo(() => Object.values(APP_DEFINITIONS), []);
    const games = useMemo(() => allApps.filter(app => app.storeCategory === 'game'), [allApps]);
    const apps = useMemo(() => allApps.filter(app => !app.externalUrl && app.storeCategory === 'app'), [allApps]);

    const desktopItems = useMemo(() => {
        const desktopFolder = findItemById(fileSystem, 'desktop');
        return (desktopFolder?.content as FileSystemItem[]) || [];
    }, [fileSystem]);
    
    const installedApps = useMemo(() => {
        const installedIds = new Set(desktopItems.map(item => item.appId));
        return allApps.filter(app => installedIds.has(app.id));
    }, [desktopItems, allApps]);

    const isInstalled = (appId: string) => installedApps.some(app => app.id === appId);

    const handleInstall = (appDef: AppDefinition) => {
        if (isInstalled(appDef.id)) return;
        
        const newItem: FileSystemItem = {
            id: `desktop-${appDef.id}`,
            name: appDef.name,
            icon: React.isValidElement(appDef.icon) ? React.cloneElement(appDef.icon, {className: "w-12 h-12"}) : appDef.icon,
            type: 'app',
            appId: appDef.id,
            x: Math.random() * 200 + 200,
            y: Math.random() * 200 + 50,
        };
        addFileSystemItem(newItem, 'desktop');
    };

    const handleUninstall = (appId: string) => {
        const itemToRemove = desktopItems.find(item => item.appId === appId);
        if (itemToRemove) {
            deleteFileSystemItem(itemToRemove.id);
        }
    };
    
    const filteredResults = useMemo(() => {
        if (!searchTerm) return [];
        return allApps.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, allApps]);

    const AppCard: React.FC<{app: AppDefinition}> = ({ app }) => (
        <div onClick={() => setSelectedApp(app)} className="flex items-center gap-4 p-2 rounded-md hover:bg-white/10 cursor-pointer">
           <div className="w-12 h-12 flex-shrink-0">{React.cloneElement(app.icon, {className: "w-full h-full"})}</div>
           <div>
               <h3 className="font-semibold text-sm">{app.name}</h3>
               <p className="text-xs text-gray-400">{app.storeCategory?.toUpperCase()}</p>
           </div>
           <button className="ml-auto bg-gray-600 text-white px-3 py-1 rounded-md text-xs hover:bg-gray-500">View</button>
       </div>
   );
   
   const GameCard: React.FC<{game: AppDefinition}> = ({ game }) => (
       <div onClick={() => setSelectedApp(game)} className="w-48 flex-shrink-0 group cursor-pointer">
           <img src={game.imageUrl} alt={game.name} className="w-full h-28 object-cover rounded-lg mb-2 transform group-hover:scale-105 transition-transform" />
           <h4 className="font-semibold text-sm truncate">{game.name}</h4>
           <p className="text-xs text-gray-400">Free</p>
       </div>
   );
   
   const ContentCarousel: React.FC<{title: string, items: AppDefinition[], renderItem: (item: AppDefinition) => React.ReactNode}> = ({ title, items, renderItem }) => (
       <div className="mb-10">
           <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl font-bold">{title}</h3>
               <div className="flex items-center gap-2">
                   <button className="p-1 rounded-full bg-white/10 hover:bg-white/20"><ChevronLeftIcon className="w-4 h-4" /></button>
                   <button className="p-1 rounded-full bg-white/10 hover:bg-white/20"><ChevronRightIcon className="w-4 h-4" /></button>
               </div>
           </div>
           <div className="flex gap-4 overflow-x-auto pb-4 -mb-4">
               {items.map(item => <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>)}
           </div>
       </div>
   );

    const AppDetailView: React.FC<{ app: AppDefinition }> = ({ app }) => {
        const isAppInstalled = isInstalled(app.id);
        const discoverMoreGames = useMemo(() => [...games].filter(g => g.id !== app.id).sort(() => 0.5 - Math.random()).slice(0, 7), [app.id]);
        const ratingDist = useMemo(() => {
            const base = app.rating || 4;
            const dist = [
                Math.round(base * 20 + Math.random() * 10), // 5 stars
                Math.round(base * 5 + Math.random() * 5),  // 4 stars
                Math.round(base * 2),                      // 3 stars
                Math.round(base * 1),                      // 2 stars
                Math.round(base * 1.5)                     // 1 star
            ];
            // ensure 5-star is highest
            dist[0] = Math.max(...dist) + 1;
            return dist;
        }, [app.rating]);
        const totalRatings = ratingDist.reduce((a, b) => a + b, 0);

        return (
            <div className="animate-fade-in flex gap-8">
                <div className="flex-grow">
                    <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                        <img src={app.imageUrl || app.screenshots?.[0] || 'https://i.imgur.com/8Q6o5mS.png'} alt={`${app.name} banner`} className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between text-white">
                             <div className="flex items-center gap-4">
                                <div className="w-20 h-20 flex-shrink-0 rounded-lg shadow-lg bg-gray-800 p-2">
                                   {React.cloneElement(app.icon, { className: 'w-full h-full' })}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">{app.name}</h1>
                                    <p className="text-gray-300">{app.publisher}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => isAppInstalled ? handleUninstall(app.id) : handleInstall(app)}
                                className={`px-8 py-3 rounded-lg text-lg font-semibold transition-colors ${
                                    isAppInstalled 
                                    ? 'bg-gray-700 hover:bg-gray-600'
                                    : 'bg-purple-600 hover:bg-purple-700'
                                }`}
                            >
                               {isAppInstalled ? 'Installed' : 'Install'}
                            </button>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-300 text-sm leading-relaxed">{app.description}</p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Ratings and reviews</h2>
                        <div className="flex items-start gap-4">
                            <div className="text-center">
                                <p className="text-5xl font-bold">{app.rating?.toFixed(1)}</p>
                                <p className="text-sm text-gray-400">{app.ratingCount} ratings</p>
                            </div>
                            <div className="flex-grow">
                                {ratingDist.map((count, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm mb-1">
                                        <span>{5 - i}</span>
                                        <StarIcon className="w-3 h-3 text-yellow-400"/>
                                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                                            <div className="bg-gray-400 h-1.5 rounded-full" style={{width: `${(count/totalRatings)*100}%`}}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Review summary based on {app.ratingCount} reviews</h2>
                        <p className="text-sm text-gray-400 mb-3">{app.reviewSummary}</p>
                        <div className="flex flex-wrap gap-2">
                            {(app.reviewTags || []).map(tag => (
                                <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Features</h2>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            {(app.features || []).map(feature => <li key={feature}>{feature}</li>)}
                        </ul>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">System Requirements</h2>
                        <div className="bg-gray-800/50 p-4 rounded-lg text-sm">
                           <div className="flex items-center gap-2 text-green-400">
                               <CheckCircleIcon className="w-5 h-5" />
                               <span>{app.systemRequirements}</span>
                           </div>
                        </div>
                    </div>
                    
                    <div className="text-sm text-gray-400">
                        <h2 className="text-xl font-semibold mb-2 text-white">Additional information</h2>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                               <h3 className="font-semibold text-gray-300">Published by</h3>
                               <p>{app.publisher}</p>
                           </div>
                            <div>
                               <h3 className="font-semibold text-gray-300">Release date</h3>
                               <p>{app.releaseDate}</p>
                           </div>
                            <div>
                               <h3 className="font-semibold text-gray-300">Last updated</h3>
                               <p>{app.lastUpdated}</p>
                           </div>
                            <div>
                               <h3 className="font-semibold text-gray-300">Category</h3>
                               <p>{app.category}</p>
                           </div>
                        </div>
                    </div>
                </div>

                <div className="w-80 flex-shrink-0">
                    <h2 className="text-xl font-semibold mb-4">Discover more</h2>
                    <div className="flex flex-col gap-4">
                        {discoverMoreGames.map(game => (
                            <div key={game.id} onClick={() => setSelectedApp(game)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer">
                                <img src={game.imageUrl} alt={game.name} className="w-16 h-16 object-cover rounded-md"/>
                                <div>
                                    <p className="text-sm font-semibold">{game.name}</p>
                                    <p className="text-xs text-gray-400">Free</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    };

    const renderContent = () => {
        if (selectedApp) {
            return <AppDetailView app={selectedApp} />;
        }
        
        if (searchTerm) {
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Search Results for "{searchTerm}"</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredResults.map(app => (
                             <div key={app.id} onClick={() => setSelectedApp(app)} className="bg-[#2b2b2b] p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12">{app.icon}</div>
                                    <div>
                                        <h3 className="font-semibold">{app.name}</h3>
                                        <p className="text-sm text-gray-400">{app.storeCategory?.toUpperCase()}</p>
                                    </div>
                                </div>
                                <button className="bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm">View</button>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
        
        switch (activeView) {
            case 'Home':
                return (
                    <div>
                        <div className="h-64 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg mb-10 p-8 flex items-end">
                            <h2 className="text-3xl font-bold">Discover Apps & Games</h2>
                        </div>
                        <ContentCarousel title="Trending games" items={games.slice(0, 10)} renderItem={(item) => <GameCard game={item}/>} />
                        <ContentCarousel title="Trending apps" items={apps.slice(0, 5)} renderItem={(item) => <AppCard app={item}/>} />
                    </div>
                );
            case 'Apps':
                 return (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">All Apps</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {apps.map(app => <AppCard key={app.id} app={app} />)}
                         </div>
                    </div>
                 );
            case 'Gaming':
                return (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">All Games</h2>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-6">
                            {games.map(game => <GameCard key={game.id} game={game} />)}
                        </div>
                    </div>
                );
            case 'Library':
                return (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Library</h2>
                        <div className="flex flex-col gap-2">
                           {installedApps.map(app => (
                                <div key={app.id} className="bg-[#2b2b2b] p-3 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10">{app.icon}</div>
                                        <div>
                                            <h3 className="font-semibold">{app.name}</h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => openApp(app.id)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm">Open</button>
                                        <button onClick={() => handleUninstall(app.id)} className="text-xs text-gray-400 hover:underline">Uninstall</button>
                                    </div>
                                </div>
                           ))}
                        </div>
                    </div>
                )
            default: return null;
        }
    }

    return (
        <div className="h-full w-full flex bg-[#181818] text-white">
            <div className="w-24 bg-[#2b2b2b] p-2 flex-shrink-0 flex flex-col items-center gap-4 pt-4">
                <NavItem icon={<HomeIcon className="w-6 h-6"/>} label="Home" active={activeView === 'Home' && !selectedApp} onClick={() => { setActiveView('Home'); setSelectedApp(null); }} />
                <NavItem icon={<AppsIcon className="w-6 h-6"/>} label="Apps" active={activeView === 'Apps' && !selectedApp} onClick={() => { setActiveView('Apps'); setSelectedApp(null); }} />
                <NavItem icon={<GamingIcon className="w-6 h-6"/>} label="Gaming" active={activeView === 'Gaming' && !selectedApp} onClick={() => { setActiveView('Gaming'); setSelectedApp(null); }} />
                <NavItem icon={<LibraryIcon className="w-6 h-6"/>} label="Library" active={activeView === 'Library' && !selectedApp} onClick={() => { setActiveView('Library'); setSelectedApp(null); }} />
            </div>
            <div className="flex-grow flex flex-col">
                <div className="h-16 flex-shrink-0 flex items-center justify-between px-6 border-b border-white/10">
                    {selectedApp ? (
                        <button onClick={() => setSelectedApp(null)} className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10">
                           <ChevronLeftIcon className="w-5 h-5" />
                           <span className="font-semibold">Back</span>
                        </button>
                    ) : (
                        <div className="flex-grow max-w-lg">
                            <div className="relative">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <input
                                    type="text"
                                    placeholder="Search apps, games, and more"
                                    value={searchTerm}
                                    onChange={e => { setSearchTerm(e.target.value); setSelectedApp(null); }}
                                    className="w-full bg-[#2b2b2b] rounded-full py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    )}
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold">U</div>
                </div>
                <div className="flex-grow overflow-y-auto p-6">
                    {renderContent()}
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Store;