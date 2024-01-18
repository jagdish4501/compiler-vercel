'use client';
import Navbar from 'components/quick-compiler/Navbar';
import GameContext from 'context/fruitbox-flex/GameContext';
import { useContext } from 'react';
import DisplayContainer from './DisplayContainer';
import EditorContainer from './EditorContainer';
import Modal from './Modal';

export default function FruitboxRoot() {
  const { modalShow, setModalShow, loading } = useContext(GameContext);
  if (loading) {
    return (
      <div className="flex min-h-[100vh] flex-col items-center justify-around bg-fruitboxColor1 py-10 font-raleway">
        <h1 className="text-center font-fredoka text-4xl tracking-wider text-white lg:text-left">
          <span className="text-fruitboxColor2">Fruitbox</span>{' '}
          <span className="underline decoration-fruitboxColor2 decoration-wavy">Flex</span>
        </h1>
        <div className="flex flex-col items-center rounded-2xl bg-white bg-opacity-30 px-6 py-10">
          <div className="flex items-center">
            <img
              width={70}
              height={70}
              src={`/fruitbox-flex/apple.webp`}
              alt="fruit"
              className="mx-auto animate-pulse drop-shadow-xl"
            />
            <img
              width={70}
              height={70}
              src={`/fruitbox-flex/banana.webp`}
              alt="fruit"
              className="mx-auto animate-pulse drop-shadow-xl"
            />
            <img
              width={70}
              height={70}
              src={`/fruitbox-flex/grapes.webp`}
              alt="fruit"
              className="mx-auto animate-pulse drop-shadow-xl"
            />
          </div>
          <p className="mt-6 font-fredoka text-3xl text-white">Loading...</p>
        </div>
        <a
          href="https://www.thecodehelp.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto flex w-fit flex-col items-center py-3 text-white"
        >
          <p className="mb-1 font-rubik text-xs font-bold tracking-wider">Made With ❤️ By</p>
          <img
            width={50}
            height={50}
            src="https://codehelp.s3.ap-south-1.amazonaws.com/hoktffneuv795jansa8z_bdff2537c7.svg"
            alt="codeHelp"
          />
          <p style={{ fontFamily: 'Rubik' }} className="font-bold tracking-widest">
            CODEHELP
          </p>
        </a>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {/* add onContextMenu={(e) => e.preventDefault()} to the below div */}
      <div className="flex min-h-[100vh] select-none flex-col-reverse items-center justify-around bg-fruitboxColor1 py-10 font-raleway lg:flex-row xl:py-0">
        <EditorContainer />
        <DisplayContainer />
      </div>
      {modalShow.show && <Modal modalShow={modalShow} setModalShow={setModalShow} />}
    </>
  );
}
