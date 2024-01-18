import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default function DropDown({ title, children, isOpen, setIsOpen, border }) {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="flex items-center space-x-4">
      <div ref={ref} className={`dropdown ${isOpen ? 'open' : ''}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between space-x-1 px-3 pl-5 ${
            border && 'border-x-[2px] border-x-compiler-txt2 border-opacity-40'
          } `}
        >
          <span className="font-rubik text-sm font-medium tracking-[0.0025em] text-compiler-txt2">{title}</span>

          <Image src="/quick-compiler/dropdown-icon.svg" alt="Down Icon" width={20} height={20} />
        </button>

        <div className="menu glassMorph">{children}</div>
      </div>
    </div>
  );
}
