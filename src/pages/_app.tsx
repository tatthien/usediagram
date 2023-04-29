import AuthProvider from '@/components/AuthProvider'
import GlobalUIProvider from '@/components/GlobalUIProvider'
import store from '@/stores/store'
import { Analytics } from '@vercel/analytics/react'
import 'allotment/dist/style.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const title = 'Use Diagram | Visualize your ideas with PlantUML'
  const description =
    'UseDiagram.com turns your ideas into diagrams with a beautiful UI. Try usediagram.com today!'
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content={description} />
        <link rel='icon' href='/favicon-16.png' type='image/png' sizes='16x16' />
        <link rel='icon' href='/favicon-32.png' type='image/png' sizes='32x32' />
        <meta property='og:description' content={description} />
        <meta
          name='keywords'
          content='use diagram, diagram generator, diagram tool, sequence diagram, flowchart, UML, BPMN, software development, visualization tool'
        />
        <meta property='og:image' content='/banner.jpg' />
        <meta property='og:title' content={title} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='670' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='hey_thien' />
        <meta name='twitter:image' content='/banner.jpg' />
        <meta name='twitter:image:src' content='/banner.jpg' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
      </Head>
      <Provider store={store}>
        <GlobalUIProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </GlobalUIProvider>
      </Provider>
      <Analytics />
    </>
  )
}
