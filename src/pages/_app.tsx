import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import SiteNavigation from '@/components/SiteNavigation'
import { LazyMotion, domAnimation, m } from "framer-motion"

import { Exo } from 'next/font/google'
const exo = Exo({ subsets: ['latin'], })

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return <>
    <style jsx global>{`
        html, button, ::placeholder, input {
          font-family: ${exo.style.fontFamily};
        }
      `}</style>

    <SessionProvider session={session}>
      <LazyMotion features={domAnimation}>
        <SiteNavigation />
        <Component {...pageProps} />
      </LazyMotion>
    </SessionProvider>
  </>
}
