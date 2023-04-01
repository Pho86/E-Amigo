import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import SiteNavigation from '@/components/SiteNavigation'
import { LazyMotion, domAnimation, m } from "framer-motion"

import { Exo } from 'next/font/google'
import Head from 'next/head'
const exo = Exo({ subsets: ['latin'], })

// import TimeAgo from "javascript-time-ago";
// import en from "javascript-time-ago/locale/en";
// TimeAgo.setDefaultLocale(en.locale);
// TimeAgo.addLocale(en);

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return <>
    <style jsx global>{`
        html, button, ::placeholder, input {
          font-family: ${exo.style.fontFamily};
        }
      `}</style>
    <Head>
      <meta name="description" content="E-Amigo, finding other gamer friends." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta content="/logo.png" property='og:image' />
      <meta property="og:description" content="E-Amigo, finding other gamer friends." />
      <link rel="icon" href="/logo.svg" />
    </Head>
    <SessionProvider session={session}>
      <LazyMotion features={domAnimation}>
        <SiteNavigation />
        <Component {...pageProps} />
      </LazyMotion>
    </SessionProvider>
  </>
}
