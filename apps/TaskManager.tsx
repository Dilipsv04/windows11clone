import React, { useState } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { SearchIcon, ProcessesIcon, PerformanceIcon, AppHistoryIcon, SettingsIcon, FileExplorerIcon, WindowsIcon } from '../assets/icons';

const NavItem: React.FC<{icon: React.ReactNode, label: string, active: boolean, onClick: () => void}> = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center p-2 rounded-md h-16 w-full ${active ? 'bg-blue-600/50' : 'hover:bg-white/10'}`}>
        {icon}
        <span className="text-xs mt-1">{label}</span>
    </button>
);

interface ProcessInfo {
    icon: React.ReactElement<{ className?: string }>;
    title: string;
}

const ProcessRow: React.FC<{win: ProcessInfo}> = ({ win }) => (
    <div className="grid grid-cols-[40%,15%,15%,15%,15%] items-center p-2 border-b border-gray-700/50 hover:bg-gray-700/50 text-sm">
        <div className="flex items-center gap-2">
            {React.isValidElement(win.icon) ? React.cloneElement(win.icon, { className: 'w-4 h-4' }) : win.icon}
            <span>{win.title}</span>
        </div>
        <div className="text-right">Efficiency mode</div>
        <div className="text-right">{(Math.random() * 20).toFixed(1)}%</div>
        <div className="text-right">{(Math.random() * 200).toFixed(1)} MB</div>
        <div className="text-right">0 MB/s</div>
    </div>
);


const TaskManager: React.FC<{ windowId: string }> = () => {
    const { windows, closeWindow } = useDesktop();
    const [activeView, setActiveView] = useState('Processes');

    const runningProcesses = windows.filter(win => !win.isMinimized);

    return (
        <div className="h-full w-full flex bg-[#202020] text-white">
            <div className="w-16 bg-[#2b2b2b] p-1 flex-shrink-0 flex flex-col items-center gap-1">
                <NavItem icon={<ProcessesIcon className="w-6 h-6"/>} label="Processes" active={activeView === 'Processes'} onClick={() => setActiveView('Processes')} />
                <NavItem icon={<PerformanceIcon className="w-6 h-6"/>} label="Performance" active={activeView === 'Performance'} onClick={() => setActiveView('Performance')} />
                <NavItem icon={<AppHistoryIcon className="w-6 h-6"/>} label="App history" active={activeView === 'History'} onClick={() => setActiveView('History')} />
            </div>

            <div className="flex-grow p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                     <h1 className="text-2xl font-semibold">{activeView}</h1>
                     <div className="flex items-center gap-2">
                        <div className="flex items-center bg-gray-800 rounded px-2">
                            <SearchIcon className="text-gray-400" />
                            <input type="text" placeholder="Search" className="bg-transparent text-sm text-white p-1.5 outline-none w-48" />
                        </div>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1.5 rounded">Run new task</button>
                        <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded" onClick={() => runningProcesses.length > 0 && closeWindow(runningProcesses[0].id)}>End Task</button>
                     </div>
                </div>

                {activeView === 'Processes' && (
                    <div className="flex-grow overflow-y-auto">
                        <div className="grid grid-cols-[40%,15%,15%,15%,15%] bg-gray-700/30 font-semibold p-2 rounded-t-md text-sm text-gray-300">
                            <div className="text-left">Name</div>
                            <div className="text-right">Status</div>
                            <div className="text-right">CPU</div>
                            <div className="text-right">Memory</div>
                            <div className="text-right">Disk</div>
                        </div>
                        <div className="font-semibold text-md py-2 px-2">Apps ({runningProcesses.length})</div>
                        {runningProcesses.map(win => (
                           <ProcessRow key={win.id} win={win} />
                        ))}
                        <div className="font-semibold text-md py-2 px-2 mt-4">Background processes (Simulated)</div>
                        <ProcessRow key="bg1" win={{title: 'Antimalware Service Executable', icon: <SettingsIcon />}} />
                         <ProcessRow key="bg2" win={{title: 'Windows Explorer', icon: <FileExplorerIcon />}} />
                         <ProcessRow key="bg3" win={{title: 'Start', icon: <WindowsIcon />}} />
                    </div>
                )}
                 {activeView !== 'Processes' && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">{activeView} view not implemented.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskManager;