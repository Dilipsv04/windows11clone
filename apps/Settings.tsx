
import React, { useState } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { 
    SystemIcon, BluetoothIcon, NetworkIcon, PersonalizationIcon, AppsIcon, 
    AccountsIcon, TimeIcon, GamingIcon, AccessibilityIcon, PrivacyIcon, UpdateIcon,
    CheckCircleIcon
} from '../assets/icons';

const menuConfig = [
    { name: 'System', icon: <SystemIcon/> },
    { name: 'Bluetooth & devices', icon: <BluetoothIcon/> },
    { name: 'Network & internet', icon: <NetworkIcon/> },
    { name: 'Personalization', icon: <PersonalizationIcon/> },
    { name: 'Apps', icon: <AppsIcon/> },
    { name: 'Accounts', icon: <AccountsIcon/> },
    { name: 'Time & language', icon: <TimeIcon/> },
    { name: 'Gaming', icon: <GamingIcon/> },
    { name: 'Accessibility', icon: <AccessibilityIcon/> },
    { name: 'Privacy & security', icon: <PrivacyIcon/> },
    { name: 'Windows Update', icon: <UpdateIcon/> }
];

const Settings: React.FC<{ windowId: string }> = () => {
    const { wallpaper, setWallpaper } = useDesktop();
    const [newWallpaperUrl, setNewWallpaperUrl] = useState('');
    const [activeMenu, setActiveMenu] = useState('Home');
    
    const handleSetWallpaper = () => {
        if (newWallpaperUrl.trim()) {
            setWallpaper(newWallpaperUrl.trim());
        }
    };
    
    return (
        <div className="h-full w-full flex bg-[#202020] text-white">
            <div className="w-72 bg-[#2b2b2b] p-2 flex-shrink-0 flex flex-col">
                <div className="p-2 mb-4">
                    <input type="text" placeholder="Find a setting" className="w-full bg-gray-700/50 text-white p-2 rounded-md outline-none text-sm" />
                </div>
                 <ul>
                    <li 
                        className={`p-2 my-1 rounded-md cursor-pointer flex items-center gap-3 relative ${activeMenu === 'Home' ? 'bg-white/10' : 'hover:bg-white/10'}`}
                        onClick={() => setActiveMenu('Home')}
                    >
                        {activeMenu === 'Home' && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 bg-blue-500 rounded-r-full"></div>}
                        <SystemIcon/> Home
                    </li>
                    <div className="h-px bg-white/10 my-2"></div>
                    {menuConfig.map(item => (
                         <li key={item.name} 
                            className={`p-2 my-1 rounded-md cursor-pointer flex items-center gap-3 relative ${activeMenu === item.name ? 'bg-white/10' : 'hover:bg-white/10'}`}
                            onClick={() => setActiveMenu(item.name)}
                         >
                            {activeMenu === item.name && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 bg-blue-500 rounded-r-full"></div>}
                            {item.icon} {item.name}
                         </li>
                    ))}
                </ul>
            </div>
            <div className="flex-grow p-10 overflow-y-auto">
                {activeMenu === 'Home' && (
                    <div>
                         <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-500"></div>
                            <div>
                                <h1 className="text-lg font-semibold">User</h1>
                                <p className="text-sm text-gray-400">user@example.com</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#2b2b2b] p-4 rounded-lg flex items-center gap-4">
                               <SystemIcon className="w-8 h-8 text-blue-400"/>
                               <div>
                                   <h3 className="font-semibold">10FLS03B0Q</h3>
                                   <p className="text-sm text-gray-400">Rename</p>
                               </div>
                            </div>
                             <div className="bg-[#2b2b2b] p-4 rounded-lg flex items-center gap-4">
                               <NetworkIcon className="w-8 h-8 text-blue-400"/>
                               <div>
                                   <h3 className="font-semibold">Ethernet</h3>
                                   <p className="text-sm text-gray-400">Connected</p>
                               </div>
                            </div>
                             <div className="bg-[#2b2b2b] p-4 rounded-lg flex items-center gap-4 col-span-2">
                               <UpdateIcon className="w-8 h-8 text-orange-400"/>
                               <div>
                                   <h3 className="font-semibold">Windows Update</h3>
                                   <p className="text-sm text-gray-400">Attention needed</p>
                               </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeMenu === 'Personalization' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Personalization</h2>
                        <div className="bg-[#2b2b2b] p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Change wallpaper</h3>
                            <p className="text-sm text-gray-400 mb-4">Set a new background for your desktop. Enter a URL for an image.</p>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={newWallpaperUrl}
                                    onChange={(e) => setNewWallpaperUrl(e.target.value)}
                                    placeholder="Enter image URL..."
                                    className="w-full bg-gray-700 text-white p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleSetWallpaper}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                                >
                                    Apply
                                </button>
                            </div>
                            <div className="mt-4">
                                <h4 className="text-md font-semibold mb-2">Current Wallpaper</h4>
                                <img src={wallpaper} alt="Current wallpaper" className="w-64 h-auto rounded-md shadow-lg" />
                            </div>
                        </div>
                    </div>
                )}
                {activeMenu !== 'Personalization' && activeMenu !== 'Home' && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">{activeMenu} settings not implemented.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;