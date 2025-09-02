import React, { useState, useRef, useEffect } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { FileSystemItem } from '../types';

const findItemByPath = (root: FileSystemItem, path: string[]): FileSystemItem | null => {
    let current: FileSystemItem | null = root;
    for (const segment of path) {
        if (current?.type !== 'folder' || !Array.isArray(current.content)) return null;
        const next = current.content.find(item => item.name === segment);
        if (!next) return null;
        current = next;
    }
    return current;
};

const Terminal: React.FC = () => {
    const { fileSystem } = useDesktop();
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<{ command: string; output: React.ReactNode }[]>([]);
    const [path, setPath] = useState<string[]>([]); // Path segments by name
    const endOfTerminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const pathString = `~/${path.join('/')}`;

    useEffect(() => {
        endOfTerminalRef.current?.scrollIntoView();
    }, [history]);
    
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const executeCommand = (cmd: string) => {
        const [command, ...args] = cmd.trim().split(' ');
        let output: React.ReactNode = `command not found: ${command}`;
        
        const currentDir = findItemByPath(fileSystem, path) || fileSystem;
        
        switch (command) {
            case 'help':
                output = "Available commands: help, ls, cd, cat, pwd, clear, echo";
                break;
            case 'ls':
                if (currentDir.type === 'folder' && Array.isArray(currentDir.content)) {
                    output = (
                        <div className="grid grid-cols-3 gap-x-4">
                            {currentDir.content.map(item => (
                                <span key={item.id} className={item.type === 'folder' ? 'text-blue-400' : ''}>
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    );
                }
                break;
            case 'pwd':
                output = `/${path.join('/')}`;
                break;
            case 'cd':
                const target = args[0] || '';
                if (target === '..') {
                    setPath(p => p.slice(0, -1));
                    output = null;
                } else if (target) {
                    if (currentDir.type === 'folder' && Array.isArray(currentDir.content)) {
                        const newDir = currentDir.content.find(i => i.name === target && i.type === 'folder');
                        if (newDir) {
                            setPath(p => [...p, newDir.name]);
                            output = null;
                        } else {
                            output = `cd: no such directory: ${target}`;
                        }
                    }
                }
                break;
            case 'cat':
                const fileName = args[0];
                if (currentDir.type === 'folder' && Array.isArray(currentDir.content)) {
                    const file = currentDir.content.find(i => i.name === fileName && i.type === 'file');
                    if (file) {
                        output = <pre className="whitespace-pre-wrap">{String(file.content)}</pre>;
                    } else {
                        output = `cat: no such file: ${fileName}`;
                    }
                }
                break;
            case 'clear':
                setHistory([]);
                output = null;
                break;
            case 'echo':
                output = args.join(' ');
                break;
            case '':
                output = null;
                break;
        }

        setHistory(h => [...h, { command: cmd, output }]);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeCommand(input);
        }
    };

    return (
        <div className="h-full w-full bg-black text-white font-mono text-sm p-2 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
            {history.map((entry, index) => (
                <div key={index}>
                    <div className="flex">
                        <span className="text-green-400">{pathString}$</span>
                        <p className="ml-2">{entry.command}</p>
                    </div>
                    {entry.output && <div className="text-gray-300">{entry.output}</div>}
                </div>
            ))}
            <div className="flex">
                <span className="text-green-400">{pathString}$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none ml-2"
                    autoFocus
                />
            </div>
            <div ref={endOfTerminalRef} />
        </div>
    );
};

export default Terminal;
