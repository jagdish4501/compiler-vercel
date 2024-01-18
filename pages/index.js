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
        {/* <h1 className="text-4xl">CodeHelp Labs</h1>
        <div className="my-8 flex flex-col gap-y-4 text-xl">
          <Link href="/quick-compiler" className="text-blue-600 underline">
            Quick Compiler
          </Link>
          <Link href="/fruitbox-flex" className="text-blue-600 underline">
            Fruitbox Flex
          </Link>
        </div> */}
        Redirecting to Quick Compiler...
      </div>
    </>
  );
}
