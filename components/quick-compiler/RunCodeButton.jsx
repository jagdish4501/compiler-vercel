import { AppContext } from 'context/quick-compiler/AppContext';
import Image from 'next/image';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';

export default function RunCodeButton() {
  const { language, inp, editorRef, loading, setLoading, setOutput } = useContext(AppContext);

  const compileCode = async (code) => {
    setLoading(true);
    try {
      const res = await fetch('http://3.111.208.57/api/compile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code:code,language: language, input: inp }),
      });
      const data = await res.json();
      if (typeof data.message === 'string'){
        console.log(data.message)
        setOutput(data.message);
      }else
        setOutput(JSON.stringify(res.data.message))
    } catch (err) {
      // printConsole('Error in POST API', err);
      toast.error('Something Went Wrong !');
    }
    setLoading(false);
  };

  function showValue() {
    // console.log('Source Code - - - - - - - - - - - - -\n', editorRef.current.getValue());
    compileCode(editorRef.current.getValue());
  }

  return (
    <button
      disabled={loading}
      className={`flex ${
        loading ? 'cursor-wait bg-opacity-80' : 'cursor-pointer bg-opacity-100'
      } items-center bg-[#0E9F6E] px-4 text-center text-sm font-medium text-white transition-all duration-200 hover:bg-opacity-80 focus:outline-none`}
      onClick={showValue}
    >
      {loading ? (
        <Image src="/quick-compiler/spinner.svg" alt="spinner" width={20} height={20} />
      ) : (
        <Image src="/quick-compiler/run-icon.svg" alt="Run" width={20} height={20} />
      )}
      <p className="ml-1 mr-1 hidden font-rubik md:block">Run</p>
    </button>
  );
}
