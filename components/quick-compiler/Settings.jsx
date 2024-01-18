import { SettingsContext } from 'context/quick-compiler/SettingsContext';
import fonts from 'data/quick-compiler/fonts.json';
import fontSizes from 'data/quick-compiler/fontsize.json';
import themes from 'data/quick-compiler/themes.json';
import tabs from 'data/quick-compiler/tabs.json';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { IoSettingsOutline } from 'react-icons/io5';
import DropDown from './Dropdown';

function Theme() {
  const { theme, setTheme } = useContext(SettingsContext);

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="border-compiler-[#D2D6DC] text-compiler-[#364152] w-[130px] cursor-pointer rounded-[6px] border bg-transparent px-4 py-2 font-rubik text-sm outline-none"
    >
      {themes?.map((theme, indx) => (
        <option key={indx} value={theme.value} className="bg-transparent text-black">
          {theme.label}
        </option>
      ))}
    </select>
  );
}

function FontSize() {
  const { myFontSize, setMyFontSize } = useContext(SettingsContext);

  return (
    <select
      value={myFontSize}
      onChange={(e) => {
        if (typeof window !== 'undefined') {
          setMyFontSize(e.target.value);
          // localStorage.setItem('size', JSON.stringify(e.target.value));
        }
      }}
      className="border-compiler-[#D2D6DC] text-compiler-[#364152] w-[130px] cursor-pointer rounded-[6px] border bg-transparent px-4 py-2 font-rubik text-sm outline-none"
    >
      {fontSizes?.map((fontSize, indx) => (
        <option key={indx} value={fontSize.value} className="bg-transparent text-black">
          {fontSize.label}
        </option>
      ))}
    </select>
  );
}

function Fonts() {
  const { myFont, setMyFont } = useContext(SettingsContext);

  return (
    <select
      value={myFont}
      onChange={(e) => {
        if (typeof window !== 'undefined') {
          setMyFont(e.target.value);
          // localStorage.setItem('family', JSON.stringify(e.target.value));
        }
      }}
      className="border-compiler-[#D2D6DC] text-compiler-[#364152] w-[130px] cursor-pointer rounded-[6px] border bg-transparent px-4 py-2 font-rubik text-sm outline-none"
    >
      {fonts?.map((font, indx) => (
        <option key={indx} value={font.value} className="bg-transparent text-black">
          {font.label}
        </option>
      ))}
    </select>
  );
}

function Tabs() {
  const { tabSize, setTabSize } = useContext(SettingsContext);

  return (
    <select
      value={tabSize}
      onChange={(e) => {
        if (typeof window !== 'undefined') {
          setTabSize(e.target.value);
        }
      }}
      className="border-compiler-[#D2D6DC] text-compiler-[#364152] w-[130px] cursor-pointer rounded-[6px] border bg-transparent px-4 py-2 font-rubik text-sm outline-none"
    >
      {tabs?.map((tab, indx) => (
        <option key={indx} value={tab.value} className="bg-transparent text-black">
          {tab.label}
        </option>
      ))}
    </select>
  );
}

function Reset() {
  const { myFont, myFontSize, theme, setMyFont, setMyFontSize, setTheme, tabSize, setTabSize } =
    useContext(SettingsContext);

  return (
    <button
      onClick={() => {
        if (myFont !== 'Ubuntu-Mono' || myFontSize !== '16px' || theme !== 'vs-dark' || tabSize !== '4')
          try {
            setMyFont('Ubuntu-Mono');
            setMyFontSize('16px');
            setTheme('vs-dark');
            setTabSize(4);
            if (typeof window !== 'undefined') {
              localStorage.setItem('theme', JSON.stringify('vs-dark'));
              localStorage.setItem('size', JSON.stringify('16px'));
              localStorage.setItem('family', JSON.stringify('Ubuntu-Mono'));
              localStorage.setItem('tab', JSON.stringify('4'));
            }
            toast.success('Settings Reset to Default');
          } catch (err) {
            toast.error('Error Resetting Settings');
          }
      }}
      className="flex items-center space-x-2"
    >
      <Image src="/quick-compiler/reset-icon.svg" alt="reset" width={22} height={22} />
      <p className="font-rubik font-medium tracking-[0.15%] text-[#64748B]">Reset</p>
    </button>
  );
}

