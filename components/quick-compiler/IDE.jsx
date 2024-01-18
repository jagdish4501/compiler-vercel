import Editor from '@monaco-editor/react';
import { AppContext } from 'context/quick-compiler/AppContext';
import { SaveContext } from 'context/quick-compiler/SaveContext';
import { SettingsContext } from 'context/quick-compiler/SettingsContext';
import { useContext, useEffect, useState } from 'react';

export default function IDE() {
  const [num, setNum] = useState(0);
  const { monaco, editorRef, language, defaultVal, getFileName } = useContext(AppContext);
  const { viewMode, newCode, editMode } = useContext(SaveContext);
  const { theme, myColors, setMyColors, myFont, myFontSize, tabSize } = useContext(SettingsContext);

  const changeTheme = async (theme, monaco) => {
    if (theme === 'vs-dark' || theme === 'light') {
      monaco.editor.setTheme(theme);
      if (theme === 'vs-dark') setMyColors({ fg: '#d4d4d4', bg: '#1e1e1e' });
      else
        setMyColors({
          fg: '#000',
          bg: '#fff',
        });
      // if (typeof window !== 'undefined') localStorage.setItem('theme', JSON.stringify(theme));
      return;
    }
    try {
      import(`/data/quick-compiler/monaco-themes/${theme}.json`).then((data) => {
        monaco.editor.defineTheme(theme, data);
        monaco.editor.setTheme(theme);
        setMyColors({
          fg: data.colors['editor.foreground'],
          bg: data.colors['editor.background'],
        });
        // if (typeof window !== 'undefined') localStorage.setItem('theme', JSON.stringify(theme));
        // console.log(data);
      });
    } catch (error) {
      monaco.editor.setTheme('vs-dark');
      localStorage.setItem('theme', JSON.stringify('vs-dark'));
      setMyColors({ fg: '#d4d4d4', bg: '#1e1e1e' });
      // console.log('THEME IMPORT ERRR 💀', error);
    }
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    changeTheme(theme, monaco);
    console.log(tabSize);
    editor.getModel().updateOptions({
      tabSize: parseInt(tabSize),
    });
    if (viewMode) {
      editor.setValue(newCode);
    }
    if (editMode) {
      editor.setValue(newCode);
    }
  }

  useEffect(() => {
    if (monaco && editorRef.current) {
      changeTheme(theme, monaco);
    }
  }, [theme]);

  useEffect(() => {
    // To remount Monaco Editor On Language Change
    setNum((prev) => prev + 1);
  }, [language]);

  return (
    <>
      <div
        style={{
          backgroundColor: myColors ? myColors.bg : '#1e1e1e',
        }}
        className={`h-full transition-all duration-200`}
      >
        <p className="ml-4 max-w-max space-x-7 rounded-b-md bg-darkBg p-1 px-4 text-sm text-gray-400 shadow-md">
          <span className="font-rubik font-medium uppercase tracking-widest text-white">Source - </span> {getFileName()}
        </p>
        <div className="editorContainer font-compiler-ubuntu mx-auto my-2 w-[80%] shadow-2xl shadow-gray-700/20 lg:w-full lg:shadow-none">
          <Editor
            key={num}
            loading={<p className="text-white">Loading Editor ...</p>}
            height="83vh"
            defaultLanguage={language}
            defaultValue={defaultVal}
            onMount={handleEditorDidMount}
            options={{
              readOnly: viewMode,
              fontFamily: myFont,
              fontSize: myFontSize,
              minimap: {
                enabled: false,
              },
              wordWrap: 'on',
            }}
          />
        </div>
      </div>
    </>
  );
}
