import React, {useState, useRef, useEffect} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Material = () => {
  const [file, setFile] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>('1');
  const pageRefs = useRef<(React.RefObject<HTMLDivElement> | null)[]>([]);

  // PDF 파일이 로드되었을 때의 처리
  function onDocumentLoadSuccess({numPages}: {numPages: number}) {
    setNumPages(numPages);
    pageRefs.current = Array(numPages)
      .fill(null)
      .map(() => React.createRef());
  }

  // 페이지가 표시되었을 때의 처리
  const observePage = (pageIndex: number) => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPageNumber(pageIndex + 1);
          setInputValue((pageIndex + 1).toString());
        }
        console.log(pageNumber);
      },
      {threshold: 0.5}
    );

    // 페이지가 표시되었을 때 페이지 번호를 업데이트
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

  // 페이지 번호를 지정하여 페이지로 이동
  const goToPage = (page: number) => {
    const pageElement = pageRefs.current[page - 1]?.current;
    if (pageElement) {
      pageElement.scrollIntoView();
    }
  };

  // 페이지 수가 변경되었을 때 페이지 표시를 감시
  useEffect(() => {
    const cleanupFunctions = Array(numPages || 0)
      .fill(null)
      .map((_, index) => observePage(index));
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [numPages]);

  // 파일 경로 설정
  useEffect(() => {
    setFile(
      'https://d3sbrbqucv1146.cloudfront.net/metarials/class1/1711591504369.pdf'
    );
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
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
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
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

export default Material;