function SettingsModal({ isOpen, setIsOpen }) {
  const { cancel, saveSettings } = useContext(SettingsContext);

  function close() {
    cancel();
    setIsOpen(false);
  }

  return (
    <div
      style={{ marginLeft: 0 }}
      className={`fixed inset-0 grid place-items-center bg-black bg-opacity-10 ${
        isOpen ? 'pointer-events-auto z-[1000000] bg-opacity-30' : 'pointer-events-none -z-[1] bg-opacity-0'
      } transition-all duration-200`}
    >
      <div
        className={`w-11/12 max-w-[560px] flex-col overflow-hidden rounded-[8px] bg-white lg:w-[560px] ${
          isOpen ? 'scale-100' : 'scale-0'
        } transition-all duration-200`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-b-[#E2E8F0] bg-[#E2E8F0] px-[24px] py-[16px]">
          <p className=" font-rubik text-[18px] font-semibold leading-[28px] text-[#27303F]">Editor Settings</p>
          <button onClick={close}>
            <Image
              src="/quick-compiler/plus-outline.svg"
              alt="close"
              width={24}
              height={24}
              className="rotate-45 opacity-60"
            />
          </button>
        </div>
        {/* Modal Body */}
        <div className="flex flex-col gap-y-4 bg-[#fff] px-[24px] py-[16px]">
          <div className="flex items-start justify-between">
            <div className="flex max-w-[375px] flex-col gap-y-1">
              <p className=" font-rubik text-[16px] font-medium leading-[24px] text-[#364152]">Theme Option</p>
              <p className=" font-rubik text-[14px] leading-[20px] tracking-[0.0025em] text-[#64748B]">
                Tired of the white background? Try different styles and syntax highlighting.
              </p>
            </div>
            <Theme />
          </div>
          <div className="flex items-start justify-between">
            <div className="flex max-w-[375px] flex-col gap-y-1">
              <p className=" font-rubik text-[16px] font-medium leading-[24px] text-[#364152]">Font Family</p>
              <p className=" font-rubik text-[14px] leading-[20px] tracking-[0.0025em] text-[#64748B]">
                Choose your own font family which you can see the menu and other items.
              </p>
            </div>
            <Fonts />
          </div>
          <div className="flex items-start justify-between">
            <div className="flex max-w-[375px] flex-col gap-y-1">
              <p className=" font-rubik text-[16px] font-medium leading-[24px] text-[#364152]">Font Size</p>
              <p className=" font-rubik text-[14px] leading-[20px] tracking-[0.0025em] text-[#64748B]">
                Change the font size of code and other items.
              </p>
            </div>
            <FontSize />
          </div>
          <div className="flex items-start justify-between">
            <div className="flex max-w-[375px] flex-col gap-y-1">
              <p className=" font-rubik text-[16px] font-medium leading-[24px] text-[#364152]">Tab Size</p>
              <p className=" font-rubik text-[14px] leading-[20px] tracking-[0.0025em] text-[#64748B]">
                Choose tab size and show the menu on tab bar.
              </p>
            </div>
            <Tabs />
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex items-center justify-between bg-[#F1F5F9] px-[24px] py-[16px]">
          <Reset />
          <div className="flex gap-x-2">
            <button
              onClick={close}
              className="rounded-[6px] border border-[#CFD8E3] px-[16px] py-[8px] font-rubik font-medium text-[#364152]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                saveSettings();
                setIsOpen(false);
              }}
              className="rounded-[6px] bg-[#6674CC] px-[16px] py-[8px] font-rubik font-medium text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className={`flex items-center justify-between space-x-2 pl-2`}>
        <span className="font-rubik text-sm font-medium tracking-[0.0025em] text-compiler-txt2">Settings</span>
        <IoSettingsOutline className="text-compiler-txt2" />
      </button>
      <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
