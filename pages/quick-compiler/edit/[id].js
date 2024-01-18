import Navbar from 'components/quick-compiler/Navbar';
import QuickCompilerRoot from 'components/quick-compiler/QuickCompilerRoot';
import { server } from 'config';
import { SaveContext } from 'context/quick-compiler/SaveContext';
import { setCookie } from 'cookies-next';
import crypto from 'crypto';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function QuickCompilerEdit() {
  const router = useRouter();
  // const { resetIDEView } = useContext(SaveContext);
  const { resetIDEEdit } = useContext(SaveContext);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${server}/api/getCode`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uuid: document.URL.split('/').reverse()[0] }),
      });

      const data = await res.json();
      if (!data || !data.success || !data.data.length) throw 'not found';
      else {
        setData(data.data[0]);
        resetIDEEdit(data.data[0].code, data.data[0].language, data.data[0].input);
      }
    } catch (error) {
      // console.log('Fetch API Error - VIEW', error);
      setData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
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

  if (data === null || loading) {
    return (
      <div className="flex min-h-screen flex-col bg-mainBg">
        <Navbar />
        <main className="grid flex-1 place-items-center bg-darkBg">
          {loading && <p className="font-rubik text-5xl font-medium text-white">Loading...</p>}
          {data === null && (
            <div className="flex flex-col items-center gap-y-4">
              <p className="font-rubik text-5xl font-medium text-white">Not Found !</p>
              <button
                onClick={() => router.push('/quick-compiler')}
                className="cursor-pointer rounded-md border border-white p-3 font-rubik text-xs font-medium text-white"
              >
                Back To Quick Compiler
              </button>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Quick Compiler - CodeHelp Labs</title>
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

// export async function getServerSideProps(context) {
//   const uuid = context.query.id;

//   //   try {
//   const res = await fetch(`${server}/api/getCode`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ uuid }),
//   });

//   const data = await res.json();

//   if (!data || !data.success || !data.data.length) {
//     console.log('Not Found');
//     return {
//       props: {
//         data: false,
//       },
//     };
//   }

//   return {
//     props: {
//       data: data.data[0],
//     },
//   };
// }
