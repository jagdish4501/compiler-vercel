'use client';
export default function Item({ children, indx, name, setRef, text }) {
  if (typeof window === 'undefined') return null;

  return (
    <div id={name} ref={setRef(`${text}-${indx}`)} className="h-[40px] w-[40px] lg:h-[70px] lg:w-[70px]">
      {children}
    </div>
  );
}
