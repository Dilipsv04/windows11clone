
import React from 'react';
import type { ContextMenuData } from '../types';
import { useDesktop } from '../context/DesktopContext';

const ContextMenu: React.FC<ContextMenuData> = ({ x, y, items }) => {
    const { setContextMenu } = useDesktop();
    
    const handleClick = (action: () => void) => {
        action();
        setContextMenu(null);
    };

    return (
        <div
            className="fixed bg-gray-800/80 backdrop-blur-xl text-white rounded-md shadow-2xl py-2 z-[2000] border border-white/10"
            style={{ top: y, left: x }}
        >
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <button
                            className={`w-full text-left px-4 py-1.5 text-sm flex items-center gap-3 ${item.disabled ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-blue-500'}`}
                            onClick={() => !item.disabled && handleClick(item.action)}
                            disabled={item.disabled}
                        >
                           {item.icon && <span>{item.icon}</span>}
                           <span>{item.label}</span>
                        </button>
                        {item.separator && <hr className="border-white/10 my-1" />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContextMenu;