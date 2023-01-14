import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='text-gray-900 font-poppins bg-slate-100 dark:text-white dark:bg-black'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
