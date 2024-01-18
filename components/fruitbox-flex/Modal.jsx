'use client';
import GameContext from 'context/fruitbox-flex/GameContext';
import { useContext } from 'react';
import Confetti from 'react-confetti';
import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import useWindowSize from 'react-use/lib/useWindowSize';

export default function Modal({ modalShow, setModalShow }) {
  const { currentLevel, changeLevel, showConfetti } = useContext(GameContext);
  const { width, height } = useWindowSize();

  return (
    <div className="absolute inset-0 z-[1000] grid place-items-center bg-black bg-opacity-50 backdrop-blur-sm">
      {showConfetti && (
        <div className="absolute inset-0 z-[10]">
          <Confetti width={width} height={height} />
        </div>
      )}
      <div className="relative z-[11] rounded-md bg-white px-8 py-6 md:px-10">
        <p
          className={`max-w-sm text-center font-fredoka text-2xl ${
            modalShow?.correct ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {modalShow?.message}
        </p>
        {modalShow?.correct ? (
          <button
            onClick={() => changeLevel(Number(currentLevel.level) + 1)}
            className="mx-auto mt-4 block rounded-md bg-yellow-400 p-2 text-sm font-bold text-white hover:bg-yellow-600"
          >
            Next Level
          </button>
        ) : modalShow?.end ? (
          <div className="flex flex-col items-center">
            <div className="my-5 flex h-6 w-auto items-center gap-x-2">
              <p className="max-w-sm text-center font-extrabold text-red-400">Share:</p>
              <LinkedinShareButton
                title="Fruitbox Flex"
                summary="An interactive way to learn CSS Flex by CodeHelp"
                url="https://games.thecodehelp.in"
              >
                <LinkedinIcon size={35} round />
              </LinkedinShareButton>
              <TwitterShareButton
                url="https://games.thecodehelp.in"
                title="Checkout Fruitbox Flex - An interactive way to learn CSS Flex by CodeHelp"
              >
                <TwitterIcon size={35} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url="https://games.thecodehelp.in"
                title="Hey! Checkout Fruitbox Flex - An interactive way to learn CSS Flex by CodeHelp"
                separator=": "
              >
                <WhatsappIcon size={35} round />
              </WhatsappShareButton>
            </div>
            <div className="flex gap-x-4">
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('level', 1);
                    window.location.reload();
                  }
                }}
                className="block rounded-md bg-orange-500 p-2 text-sm font-bold text-white hover:bg-orange-600"
              >
                Reset
              </button>
              <button
                onClick={() => setModalShow({ show: false })}
                className="block rounded-md bg-yellow-500 p-2 text-sm font-bold text-white hover:bg-yellow-600"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setModalShow({ show: false })}
            className="mx-auto mt-4 block rounded-md bg-orange-500 p-2 text-sm font-bold text-white hover:bg-orange-600"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
