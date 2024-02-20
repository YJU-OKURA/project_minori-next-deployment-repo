'use client';

import React, {useState, useRef, useEffect} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyPdfViewer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>('1');
  const pageRefs = useRef<(React.RefObject<HTMLDivElement> | null)[]>([]);

  function onDocumentLoadSuccess({numPages}: {numPages: number}) {
    setNumPages(numPages);
    pageRefs.current = Array(numPages)
      .fill(null)
      .map(() => React.createRef());
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const observePage = (pageIndex: number) => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPageNumber(pageIndex + 1);
          setInputValue((pageIndex + 1).toString());
        }
      },
      {threshold: 0.5}
    );
    const pageElement = pageRefs.current[pageIndex]?.current;
    if (pageElement) {
      observer.observe(pageElement);
    }
    return () => {
      if (pageElement) {
        observer.unobserve(pageElement);
      }
    };
  };

  const goToPage = (page: number) => {
    const pageElement = pageRefs.current[page - 1]?.current;
    if (pageElement) {
      pageElement.scrollIntoView();
    }
  };

  useEffect(() => {
    const cleanupFunctions = Array(numPages || 0)
      .fill(null)
      .map((_, index) => observePage(index));
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [numPages]);

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {file && (
        <div>
          <div>
            <label>Page: </label>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  goToPage(Number(inputValue));
                }
              }}
              className="border rounded p-1 w-10 text-center"
            />
            / {numPages}
          </div>
          <div className="h-[80vh] overflow-auto">
            <Document file={file as File} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages || 0), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  inputRef={pageRefs.current[index]}
                />
              ))}
            </Document>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPdfViewer;
