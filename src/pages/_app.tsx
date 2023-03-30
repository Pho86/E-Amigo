import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import SiteNavigation from '@/components/SiteNavigation'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return <>
    <style jsx global>{`
        html, button, ::placeholder, input {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

    <SessionProvider session={session}>
      <SiteNavigation />
      <Component {...pageProps} />
    </SessionProvider>
  </>
}
