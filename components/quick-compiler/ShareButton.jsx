import { AppContext } from 'context/quick-compiler/AppContext';
import { useContext } from 'react';
import { FiShare2 } from 'react-icons/fi';

export default function ShareButton() {
  const { shareModalShow, setShareModalShow } = useContext(AppContext);

  return (
    <button
      className="flex items-center bg-blue-500 px-4 text-center text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none"
      onClick={() => !shareModalShow && setShareModalShow(true)}
    >
      <p className="mr-1 hidden font-rubik uppercase md:block">SHARE</p>
      <FiShare2 color="#fff" fontSize={20} />
    </button>
  );
}
