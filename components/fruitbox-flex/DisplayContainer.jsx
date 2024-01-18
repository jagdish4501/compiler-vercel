'use client';
import GameContext from 'context/fruitbox-flex/GameContext';
import { useContext, useEffect, useState } from 'react';
import { MdAttribution } from 'react-icons/md';
import Item from './Item';

export default function DisplayContainer() {
  const [num, setNum] = useState(0);
  const { currentLevel, css, addCSS, setBasketRef, setFruitRef, loading } = useContext(GameContext);

  useEffect(() => {
    setNum((prev) => prev + 1);
  }, [loading]);

  useEffect(() => {
    addCSS(css, currentLevel?.styles);
  }, []);

  return (
    <div
      className="relative mx-auto h-[300px] w-[300px] rounded-xl bg-fruitboxColor2 bg-cover lg:h-[500px] lg:w-[500px] xl:h-[550px] xl:w-[550px]"
      style={{
        backgroundImage: 'url(https://cdn.thecodehelp.in/background_294b2f19db.webp)',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative mx-auto h-full w-[98%] max-w-[1000px] lg:ml-0 lg:mr-auto">
        <div id="container" className="flex h-full px-16 py-20 lg:p-24">
          {currentLevel?.fruits.map((fruit, indx) => (
            <Item key={indx} name={fruit} indx={indx} setRef={setFruitRef} text="fruit">
              <img
                src={`/fruitbox-flex/${fruit}.webp`}
                alt="fruit"
                className="mx-auto h-[70%] w-[70%] animate-bounce drop-shadow-xl"
              />
            </Item>
          ))}
        </div>
        <div id="master" className="absolute inset-0 flex px-16 py-20 lg:p-24">
          {currentLevel?.baskets.map((basket, indx) => (
            <Item key={indx} name={basket} indx={indx} setRef={setBasketRef} text="basket">
              <img
                src={`/fruitbox-flex/${basket}_basket.webp`}
                alt="basket"
                className="animate-pulse drop-shadow-2xl"
              />
            </Item>
          ))}
        </div>
      </div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.freepik.com/free-vector/aerial-view-garden-background_4613367.htm#query=garden%20top%20view&position=34&from_view=search&track=ais"
        className="group absolute bottom-1 right-1"
        title="Image by brgfx"
      >
        <MdAttribution
          color="#fff"
          className="z-[100000] cursor-pointer text-4xl opacity-50 group-hover:opacity-80 lg:text-4xl"
        />
      </a>
    </div>
  );
}
