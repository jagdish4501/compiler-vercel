import { AppContext } from 'context/quick-compiler/AppContext';
import Image from 'next/image';
import { useContext, useRef } from 'react';

export default function DownloadBtn({ setIsOpen }) {
  const { editorRef, getFileName } = useContext(AppContext);
  const linkRef = useRef(null);
  const handleDownload = () => {
    const fileData = editorRef.current.getValue();
    const blob = new Blob([fileData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    // console.log(linkRef);
    linkRef.current.download = getFileName();
    linkRef.current.href = url;
  };

  return (
    <button
      onClick={() => {
        handleDownload();
        setIsOpen(false);
      }}
    >
      <a ref={linkRef} className="flex items-center justify-start space-x-2">
        <Image src="/quick-compiler/download-outline.svg" alt="Upload" width={20} height={20} />
        <span className="text-left font-rubik text-sm font-medium text-compiler-txt3">Download</span>
      </a>
    </button>
  );
}
