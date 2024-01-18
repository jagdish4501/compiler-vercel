import { AppContext } from 'context/quick-compiler/AppContext';
import { SaveContext } from 'context/quick-compiler/SaveContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import DownloadBtn from './DownloadBtn';
import DropDown from './Dropdown';
import RunCodeButton from './RunCodeButton';
import SaveBtn from './SaveBtn';
import Settings from './Settings';
import ShareButton from './ShareButton';
import UploadBtn from './UploadBtn';

function LanguageDropDown() {
  const { languages, language, changeLanguage } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropDown
      title={language === 'cpp' ? 'C++' : language.charAt(0).toUpperCase() + language.slice(1)}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {languages.map((lang, indx) => (
        <button
          key={indx}
          onClick={() => {
            changeLanguage(lang);
            setIsOpen(false);
          }}
        >
          <span className="text-left font-rubik text-sm font-medium text-compiler-txt1">
            {lang === 'cpp' ? 'C++' : lang === 'python' ? 'Python 3' : lang.charAt(0).toUpperCase() + lang.slice(1)}
          </span>
        </button>
      ))}
    </DropDown>
  );
}

function FileDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const { viewMode, setViewMode, editMode, setEditMode } = useContext(SaveContext);
  const { language, changeLanguage, setInp, setOutput } = useContext(AppContext);

  return (
    <DropDown title="File" isOpen={isOpen} setIsOpen={setIsOpen} border={true}>
      <button
        style={{
          paddingTop: '10px',
        }}
        className="flex items-center space-x-2"
        onClick={() => {
          if (viewMode) {
            setIsOpen(false);
            setViewMode(false);
            setInp('');
            setOutput('');
            changeLanguage(language);
            if (typeof window !== 'undefined') {
              window.open('/quick-compiler', '_blank');
            }
            window.location.reload();
            return;
          }
          if (editMode) {
            setIsOpen(false);
            setEditMode(false);
            setInp('');
            setOutput('');
            changeLanguage(language);
            if (typeof window !== 'undefined') {
              window.open('/quick-compiler', '_blank');
            }
            window.location.reload();
            return;
          }
          if (typeof window !== 'undefined') {
            window.open('/quick-compiler', '_blank');
            setIsOpen(false);
          }
        }}
      >
        <Image src="/quick-compiler/file-add-outline.svg" alt="Upload" width={20} height={20} />
        <span className="text-left font-rubik text-sm font-medium text-compiler-txt3">New</span>
      </button>

      {!viewMode && <UploadBtn setIsOpen={setIsOpen} />}
      <DownloadBtn setIsOpen={setIsOpen} />
    </DropDown>
  );
}

export default function SubNav() {
  const router = useRouter();
  const { language } = useContext(AppContext);
  const { viewMode, editMode } = useContext(SaveContext);

  // console.log(viewMode);

  return (
    <div className="border-b-8 border-b-darkBg bg-compiler-bg2">
      <div className="relative z-[100000] flex min-h-[55px] flex-col-reverse items-stretch justify-around md:min-h-[35px] md:flex-row md:justify-between">
        <div className="flex justify-center">
          <span className="hidden md:flex">
            <RunCodeButton />
          </span>
          <div className="flex items-center justify-center space-x-2">
            {!viewMode && !editMode ? (
              <LanguageDropDown />
            ) : (
              <p className="px-3 pl-4 font-rubik text-sm font-medium text-compiler-txt2">
                {language === 'cpp'
                  ? 'C++'
                  : language === 'python'
                  ? 'Python 3'
                  : language.charAt(0).toUpperCase() + language.slice(1)}
              </p>
            )}
            <FileDropDown />
            <Settings />
          </div>
        </div>
        <div className="flex min-h-[50px] justify-center space-x-2 py-2 md:min-h-[unset] md:space-x-0 md:py-0">
          <span className="flex md:hidden">
            <RunCodeButton />
          </span>
          {!viewMode && <SaveBtn />}
          {viewMode && !editMode && (
            <button
              className="flex items-center space-x-1 bg-yellow-600 px-4 text-center text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none"
              onClick={() => {
                router.push(`/quick-compiler/edit/${router.asPath.split('/').reverse()[0]}`);
              }}
            >
              <span className="mt-[1.75px] hidden text-left font-rubik text-sm font-medium uppercase text-white md:block">
                Edit
              </span>
              <Image
                src="/quick-compiler/edit-outline.svg"
                alt="Upload"
                width={22}
                height={22}
                className="ml-1 invert"
              />
            </button>
          )}
          <ShareButton />
        </div>
      </div>
    </div>
  );
}
