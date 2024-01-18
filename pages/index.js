import Head from 'next/head';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Head>
        <title>Online Compiler</title>
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
