import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const navLinks = [
    {
      title: 'Oonline Compiler',
      href: '/quick-compiler',
      tag: 'Beta',
    },
  ];

  const router = useRouter();

  return (
    <>
      <div className="bg-compiler-bg1">
        <div className="mx-6 flex min-h-[52px] w-[full] items-center justify-between space-x-6 font-rubik md:ml-6 md:justify-start lg:space-x-14">
          {/* <Link href="/"> */}
          <Image src="/quick-compiler/compiler_log.svg" alt="Codehelp Quick Compiler" width={40} height={40} />
          {/* </Link> */}
          <button className="md:hidden" onClick={() => setShowMenu(true)}>
            <Image src="/quick-compiler/menu-outline.svg" alt="menu" className="invert" width={32} height={32} />
          </button>
          <nav className="hidden md:block">
            <ul className="hidden flex-col space-x-6 text-xs md:flex md:flex-row md:text-sm">
              {navLinks.map((link, indx) => (
                <li key={indx} className="flex items-center space-x-2 font-medium tracking-wider text-white">
                  <Link href={link?.href}>
                    <span
                      className={`${
                        router?.asPath.includes(link?.href) ? 'underline decoration-brand300 underline-offset-2' : ''
                      }`}
                    >
                      {link?.title}
                    </span>
                  </Link>
                  {link?.tag && (
                    <div className="w-fit rounded-full bg-[#fef08a] px-3 text-xs font-medium text-[#854d0e]">
                      {link?.tag}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {showMenu && (
        <div
          className="fixed left-0 right-0 top-0 z-[10000000] flex h-screen w-screen justify-end bg-black bg-opacity-40"
          onClick={() => setShowMenu(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="h-full w-[250px] bg-white">
            <button className="ml-auto block" onClick={() => setShowMenu(false)}>
              <Image
                src="/quick-compiler/plus-outline.svg"
                alt="cross"
                width={38}
                height={38}
                className="mr-2 mt-2 rotate-45"
              />
            </button>
            <ul className="flex flex-col gap-y-3 px-4 pt-12">
              {navLinks.map((link, indx) => (
                <li
                  key={indx}
                  className="flex items-center space-x-2 text-xl font-medium tracking-wider text-compiler-txt1"
                >
                  <Link href={link?.href}>
                    <span
                      className={`${
                        router?.asPath.includes(link?.href)
                          ? 'underline decoration-compiler-txt1 underline-offset-2'
                          : ''
                      }`}
                    >
                      {link?.title}
                    </span>
                  </Link>
                  {link?.tag && (
                    <div className="w-fit rounded-full bg-[#fef08a] px-3 text-xs font-medium text-[#854d0e]">
                      {link?.tag}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
