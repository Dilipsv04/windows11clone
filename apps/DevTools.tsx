import React, { useState, useEffect, useRef } from 'react';
import { CloseIcon, CodeIcon, TerminalIcon, ChevronRightIcon, ChevronLeftIcon } from '../assets/icons';
import type { Log, DevToolsState } from './Browser';

interface DevToolsProps {
    iframeRef: HTMLIFrameElement | null;
    devToolsState: DevToolsState;
    onCommand: (command: string) => void;
    onCommandReturn: (value: any) => void;
    onClose: () => void;
}

const DevTools: React.FC<DevToolsProps> = ({ iframeRef, devToolsState, onCommand, onCommandReturn, onClose }) => {
    const [activeTab, setActiveTab] = useState<'Elements' | 'Console'>('Console');
    const [htmlContent, setHtmlContent] = useState('');
    const [command, setCommand] = useState('');
    const consoleEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeTab === 'Elements' && iframeRef?.contentDocument) {
            try {
                const formattedHtml = iframeRef.contentDocument.documentElement.outerHTML;
                setHtmlContent(formattedHtml);
            } catch (e) {
                setHtmlContent("<!-- Cannot access cross-origin document -->");
            }
        }
    }, [activeTab, iframeRef, iframeRef?.contentDocument]);
    
    useEffect(() => {
        consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [devToolsState.logs]);

    const handleCommandSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && command.trim()) {
            onCommand(command);
            try {
                if (iframeRef?.contentWindow) {
                    const result = (iframeRef.contentWindow as any).eval(command);
                    onCommandReturn(result);
                }
            } catch (err: any) {
                onCommandReturn(err);
            }
            setCommand('');
        }
    };
    
    const formatLogMessage = (message: any) => {
        if (message instanceof Error) {
            return message.toString();
        }
        if (Array.isArray(message)) {
            return message.map(m => typeof m === 'object' ? JSON.stringify(m, null, 2) : String(m)).join(' ');
        }
        if (typeof message === 'object' && message !== null) {
            return JSON.stringify(message, null, 2);
        }
        if (message === undefined) return 'undefined';
        return String(message);
    }

    const renderLog = (log: Log) => {
        let classes = '';
        let icon = null;
        switch(log.type) {
            case 'command':
                classes = 'text-gray-400 border-b border-gray-700';
                icon = <ChevronRightIcon className="w-4 h-4 flex-shrink-0 text-gray-500" />;
                break;
            case 'return':
                classes = 'text-cyan-400';
                 icon = <ChevronLeftIcon className="w-4 h-4 flex-shrink-0 text-gray-500" />;
                break;
            case 'error':
                classes = 'text-red-400';
                break;
            case 'warn':
                classes = 'text-yellow-400';
                break;
        }

        return (
            <div key={log.id} className={`flex items-start gap-2 p-1 font-mono text-sm ${classes}`}>
                {icon}
                <pre className="whitespace-pre-wrap break-all">{formatLogMessage(log.message)}</pre>
            </div>
        );
    };

    return (
        <div className="h-1/3 bg-[#2b2b2b] flex flex-col border-t-2 border-gray-700 flex-shrink-0">
            <div className="flex-shrink-0 bg-[#333] flex items-center justify-between px-2">
                <div className="flex">
                    <button onClick={() => setActiveTab('Elements')} className={`px-3 py-2 text-sm flex items-center gap-2 ${activeTab === 'Elements' ? 'bg-[#2b2b2b] text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                        <CodeIcon /> Elements
                    </button>
                    <button onClick={() => setActiveTab('Console')} className={`px-3 py-2 text-sm flex items-center gap-2 ${activeTab === 'Console' ? 'bg-[#2b2b2b] text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                        <TerminalIcon /> Console
                    </button>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700"><CloseIcon/></button>
            </div>
            <div className="flex-grow overflow-auto">
                {activeTab === 'Elements' && (
                    <pre className="p-2 text-sm text-gray-300 whitespace-pre-wrap font-mono">
                        <code dangerouslySetInnerHTML={{ __html: htmlContent.replace(/</g, "&lt;").replace(/>/g, "&gt;") }}></code>
                    </pre>
                )}
                {activeTab === 'Console' && (
                     <div className="h-full flex flex-col">
                        <div className="flex-grow overflow-y-auto p-1">
                            {devToolsState.logs.map(renderLog)}
                            <div ref={consoleEndRef} />
                        </div>
                        <div className="flex-shrink-0 flex items-center border-t border-gray-700 bg-gray-800">
                           <ChevronRightIcon className="w-5 h-5 text-gray-400 mx-1"/>
                            <input
                                type="text"
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                onKeyDown={handleCommandSubmit}
                                placeholder=">_"
                                className="w-full bg-transparent p-1 font-mono text-sm outline-none"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DevTools;