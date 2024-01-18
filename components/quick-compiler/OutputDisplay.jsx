import { AppContext } from 'context/quick-compiler/AppContext';
import { SettingsContext } from 'context/quick-compiler/SettingsContext';
import { useContext, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineCloudDownload, AiOutlineCloudUpload } from 'react-icons/ai';
import { FiCheckCircle } from 'react-icons/fi';
import { MdContentCopy } from 'react-icons/md';
import Split from 'react-split';

function UploadSTDIN() {
  const { setInp } = useContext(AppContext);

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

    if (ext.length > 2 || ext[1] !== 'txt' || ext[1] === null) {
      toast.error('Only .txt Files Are Allowed');
      return;
    }

    reader.onload = async (e) => {
      const text = e.target.result;
      setInp(text);
    };
    reader.readAsText(e.target.files[0]);
  }

  return (
    <button className="transition-all duration-200 hover:scale-110" title="Upload Input">
      <label htmlFor="uploadInput" className="flex cursor-pointer items-center space-x-2">
        <AiOutlineCloudUpload className="h-5 w-5" />
        <input type="file" id="uploadInput" className="hidden" accept=".txt" max="1" onChange={handleOnChange} />
      </label>
    </button>
  );
}

function DownloadSTDOUT({ fileData }) {
  const linkRef = useRef(null);

  const handleDownload = () => {
    const blob = new Blob([fileData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    linkRef.current.download = 'output.txt';
    linkRef.current.href = url;
  };

  return (
    <button
      onClick={() => {
        handleDownload();
      }}
      className="transition-all duration-200 hover:scale-110"
      title="Download Output"
    >
      <a ref={linkRef} className="flex items-center space-x-2">
        <AiOutlineCloudDownload className="h-5 w-5" />
      </a>
    </button>
  );
}

export default function OutputDisplay() {
  const { inp, setInp, output, getFileName } = useContext(AppContext);
  const { myColors, myFont, myFontSize } = useContext(SettingsContext);
  const [copyButton, setCopyButton] = useState({ stdin: 'copy', stdout: 'copy' });

  let printOp = output

  const handleCopy = (std) => {
    try {
      let text = std === 'stdin' ? inp : printOp;
      navigator.clipboard.writeText(text);
      setCopyButton({ ...copyButton, [std]: 'copied' });
      setTimeout(() => {
        setCopyButton({ ...copyButton, [std]: 'copy' });
      }, 2000);
      toast.success(`${std} Copied to Clipboard`);
    } catch (err) {
      toast.error('Something Went Wrong');
    }
  };

  return (
    <div
      className="output-display-container flex-1 lg:w-1/2"
      style={{
        backgroundColor: myColors ? myColors.bg : '#1e1e1e',
      }}
    >
      <Split
        direction="vertical"
        sizes={[35, 65]}
        style={{
          height: '100%',
        }}
        minSize={150}
      >
        {/* STDIN */}
        <div className="flex w-full flex-col lg:h-1/3">
          <div className="flex items-center justify-between space-x-7 px-6 text-white">
            <p className="max-w-max rounded-b-md bg-darkBg p-1 px-6 font-rubik text-sm font-medium uppercase tracking-widest shadow-md">
              stdin
            </p>
            <span className="flex items-center space-x-2 rounded-b-md bg-darkBg p-1 px-4 shadow-md">
              {inp &&
                (copyButton.stdin === 'copy' ? (
                  <button
                    className="cursor-pointer transition-all duration-200 hover:scale-110"
                    title="Copy Input"
                    onClick={() => {
                      handleCopy('stdin');
                    }}
                  >
                    <MdContentCopy />
                  </button>
                ) : (
                  <button
                    className="cursor-pointer text-green-500 transition-all duration-200 hover:scale-110"
                    title="Copied"
                  >
                    <FiCheckCircle />
                  </button>
                ))}
              <UploadSTDIN />
            </span>
          </div>
          <textarea
            placeholder="Your Input Goes Here ..."
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            style={{
              fontFamily: myFont,
              fontSize: myFontSize,
              backgroundColor: myColors ? myColors.bg : '#1e1e1e',
              color: myColors ? myColors.fg : '#d4d4d4',
            }}
            className="min-h-[30vh] w-full resize-none px-6 py-4 outline-none transition-all duration-200 focus:outline-none lg:min-h-[unset] lg:flex-1"
          />
        </div>

        {/* STDOUT */}
        <div className="flex w-full flex-col lg:h-2/3">
          <div className="flex items-center justify-between space-x-7 px-6 text-white">
            <p className="max-w-max rounded-b-md bg-darkBg p-1 px-6 font-rubik text-sm font-medium uppercase tracking-widest shadow-md">
              stdout
            </p>
            <span className={`flex items-center space-x-2 rounded-b-md bg-darkBg ${printOp && 'p-1 px-4'} shadow-md`}>
              {printOp &&
                (copyButton.stdout === 'copy' ? (
                  <button
                    className="cursor-pointer transition-all duration-200 hover:scale-110"
                    title="Copy Output"
                    onClick={() => {
                      handleCopy('stdout');
                    }}
                  >
                    <MdContentCopy />
                  </button>
                ) : (
                  <button
                    className="cursor-pointer text-green-500 transition-all duration-200 hover:scale-110"
                    title="Copied"
                  >
                    <FiCheckCircle />
                  </button>
                ))}
              {printOp && <DownloadSTDOUT fileData={printOp} />}
            </span>
          </div>
          <textarea
            value={printOp}
            placeholder="Your Output Will Be Displayed Here ..."
            readOnly
            style={{
              fontFamily: myFont,
              fontSize: myFontSize,
              backgroundColor: myColors ? myColors.bg : '#1e1e1e',
              color: myColors ? myColors.fg : '#d4d4d4',
            }}
            className="min-h-[50vh] w-full resize-none px-6 py-4 outline-none transition-all duration-200 focus:outline-none lg:min-h-[unset] lg:flex-1"
          />
        </div>
      </Split>
    </div>
  );
}
