import { createContext, useContext, useState } from 'react';
import { AppContext } from './AppContext';

export const SaveContext = createContext();

export const SaveProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newCode, setNewCode] = useState();
  const { setLanguage, setInp } = useContext(AppContext);
  const [loadingSave, setLoadingSave] = useState(false);

  function initSaveCtx() {
    setViewMode(false);
    setEditMode(false);
  }

  function resetIDEView(code, lang, inp) {
    setEditMode(false);
    setViewMode(true);
    setNewCode(code);
    setLanguage(lang);
    setInp(inp);
  }

  function resetIDEEdit(code, lang, inp) {
    setViewMode(false);
    setEditMode(true);
    setNewCode(code);
    setLanguage(lang);
    setInp(inp);
  }

  const contextProps = {
    viewMode,
    setViewMode,
    editMode,
    setEditMode,
    resetIDEView,
    resetIDEEdit,
    newCode,
    loadingSave,
    setLoadingSave,
    initSaveCtx,
  };
  return <SaveContext.Provider value={contextProps}>{children}</SaveContext.Provider>;
};
