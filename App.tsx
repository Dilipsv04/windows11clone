
import React from 'react';
import { DesktopProvider } from './context/DesktopContext';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';

const App: React.FC = () => {
    return (
        <DesktopProvider>
            <div className="h-screen w-screen overflow-hidden">
                <Desktop />
                <Taskbar />
            </div>
        </DesktopProvider>
    );
};

export default App;