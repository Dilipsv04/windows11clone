
import { useEffect, useRef } from 'react';
import type { WindowInstance } from '../types';
import { useDesktop } from '../context/DesktopContext';

const useResizable = (
    windowRef: React.RefObject<HTMLDivElement>,
    window: WindowInstance
) => {
    const { updateWindowSize, updateWindowPosition } = useDesktop();
    const isResizing = useRef(false);
    const resizeDirection = useRef('');
    const initialPos = useRef({ x: 0, y: 0 });
    const initialSize = useRef({ width: 0, height: 0 });
    const initialMousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const currentWindow = windowRef.current;
        if (!currentWindow) return;

        const handleMouseDown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.classList.contains('resizer') || window.isMaximized) return;

            e.preventDefault();
            isResizing.current = true;
            resizeDirection.current = target.dataset.direction || '';
            initialPos.current = { x: window.x, y: window.y };
            initialSize.current = { width: window.width, height: window.height };
            initialMousePos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing.current || window.isMaximized) return;

            const dx = e.clientX - initialMousePos.current.x;
            const dy = e.clientY - initialMousePos.current.y;

            let newWidth = initialSize.current.width;
            let newHeight = initialSize.current.height;
            let newX = initialPos.current.x;
            let newY = initialPos.current.y;
            const minSize = 200;

            if (resizeDirection.current.includes('right')) {
                newWidth = Math.max(minSize, initialSize.current.width + dx);
            }
            if (resizeDirection.current.includes('bottom')) {
                newHeight = Math.max(minSize, initialSize.current.height + dy);
            }
            if (resizeDirection.current.includes('left')) {
                newWidth = Math.max(minSize, initialSize.current.width - dx);
                if (newWidth > minSize) {
                   newX = initialPos.current.x + dx;
                }
            }
            if (resizeDirection.current.includes('top')) {
                newHeight = Math.max(minSize, initialSize.current.height - dy);
                 if (newHeight > minSize) {
                   newY = initialPos.current.y + dy;
                }
            }
            updateWindowSize(window.id, newWidth, newHeight);
            updateWindowPosition(window.id, newX, newY);
        };

        const handleMouseUp = () => {
            isResizing.current = false;
        };

        currentWindow.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            if (currentWindow) {
                currentWindow.removeEventListener('mousedown', handleMouseDown);
            }
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.id, window.x, window.y, window.width, window.height, window.isMaximized]);
};

export default useResizable;
