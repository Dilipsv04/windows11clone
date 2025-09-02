
import { useEffect, useRef } from 'react';
import type { WindowInstance } from '../types';
import { useDesktop } from '../context/DesktopContext';

const useDraggable = (
    windowRef: React.RefObject<HTMLDivElement>,
    headerRef: React.RefObject<HTMLDivElement>,
    window: WindowInstance
) => {
    const { updateWindowPosition } = useDesktop();
    const isDragging = useRef(false);
    const initialPos = useRef({ x: 0, y: 0 });
    const initialMousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;
        
        const handleMouseDown = (e: MouseEvent) => {
            if (window.isMaximized) return;
            isDragging.current = true;
            initialPos.current = { x: window.x, y: window.y };
            initialMousePos.current = { x: e.clientX, y: e.clientY };
            document.body.style.cursor = 'grabbing';
        };
        
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current || window.isMaximized) return;
            
            const dx = e.clientX - initialMousePos.current.x;
            const dy = e.clientY - initialMousePos.current.y;
            
            updateWindowPosition(window.id, initialPos.current.x + dx, initialPos.current.y + dy);
        };
        
        const handleMouseUp = () => {
            isDragging.current = false;
            document.body.style.cursor = 'default';
        };
        
        header.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            header.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [headerRef, updateWindowPosition, window.x, window.y, window.id, window.isMaximized]);
};

export default useDraggable;
