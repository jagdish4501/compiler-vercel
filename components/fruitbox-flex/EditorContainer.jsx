'use client';
import GameContext from 'context/fruitbox-flex/GameContext';
import { levels } from 'data/fruitbox-flex/levels';
import { useContext } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import Editor from './Editor';

export default function EditorContainer() {
  const { currentLevel, changeLevel } = useContext(GameContext);

  // console.log("Current Level: ", currentLevel);

  const { level } = currentLevel;

  function nextLevel() {
    changeLevel(currentLevel.level + 1, true);
  }

  function backLevel() {
    changeLevel(currentLevel.level - 1, true);
  }

  return (
    <div className="relative flex min-h-[50vh] w-full flex-col items-center justify-center lg:min-h-screen lg:w-1/2">
      <div className="mx-auto h-full w-[98%] max-w-[1000px] px-12 py-20 lg:ml-auto lg:mr-0">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-between md:flex-row">
          <h1 className="text-center font-fredoka text-4xl tracking-wider text-white lg:text-left">
            <span className="text-fruitboxColor2">Fruitbox</span>{' '}
            <span className="decoration-fruitboxfruitboxColor2 underline decoration-wavy">Flex</span>
          </h1>
          <p className="mt-6 flex items-center rounded-md bg-gray-500 bg-opacity-25 px-4 py-1 text-gray-300 md:mt-0">
            <button disabled={currentLevel.level === 1} onClick={backLevel} className="mr-1 cursor-pointer text-3xl">
              <MdNavigateBefore aria-label="Go to the previous level" title="Previous Level" />
            </button>
            Level <span className="ml-2 block font-fredoka">{level}</span>
            <button
              onClick={nextLevel}
              disabled={currentLevel.level === levels.length}
              className="ml-1 cursor-pointer text-3xl"
            >
              <MdNavigateNext aria-label="Go to the previous level" title="Next Level" />
            </button>
          </p>
        </div>
        <p className="mx-auto my-12 max-w-xl text-white">
          <span className="font-fredoka text-lg tracking-wide text-white">Instructions: </span>
          {currentLevel?.instruction}
        </p>
        <Editor />
      </div>
      <a
        href="https://www.thecodehelp.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto flex h-full w-[98%] max-w-[1000px] flex-col items-center justify-center px-12 text-white lg:ml-auto lg:mr-0"
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
