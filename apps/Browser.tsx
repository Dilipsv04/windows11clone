import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ReloadIcon, HomeIcon, CloseIcon, LockClosedIcon, StarIcon, DotsVerticalIcon } from '../assets/icons';
import DevTools from './DevTools';
import { useDesktop } from '../context/DesktopContext';
import type { ContextMenuItem } from '../types';

const HOME_PAGE = 'https://www.google.com/webhp?igu=1';

interface Bookmark {
  id: number;
  url: string;
  title: string;
  faviconUrl: string;
}

export interface Log {
    id: number;
    type: 'log' | 'error' | 'warn' | 'info' | 'command' | 'return';
    message: any;
}
export interface DevToolsState {
    logs: Log[];
}
interface Tab {
    id: number;
    url: string;
    history: string[];
    historyIndex: number;
    title: string;
    faviconUrl: string;
    isLoading: boolean;
    isDevToolsOpen: boolean;
    devToolsState: DevToolsState;
}

const Browser: React.FC<{ data?: { url?: string } }> = ({ data }) => {
    const { setContextMenu } = useDesktop();
    const initialUrl = data?.url || HOME_PAGE;

    const [tabs, setTabs] = useState<Tab[]>([
        { id: Date.now(), url: initialUrl, history: [initialUrl], historyIndex: 0, title: 'New Tab', faviconUrl: '', isLoading: true, isDevToolsOpen: false, devToolsState: { logs: [] } }
    ]);
    const [activeTabId, setActiveTabId] = useState(tabs[0].id);
    const [inputUrl, setInputUrl] = useState(initialUrl);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
    
    const iframeRefs = useRef<Map<number, HTMLIFrameElement>>(new Map());

    const activeTab = useMemo(() => tabs.find(t => t.id === activeTabId), [tabs, activeTabId]);

    // Load bookmarks from localStorage on initial render
    useEffect(() => {
        try {
            const storedBookmarks = localStorage.getItem('browser-bookmarks');
            if (storedBookmarks) {
                setBookmarks(JSON.parse(storedBookmarks));
            }
        } catch (error) {
            console.error("Failed to load bookmarks:", error);
            setBookmarks([]);
        }
    }, []);

    // Save bookmarks to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('browser-bookmarks', JSON.stringify(bookmarks));
        } catch (error) {
            console.error("Failed to save bookmarks:", error);
        }
    }, [bookmarks]);

    useEffect(() => {
        if (activeTab) {
            setInputUrl(activeTab.url);
        }
    }, [activeTab]);

    const updateTab = (id: number, updates: Partial<Tab>) => {
        setTabs(currentTabs => currentTabs.map(tab => tab.id === id ? { ...tab, ...updates } : tab));
    };
    
    const addLogToTab = (tabId: number, log: Omit<Log, 'id'>) => {
        setTabs(currentTabs => currentTabs.map(tab => {
            if (tab.id === tabId) {
                const newLog = { ...log, id: Date.now() + Math.random() };
                const newLogs = [...tab.devToolsState.logs, newLog];
                return { ...tab, devToolsState: { logs: newLogs } };
            }
            return tab;
        }));
    };

    const navigate = (url: string, tabId: number | null = null) => {
        const targetTabId = tabId ?? activeTabId;
        if (!targetTabId) return;

        const targetTab = tabs.find(t => t.id === targetTabId);
        if (!targetTab) return;
        
        let properUrl = url;
        try {
            if (!/^https?:\/\//i.test(url)) {
                if (url.includes('.') && !url.includes(' ')) {
                    properUrl = 'https://' + url;
                } else {
                    properUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
                }
            }
        } catch (e) {
            console.error("Invalid URL:", url);
            properUrl = `https://www.google.com/search?q=${encodeURIComponent("Error: Invalid URL")}`;
        }
        
        let faviconUrl = '';
        try {
            const domain = new URL(properUrl).origin;
            faviconUrl = `https://www.google.com/s2/favicons?sz=32&domain_url=${domain}`;
        } catch (e) {
            console.error("Could not create favicon URL from:", properUrl);
        }
        
        const newHistory = targetTab.history.slice(0, targetTab.historyIndex + 1);
        newHistory.push(properUrl);

        updateTab(targetTabId, {
            url: properUrl,
            history: newHistory,
            historyIndex: newHistory.length - 1,
            title: 'Loading...',
            faviconUrl: faviconUrl,
            isLoading: true,
        });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(inputUrl);
    };

    const goBack = () => {
        if (activeTab && activeTab.historyIndex > 0) {
            const newHistoryIndex = activeTab.historyIndex - 1;
            updateTab(activeTab.id, {
                historyIndex: newHistoryIndex,
                url: activeTab.history[newHistoryIndex],
                isLoading: true,
            });
        }
    };

    const goForward = () => {
        if (activeTab && activeTab.historyIndex < activeTab.history.length - 1) {
            const newHistoryIndex = activeTab.historyIndex + 1;
            updateTab(activeTab.id, {
                historyIndex: newHistoryIndex,
                url: activeTab.history[newHistoryIndex],
                isLoading: true,
            });
        }
    };

    const reload = () => {
        if (activeTabId) {
            const iframe = iframeRefs.current.get(activeTabId);
            if (iframe) {
                updateTab(activeTabId, { isLoading: true });
                // Change the key to force a remount and reload, or use src change
                iframe.src = tabs.find(t => t.id === activeTabId)!.url;
            }
        }
    };
    
    const goHome = () => navigate(HOME_PAGE);

    const addTab = () => {
        const newTab: Tab = { id: Date.now(), url: HOME_PAGE, history: [HOME_PAGE], historyIndex: 0, title: 'New Tab', faviconUrl: '', isLoading: true, isDevToolsOpen: false, devToolsState: { logs: [] } };
        setTabs([...tabs, newTab]);
        setActiveTabId(newTab.id);
    };

    const closeTab = (id: number) => {
        iframeRefs.current.delete(id);
        const tabIndex = tabs.findIndex(t => t.id === id);
        const newTabs = tabs.filter(t => t.id !== id);
        if (newTabs.length === 0) {
             const newTab: Tab = { id: Date.now(), url: HOME_PAGE, history: [HOME_PAGE], historyIndex: 0, title: 'New Tab', faviconUrl: '', isLoading: true, isDevToolsOpen: false, devToolsState: { logs: [] } };
             setTabs([newTab]);
             setActiveTabId(newTab.id);
        } else {
            setTabs(newTabs);
            if (activeTabId === id) {
                 setActiveTabId(newTabs[Math.max(0, tabIndex - 1)].id);
            }
        }
    };
    
    const handleIframeLoad = (tabId: number) => {
        const iframe = iframeRefs.current.get(tabId);
        if (!iframe) return;

        let title = 'Page';
        try {
            // Accessing contentDocument can throw a cross-origin error
            title = iframe.contentDocument?.title || new URL(iframe.src).hostname;
            // Proxy console
            const iframeConsole = (iframe.contentWindow as any)?.console;
            if (iframeConsole) {
                const patchConsole = (method: 'log' | 'warn' | 'error' | 'info') => {
                    const original = iframeConsole[method];
                    (iframeConsole as any)[method] = (...args: any[]) => {
                        addLogToTab(tabId, { type: method, message: args });
                        original.apply(iframeConsole, args);
                    };
                };
                patchConsole('log');
                patchConsole('warn');
                patchConsole('error');
                patchConsole('info');
            }
        } catch (e) {
            try {
                const currentTab = tabs.find(t=>t.id === tabId);
                title = currentTab ? new URL(currentTab.url).hostname : "Cross-origin page";
            } catch {
                 title = "Cannot access page";
            }
        }
        updateTab(tabId, { title, isLoading: false });
    };
    
    const isCurrentPageBookmarked = useMemo(() => {
        return bookmarks.some(b => b.url === activeTab?.url);
    }, [bookmarks, activeTab]);

    const toggleBookmark = () => {
        if (!activeTab || !activeTab.url || activeTab.isLoading || activeTab.title === 'Loading...') return;
        
        if (isCurrentPageBookmarked) {
            setBookmarks(bookmarks.filter(b => b.url !== activeTab.url));
        } else {
            const newBookmark: Bookmark = {
                id: Date.now(),
                url: activeTab.url,
                title: activeTab.title,
                faviconUrl: activeTab.faviconUrl
            };
            setBookmarks([...bookmarks, newBookmark]);
        }
    };

    const toggleDevTools = () => {
        if(activeTab) {
            updateTab(activeTab.id, { isDevToolsOpen: !activeTab.isDevToolsOpen });
            setMoreMenuOpen(false);
        }
    };
    
    const handleContentContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        const items: ContextMenuItem[] = [
            { label: 'Back', action: goBack, disabled: !activeTab || activeTab.historyIndex === 0 },
            { label: 'Forward', action: goForward, disabled: !activeTab || activeTab.historyIndex >= activeTab.history.length - 1},
            { label: 'Reload', action: reload, separator: true },
            { label: 'Inspect', action: toggleDevTools },
        ];
        setContextMenu({ x: e.clientX, y: e.clientY, items });
    }

    return (
        <div className="h-full w-full flex flex-col bg-[#202020] text-white" onClick={() => {if(isMoreMenuOpen) setMoreMenuOpen(false)}}>
            <div className="flex-shrink-0 bg-[#2b2b2b] flex items-end">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        onClick={() => setActiveTabId(tab.id)}
                        className={`flex items-center gap-2 pl-3 pr-2 py-2 border-r border-gray-700 cursor-pointer min-w-[120px] max-w-[200px] ${
                            activeTabId === tab.id ? 'bg-[#202020] rounded-t-md' : 'hover:bg-gray-700/50'
                        }`}
                    >
                        {tab.isLoading ? (
                           <ReloadIcon className="w-4 h-4 flex-shrink-0 animate-spin" />
                        ) : (
                           <img src={tab.faviconUrl} alt="" className="w-4 h-4 flex-shrink-0" onError={(e) => e.currentTarget.style.display='none'}/>
                        )}
                        <span className="text-sm truncate flex-grow">{tab.title}</span>
                        <button onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }} className="p-1 rounded-full hover:bg-gray-600 flex-shrink-0">
                            <CloseIcon className="w-3 h-3"/>
                        </button>
                    </div>
                ))}
                <button onClick={addTab} className="px-3 py-2 text-lg hover:bg-gray-700/50">+</button>
            </div>
            <div className="flex-shrink-0 bg-[#2b2b2b] flex items-center p-2 gap-2 border-b border-gray-700/50 relative">
                <button onClick={goBack} disabled={!activeTab || activeTab.historyIndex === 0} className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50"><ChevronLeftIcon /></button>
                <button onClick={goForward} disabled={!activeTab || activeTab.historyIndex >= activeTab.history.length - 1} className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50"><ChevronRightIcon /></button>
                <button onClick={reload} className="p-2 rounded-full hover:bg-white/10"><ReloadIcon /></button>
                <button onClick={goHome} className="p-2 rounded-full hover:bg-white/10"><HomeIcon /></button>
                <form onSubmit={handleFormSubmit} className="flex-grow flex items-center bg-gray-800 rounded-full border border-gray-700 focus-within:ring-2 focus-within:ring-blue-500">
                    <LockClosedIcon className="w-4 h-4 text-gray-400 mx-3"/>
                    <input
                        type="text"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        className="w-full bg-transparent text-white outline-none text-sm h-full py-2"
                        placeholder="Search Google or type a URL"
                    />
                    <button type="button" onClick={toggleBookmark} className="p-2 rounded-full hover:bg-white/10 mx-1">
                        <StarIcon className={`w-5 h-5 ${isCurrentPageBookmarked ? 'text-yellow-400' : 'text-gray-400'}`} />
                    </button>
                </form>
                <button onClick={(e) => {e.stopPropagation(); setMoreMenuOpen(!isMoreMenuOpen)}} className="p-2 rounded-full hover:bg-white/10"><DotsVerticalIcon /></button>
                {isMoreMenuOpen && (
                    <div className="absolute top-full right-2 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                        <button onClick={toggleDevTools} className="w-full text-left px-4 py-2 text-sm hover:bg-blue-600">Developer Tools</button>
                    </div>
                )}
            </div>
             <div className="flex-shrink-0 bg-[#2b2b2b] p-1 flex items-center gap-2 border-b border-gray-700/50 shadow-inner">
                {bookmarks.map(bookmark => (
                    <button key={bookmark.id} onClick={() => navigate(bookmark.url)} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 text-xs truncate max-w-[150px]">
                        <img src={bookmark.faviconUrl} alt="" className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{bookmark.title}</span>
                    </button>
                ))}
            </div>
            <div className="flex-grow flex flex-col bg-black">
                <div className="flex-grow relative" onContextMenu={handleContentContextMenu}>
                    {tabs.map(tab => (
                        <iframe
                            key={tab.id}
                            ref={el => {
                                if (el) iframeRefs.current.set(tab.id, el);
                                else iframeRefs.current.delete(tab.id);
                            }}
                            src={tab.url}
                            onLoad={() => handleIframeLoad(tab.id)}
                            onError={() => updateTab(tab.id, { isLoading: false, title: "Failed to load" })}
                            title={`Browser content for tab ${tab.id}`}
                            className={`w-full h-full border-none bg-white ${activeTabId === tab.id ? 'block' : 'hidden'}`}
                            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-presentation"
                        />
                    ))}
                </div>
                {activeTab?.isDevToolsOpen && (
                    <DevTools 
                        iframeRef={iframeRefs.current.get(activeTab.id) ?? null}
                        devToolsState={activeTab.devToolsState}
                        onCommand={(command) => addLogToTab(activeTab.id, { type: 'command', message: command })}
                        onCommandReturn={(value) => addLogToTab(activeTab.id, { type: 'return', message: value })}
                        onClose={toggleDevTools}
                    />
                )}
            </div>
        </div>
    );
};

export default Browser;
