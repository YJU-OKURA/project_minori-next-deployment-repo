'use client';

import React, {
  useState,
  useRef,
  useEffect,
  RefObject,
  useCallback,
} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Material = () => {
  const uploadedPdfUrl =
    'https://d3sbrbqucv1146.cloudfront.net/metarials/class1/1711584517380.pdf';

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [file, setFile] = useState<string>(uploadedPdfUrl);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>('1');
  const pageRefs = useRef<(RefObject<HTMLDivElement> | null)[]>([]);
  const [scale, setScale] = useState<number>(1.0);

  // PDFファイルが読み込まれたときの処理
  function onDocumentLoadSuccess({numPages}: {numPages: number}) {
    setNumPages(numPages);
    pageRefs.current = Array(numPages)
      .fill(null)
      .map(() => React.createRef<HTMLDivElement>());
  }

  // ページの拡大率を変更する
  const zoomIn = useCallback(() => setScale(prevScale => prevScale + 0.1), []);
  const zoomOut = useCallback(() => setScale(prevScale => prevScale - 0.1), []);
  const resetZoom = useCallback(() => setScale(1.0), []);

  // ページが表示されたときの処理
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

    // ページが表示されたときにページ番号を更新する
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

  // ページ番号を指定してページに移動する
  const goToPage = (page: number) => {
    const pageElement = pageRefs.current[page - 1]?.current;
    if (pageElement) {
      pageElement.scrollIntoView();
      setPageNumber(page);
    }
  };

  // ページ数が変わったときにページの表示を監視する
  useEffect(() => {
    const cleanupFunctions = Array(numPages || 0)
      .fill(null)
      .map((_, index) => observePage(index));
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [numPages]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start">
      {' '}
      {file && (
        <>
          <div className="relative top-0 left-1/2 transform -translate-x-1/2 z-20">
            {' '}
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
              className="border rounded p-1 w-10 text-center mr-2"
            />
            / {numPages ? numPages : 'Loading...'}
            <button onClick={zoomIn} className="ml-2">
              +
            </button>
            <button onClick={resetZoom} className="ml-2">
              🔄
            </button>
            <button onClick={zoomOut} className="ml-2">
              -
            </button>
          </div>
          <div className="mt-8">
            <div className="h-[80vh] overflow-auto z-10">
              <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages || 0), (_, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    scale={scale}
                    inputRef={pageRefs.current[index]}
                  />
                ))}
              </Document>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Material;
