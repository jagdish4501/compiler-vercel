import { AppContext } from 'context/quick-compiler/AppContext';
import { SaveContext } from 'context/quick-compiler/SaveContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';

export default function SaveBtn({ bright }) {
  const router = useRouter();

  const { editorRef, language, inp } = useContext(AppContext);
  const { loadingSave, setLoadingSave } = useContext(SaveContext);

  async function handleSave() {
    setLoadingSave(true);
    try {
      const res = await fetch('/api/saveCode', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: editorRef.current.getValue(), language: language, input: inp }),
      });

      const data = await res.json();

      if (!data.success) throw 'Could Not Save';

      toast.success('Saved Successfully');
      // console.log(data);
      router.push(`/quick-compiler/view/${data?.data?.uuid}`);
    } catch (error) {
      // console.log('Could not save', error);
      toast.error('Could Not Save');
    }
    setLoadingSave(false);
  }

  return (
    <button
      disabled={loadingSave}
      className={`flex items-center space-x-1 ${
        bright ? 'bg-yellow-500' : 'bg-yellow-600'
      }  px-4 text-center text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none ${
        loadingSave ? 'cursor-wait bg-opacity-70' : 'cursor-pointer'
      }`}
      onClick={() => {
        handleSave();
      }}
    >
      <span className="mt-[1.75px] hidden text-left font-rubik text-sm font-medium text-white md:block">SAVE</span>
      <Image src="/quick-compiler/save-outline.svg" alt="Upload" width={20} height={20} className="invert" />
    </button>
  );
}
