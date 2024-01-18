'use client';
import { levels } from 'data/fruitbox-flex/levels';
import { createContext, useEffect, useState } from 'react';
import useDynamicRefs from 'use-dynamic-refs';

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState(levels[loadLocalLevel()]);
  const [css, setCss] = useState(typeof window !== 'undefined' && document.createElement('style'));
  const [userCss, setUserCss] = useState(typeof window !== 'undefined' && document.createElement('style'));
  const [modalShow, setModalShow] = useState({
    show: false,
  });
  const [loading, setLoading] = useState(false);
  const [getBasketRef, setBasketRef] = useDynamicRefs();
  const [getFruitRef, setFruitRef] = useDynamicRefs();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setCurrentLevel(levels[loadLocalLevel()]);
  }, [loading]);

  useEffect(() => {
    if (modalShow.show) {
      document.body.style.overflowY = 'hidden';
      document.body.style.maxHeight = '100vh';
    } else {
      setShowConfetti(false);
      document.body.style.overflowY = 'unset';
      document.body.style.maxHeight = 'unset';
    }
  }, [modalShow]);

  useEffect(() => {
    document.getElementsByTagName('head')[0].appendChild(css);
    document.getElementsByTagName('head')[0].appendChild(userCss);
  }, []);

  function loadLocalLevel() {
    if (typeof window !== 'undefined') {
      const localLevel = localStorage.getItem('level');
      if (localLevel) {
        const num = Number(JSON.parse(localLevel));
        if (num >= 1 && num <= 24) return num - 1;
        else {
          setLocalLevel(1);
          return 0;
        }
      }
      setLocalLevel(1);
      return 0;
    } else {
      return 0;
    }
  }

  function setLocalLevel(level) {
    localStorage.setItem('level', JSON.stringify(level));
  }

  async function changeLevel(level, arrow) {
    if (currentLevel.level === levels.length && !arrow) {
      setShowConfetti(true);
      setModalShow({
        show: true,
        message: 'Your mastery of Flexbox has reached new heights.🔥',
        end: true,
      });
    } else {
      setLocalLevel(level);
      addCSS(css, '');
      addCSS(userCss, '');
      setLoading(true);
      await new Promise((r) => setTimeout(r, 900));
      setModalShow({ show: false });
      setLoading(false);
    }
  }

  function addCSS(style, rule) {
    if (style.styleSheet) css.styleSheet.cssText = rule; // Support for IE
    else style.innerHTML = rule; // Support for the rest
  }

  function handleSubmit() {
    let correct = true;
    for (let i = 0; i < currentLevel.baskets.length; i++) {
      // console.log(
      //   getBasketRef(`basket-${i}`).current.offsetLeft,
      //   getFruitRef(`fruit-${i}`).current.offsetLeft,
      //   getBasketRef(`basket-${i}`).current.offsetTop,
      //   getFruitRef(`fruit-${i}`).current.offsetTop
      // );
      if (
        getBasketRef(`basket-${i}`).current.offsetLeft === getFruitRef(`fruit-${i}`).current.offsetLeft &&
        getBasketRef(`basket-${i}`).current.offsetTop === getFruitRef(`fruit-${i}`).current.offsetTop
      ) {
        correct = true;
      } else {
        correct = false;
        break;
      }
    }
    if (correct) {
      setModalShow({
        show: true,
        message: 'Your Answer Is Correct!',
        correct: true,
      });
    } else {
      setModalShow({
        show: true,
        message: 'Your Answer Is Incorrect!',
        correct: false,
      });
    }
  }

  return (
    <GameContext.Provider
      value={{
        currentLevel,
        css,
        userCss,
        addCSS,
        handleSubmit,
        modalShow,
        setModalShow,
        changeLevel,
        loading,
        setBasketRef,
        setFruitRef,
        showConfetti,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
