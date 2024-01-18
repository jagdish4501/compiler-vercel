import QuickCompilerRoot from 'components/quick-compiler/QuickCompilerRoot';
import { AppContext } from 'context/quick-compiler/AppContext';
import { SaveContext } from 'context/quick-compiler/SaveContext';
import { setCookie } from 'cookies-next';
import crypto from 'crypto';
import Head from 'next/head';
import { useContext, useEffect } from 'react';

export default function QuickCompiler() {
  const { initAppCtx } = useContext(AppContext);
  const { initSaveCtx } = useContext(SaveContext);

  useEffect(() => {
    initAppCtx();
    initSaveCtx();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    const message = 'Are you sure you want to leave? All provided data will be lost.';
    e.returnValue = message;
    return message;
  };

  return (
    <>
      <Head>
        <title>Online Compiler</title>
      </Head>
      <QuickCompilerRoot />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  setCookie('sessionID', crypto.randomUUID(), { req, res });
  return {
    props: {},
  };
}
