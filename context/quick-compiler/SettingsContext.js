import fonts from 'data/quick-compiler/fonts.json';
import fontSizes from 'data/quick-compiler/fontsize.json';
import themes from 'data/quick-compiler/themes.json';
import tabs from 'data/quick-compiler/tabs.json';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AppContext } from './AppContext';

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const { editorRef } = useContext(AppContext);

  // check validity of item in localStorage
  function validItem(item, arr) {
    const check = arr.filter((x) => x.value === item);
    if (!check.length) return false;
    return true;
  }

  // fetch data stored in localStorage
  function loadFromLocal(val, arr) {
    if (typeof window !== 'undefined') {
      const localItem = localStorage.getItem(val);
      if (!localItem) return null;
      else {
        const item = JSON.parse(localItem);
        if (validItem(item, arr)) return item;
        else return null;
      }
    }
  }

  const [theme, setTheme] = useState();
  const [myColors, setMyColors] = useState(null);
  const [myFont, setMyFont] = useState();
  const [myFontSize, setMyFontSize] = useState();
  const [tabSize, setTabSize] = useState();

  function saveSettings() {
    const localTheme = loadFromLocal('theme', themes) ?? themes[0].value;
    const localFamily = loadFromLocal('family', fonts) ?? fonts?.[5]?.value;
    const localSize = loadFromLocal('size', fontSizes) ?? fontSizes?.[2]?.value;
    const localTab = loadFromLocal('tab', tabs) ?? tabs?.[1]?.value;
    if (typeof window !== 'undefined') {
      if (localTheme !== theme || localFamily !== myFont || localSize !== myFontSize || localTab !== tabSize) {
        localStorage.setItem('theme', JSON.stringify(theme));
        localStorage.setItem('family', JSON.stringify(myFont));
        localStorage.setItem('size', JSON.stringify(myFontSize));
        localStorage.setItem('tab', JSON.stringify(tabSize));
        editorRef.current.getModel().updateOptions({
          tabSize: parseInt(tabSize),
        });
        toast.success('Changes Saved');
      }
    }
  }

  function cancel() {
    const localTheme = loadFromLocal('theme', themes) ?? themes[0].value;
    const localFamily = loadFromLocal('family', fonts) ?? fonts?.[5]?.value;
    const localSize = loadFromLocal('size', fontSizes) ?? fontSizes?.[2]?.value;
    const localTab = loadFromLocal('tab', tabs) ?? tabs?.[0]?.value;
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', JSON.stringify(localTheme));
      localStorage.setItem('family', JSON.stringify(localFamily));
      localStorage.setItem('size', JSON.stringify(localSize));
      localStorage.setItem('tab', JSON.stringify(localTab));
    }
    setTheme(localTheme);
    setMyFont(localFamily);
    setMyFontSize(localSize);
    setTabSize(localTab);
  }

  useEffect(() => {
    cancel();
  }, []);

  const contextProps = {
    theme,
    setTheme,
    myColors,
    setMyColors,
    myFont,
    setMyFont,
    myFontSize,
    setMyFontSize,
    tabSize,
    setTabSize,
    saveSettings,
    cancel,
  };

  return <SettingsContext.Provider value={contextProps}>{children}</SettingsContext.Provider>;
}
