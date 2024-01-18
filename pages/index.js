import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Head>
        <title>CodeHelp Labs</title>
      </Head>
      <Script id="redirect">
        {`
          window.location.href = '/quick-compiler';
        `}
      </Script>
      <div className="h-screen w-screen bg-slate-800 p-4 text-white">
        Redirecting to Quick Compiler...
      </div>
    </>
  );
}
