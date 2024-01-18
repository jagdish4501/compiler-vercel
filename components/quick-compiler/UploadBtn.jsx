import { AppContext } from 'context/quick-compiler/AppContext';
import Image from 'next/image';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';

export default function UploadBtn({ setIsOpen }) {
  const { editorRef, setLanguage } = useContext(AppContext);

  function handleOnChange(e) {
    e.preventDefault();

    const reader = new FileReader();

    if (e.target.files.length === 0) {
      return;
    }
    if (e.target.files.length > 1) {
      toast.error('Only One File Is Allowed');
      return;
    }
    // validate file
    const ext = e.target.files[0].name.split('.');
    if (ext.length > 2) {
      toast.error('Invalid File Name');
      return;
    }

    let lang;
    switch (ext[1]) {
      case 'c':
        lang = 'c';
        break;
      case 'cpp':
        lang = 'cpp';
        break;
      case 'py':
        lang = 'python';
        break;
      case 'java':
        lang = 'java';
        break;
      case 'js':
        lang = 'javascript';
        break;
      default:
        lang = null;
    }
    if (lang === null) {
      toast.error('Invalid File Extension');
      return;
    }
    setLanguage(lang);

    reader.onload = async (e) => {
      const text = e.target.result;
      editorRef.current.setValue(text);
    };

    reader.readAsText(e.target.files[0]);
  }

  return (
    <button
      style={{
        marginTop: '5px',
        marginBottom: '3px',
      }}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <label htmlFor="uploadSourceFile" className="flex cursor-pointer items-center space-x-2">
        <Image src="/quick-compiler/cloud-upload-outline.svg" alt="Upload" width={20} height={20} />
        <span className=" text-left font-rubik text-sm font-medium text-compiler-txt3">Upload</span>
        <input
          type="file"
          id="uploadSourceFile"
          className="hidden"
          accept=".cpp, .c, .py, .java, .js"
          max="1"
          onChange={handleOnChange}
        />
      </label>
    </button>
  );
}
