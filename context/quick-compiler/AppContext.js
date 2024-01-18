import { useMonaco } from '@monaco-editor/react';
import { createContext, useRef, useState } from 'react';
import { getFileExtension } from 'utils/quick-compiler/getFileExtension';

const Languages = ['cpp', 'c', 'java', 'python', 'javascript'];
const DefaultValues = [
  `#include <iostream>
using namespace std;

int main() {
  cout << "Hello world!" << endl;
  return 0;
}`,
  `#include <stdio.h>

int main() {
  printf("Hello world!");
  return 0;
}`,
  `import java.util.*;
import java.lang.*;
import java.io.*;

// The main method must be in a class named "Main"
class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}
`,
  `print('Hello world!')`,
  `console.log('Hello world!');`,
];

export const AppContext = createContext();

export function AppProvider({ children }) {
  const monaco = useMonaco();
  const editorRef = useRef(null);
  const [language, setLanguage] = useState(Languages[0]);
  const [defaultVal, setDefaultVal] = useState(DefaultValues[0]);
  const [inp, setInp] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [shareModalShow, setShareModalShow] = useState(false);

  const initAppCtx = () => {
    setLanguage(Languages[0]);
    setDefaultVal(DefaultValues[0]);
    setInp('');
    setOutput('');
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    const indx = Languages.indexOf(lang);
    setDefaultVal(DefaultValues[indx]);
  };

  const getFileName = () => {
    if (language === 'java') return `Main.${getFileExtension(language)}`;
    if (language === 'javascript') return `index.${getFileExtension(language)}`;
    return `main.${getFileExtension(language)}`;
  };

  const contextProps = {
    languages: Languages,
    defaultVal,
    language,
    setLanguage,
    changeLanguage,
    inp,
    setInp,
    editorRef,
    loading,
    setLoading,
    output,
    setOutput,
    getFileName,
    shareModalShow,
    setShareModalShow,
    monaco,
    initAppCtx,
  };

  return <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>;
}
