
import React, { useRef, useEffect, useState } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { PencilIcon, EraserIcon, SaveIcon, PictureIcon } from '../assets/icons';

const Paint: React.FC = () => {
  const { addFileSystemItem } = useDesktop();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FFFFFF');
  const [lineWidth, setLineWidth] = useState(5);
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    // Resize observer to handle window resizing
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const { width, height } = entry.contentRect;
            const currentDrawing = contextRef.current?.getImageData(0, 0, canvas.width, canvas.height);
            canvas.width = width;
            canvas.height = height;
            if (contextRef.current && currentDrawing) {
                 contextRef.current.putImageData(currentDrawing, 0, 0);
                 contextRef.current.lineCap = 'round';
                 contextRef.current.strokeStyle = color;
                 contextRef.current.lineWidth = lineWidth;
            }
        }
    });

    resizeObserver.observe(parent);
    
    const context = canvas.getContext('2d');
    if (context) {
        context.lineCap = 'round';
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        contextRef.current = context;
    }

    return () => resizeObserver.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);
  
  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!contextRef.current) return;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    const { offsetX, offsetY } = nativeEvent;
    
    if (tool === 'pencil') {
        contextRef.current.globalCompositeOperation = 'source-over';
    } else if (tool === 'eraser') {
        contextRef.current.globalCompositeOperation = 'destination-out';
    }
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const handleSave = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const dataUrl = canvas.toDataURL('image/png');
      const fileName = `Drawing-${Date.now()}.png`;
      const newItemId = `fs-item-${Date.now()}-${fileName}`;

      addFileSystemItem({
          id: newItemId,
          name: fileName,
          icon: <PictureIcon className="w-12 h-12" />,
          type: 'file',
          appId: 'image-viewer',
          content: dataUrl,
          mimeType: 'image/png',
          dateModified: Date.now(),
          size: dataUrl.length,
          data: { id: newItemId, name: fileName, content: dataUrl, mimeType: 'image/png' }
      }, 'desktop');
  };

  const colors = ['#EF4444', '#F97316', '#F59E0B', '#84CC16', '#22C55E', '#14B8A6', '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899', '#FFFFFF', '#000000'];

  return (
    <div className="w-full h-full flex flex-col bg-[#202020]">
      <div className="flex-shrink-0 bg-[#2b2b2b] p-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <button onClick={() => setTool('pencil')} className={`p-2 rounded ${tool === 'pencil' ? 'bg-blue-600' : 'hover:bg-white/10'}`}><PencilIcon className="w-5 h-5"/></button>
                <button onClick={() => setTool('eraser')} className={`p-2 rounded ${tool === 'eraser' ? 'bg-blue-600' : 'hover:bg-white/10'}`}><EraserIcon className="w-5 h-5"/></button>
            </div>
            <div className="h-6 w-px bg-gray-600"></div>
            <div className="flex items-center gap-2">
                {colors.map(c => (
                    <button key={c} onClick={() => setColor(c)} style={{ backgroundColor: c }} className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-white' : 'border-transparent'}`}></button>
                ))}
                <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-8 h-8 bg-transparent border-none"/>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Size:</span>
              <input type="range" min="1" max="50" value={lineWidth} onChange={e => setLineWidth(Number(e.target.value))} className="w-32"/>
            </div>
            <button onClick={handleSave} className="flex items-center gap-2 px-3 py-1.5 text-sm rounded bg-blue-600 hover:bg-blue-700">
                <SaveIcon className="w-4 h-4" />
                <span>Save</span>
            </button>
        </div>
      </div>
      <div className="flex-grow w-full h-full relative">
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onMouseLeave={finishDrawing}
            className="absolute top-0 left-0 bg-gray-700"
        />
      </div>
    </div>
  );
};

export default Paint;