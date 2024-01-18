import { SaveContext } from 'context/quick-compiler/SaveContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdContentCopy } from 'react-icons/md';
import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { useOnClickOutside } from './Dropdown';
import SaveBtn from './SaveBtn';

export default function ShareModal({ shareModalShow, setShareModalShow }) {
  const { viewMode } = useContext(SaveContext);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setShareModalShow(false));

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(typeof document !== 'undefined' ? document.URL : '');
      toast.success('Link Copied');
    } catch (err) {
      toast.error('Something Went Wrong');
    }
  };

  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  }

  return (
    <>
      {/* <div className="absolute inset-0 z-[100000] grid place-items-center bg-black bg-opacity-50 backdrop-blur-sm"> */}
      <div
        ref={ref}
        className={`absolute right-[8px] top-[95px] max-w-[600px] origin-top-right overflow-hidden rounded-[6px] bg-white lg:w-[400px] ${
          shareModalShow
            ? 'pointer-events-auto z-[11] scale-x-100 scale-y-100 opacity-100'
            : 'pointer-events-none -z-[1] scale-x-0 scale-y-0 opacity-0'
        } transition-all duration-300`}
      >
        <div className="flex items-center justify-between border-b border-b-[#E2E8F0] bg-[#E2E8F0] px-[24px] py-[16px]">
          <p className=" font-rubik text-[18px] font-semibold leading-[28px] text-[#27303F]">Share the code</p>
          <button onClick={() => shareModalShow && setShareModalShow(false)}>
            <Image
              src="/quick-compiler/plus-outline.svg"
              alt="close"
              width={24}
              height={24}
              className="rotate-45 opacity-60"
            />
          </button>
        </div>
        <p className="mx-auto my-2 w-[87%] text-center font-rubik text-base leading-5 text-[#27303F]">
          Share this platform with your friends and get ready for code sharing, bringing a new level of collaboration to
          your coding experience!
        </p>
        {/* {viewMode && ( */}
        <div className="my-4">
          <div
            className={`mx-auto flex w-[87%] items-center ${viewMode ? 'justify-between' : 'justify-center space-x-2'}`}
          >
            <p className="font-rubik text-base font-medium text-[#364152]">Link</p>
            {viewMode ? (
              <button className="flex items-center space-x-1" onClick={handleCopy}>
                <MdContentCopy color="#6674CC" width={18} height={18} />
                <p className="mt-[1.85px] font-rubik text-[14px] font-medium leading-[20px] text-[#6674CC]">Copy</p>
              </button>
            ) : (
              <p className="text-[#64748B mt-[1.75px] font-rubik text-xs"> - Save Your Code To Generate Link !</p>
            )}
          </div>
          {viewMode ? (
            <div className="mx-auto mt-2 flex w-[87%] items-center space-x-2 rounded-[8px] bg-[#F4F5F7] px-[12px] py-[14px]">
              <>
                <Image src="/quick-compiler/link-outline.svg" alt="link" width={22} height={22} />
                <Link legacyBehavior href={typeof document !== 'undefined' ? document.URL : ''}>
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-rubik text-xs leading-[20px] text-[#64748B]"
                  >
                    {typeof document !== 'undefined' && truncateString(document.URL, 45)}
                  </a>
                </Link>
              </>
            </div>
          ) : (
            <div className="mx-auto mt-1 flex min-h-[50px] max-w-fit justify-center overflow-hidden rounded-[6px]">
              <SaveBtn bright={true} />
            </div>
          )}
        </div>
        <p className="text-center font-rubik text-base font-medium text-[#364152]">Social Media</p>
        <div className="my-5 flex h-6 items-center justify-center gap-x-2">
          <LinkedinShareButton
            title="Quick Compiler by CodeHelp"
            summary={
              viewMode
                ? 'Checkout this code I wrote on Quick Compiler, a platform by CodeHelp. You can write and run code in multiple languages from anywhere on this platform.'
                : 'Checkout Quick Compiler, a platform by CodeHelp. You can write and run code in multiple languages from anywhere on this platform.'
            }
            url={typeof document !== 'undefined' ? document.URL : ''}
          >
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <TwitterShareButton
            url={typeof document !== 'undefined' ? document.URL : ''}
            title={
              viewMode
                ? 'Checkout this code I wrote on Quick Compiler, a platform by CodeHelp. You can write and run code in multiple languages from anywhere on this platform.'
                : 'Checkout Quick Compiler, a platform by CodeHelp. You can write and run code in multiple languages from anywhere on this platform.'
            }
          >
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <WhatsappShareButton
            url={typeof document !== 'undefined' ? document.URL : ''}
            title={
              viewMode
                ? 'Checkout this code I wrote on Quick Compiler, a platform by CodeHelp. You can write and run code in multiple languages from anywhere on this platform.'
                : 'Checkout Quick Compiler, a platform by CodeHelp. You can write and run code in multiple languages from anywhere on this platform.'
            }
            separator=": "
          >
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
