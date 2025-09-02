
import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { ChevronLeftIcon, ChevronRightIcon } from '../assets/icons';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://esm.sh/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer: React.FC<{ windowId: string; data?: any }> = ({ data }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    setError(`Error while loading PDF: ${error.message}`);
  };

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages || 1));

  if (!data || typeof data.content !== 'string') {
    return <div className="p-4 text-red-400">Invalid PDF data.</div>;
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-800">
      <div className="flex-shrink-0 bg-[#2b2b2b] p-2 flex items-center justify-center gap-4 text-white">
        <button onClick={goToPrevPage} disabled={pageNumber <= 1} className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50">
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <p className="text-sm">
          Page {pageNumber} of {numPages || '--'}
        </p>
        <button onClick={goToNextPage} disabled={pageNumber >= (numPages || 1)} className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50">
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-grow overflow-auto flex justify-center p-4">
        {error ? (
          <div className="p-4 text-red-400">{error}</div>
        ) : (
          <Document
            file={data.content}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="flex justify-center"
          >
            <Page pageNumber={pageNumber} renderTextLayer={false} />
          </Document>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;