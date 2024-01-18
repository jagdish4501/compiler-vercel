'use client';
import GameContext from 'context/fruitbox-flex/GameContext';
import React, { useContext, useState } from 'react';

export default function Editor() {
  const [inp, setInp] = useState('');
  const { currentLevel, userCss, addCSS, handleSubmit } = useContext(GameContext);

  const noOfRows = currentLevel.styles.split(';').length - 1;

  const handleOnChange = (e) => {
    setInp(e.target.value);
    let defStyles = '';
    currentLevel.activeStyles.default.forEach((s) => (defStyles += s));
    const rule = `${currentLevel.default ? currentLevel.default : ''}${currentLevel.activeStyles.title}{${defStyles}${
      e.target.value
    }}`;
    addCSS(userCss, rule);
  };

  return (
    <>
      <div className="mx-auto mt-24 max-w-lg rounded-md bg-slate-400 px-8 py-5 font-mono shadow-2xl">
        {currentLevel.default && (
          <p>
            {currentLevel.default.split('\n').map((el, indx) => (
              <React.Fragment key={indx}>
                <span className={`${indx > 0 && indx < currentLevel.default.split(`\n`).length - 1 && 'ml-6'}`}>
                  {el}
                </span>
                <br />
              </React.Fragment>
            ))}
          </p>
        )}
        <div>
          <p>
            {currentLevel.activeStyles.title} {'{'}
          </p>
          <div className="ml-6">
            {currentLevel.activeStyles.default.map((s, indx) => (
              <p key={indx}>{s}</p>
            ))}
            <label htmlFor="inputcss"></label>
            <textarea
              id="inputcss"
              spellCheck={false}
              rows={noOfRows}
              autoFocus
              value={inp}
              onChange={handleOnChange}
              className="mt-2 w-full resize-none rounded-md p-1 focus:outline-fruitboxColor2"
            />
          </div>
          <p>{'}'}</p>
        </div>
      </div>
      {inp && (
        <button
          onClick={handleSubmit}
          className={`mx-auto mt-8 block cursor-pointer rounded-md bg-red-500 px-6 py-2 text-white hover:bg-red-600`}
        >
          Submit
        </button>
      )}
    </>
  );
}
