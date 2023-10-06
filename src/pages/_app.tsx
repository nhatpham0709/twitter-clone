import '../styles/globals.scss'

import { AuthContextProvider } from '@/context/AuthContext'
import { ThemeContextProvider } from '@/context/ThemeContext'
import { AppHead } from '@/components/common/AppHead'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout): ReactNode {
  const getLayout = Component.getLayout ?? ((page): ReactNode => page)

  return (
    <>
      <AppHead />
      <AuthContextProvider>
        <ThemeContextProvider>{getLayout(<Component {...pageProps} />)}</ThemeContextProvider>
      </AuthContextProvider>
    </>
  )
}
