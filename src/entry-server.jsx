import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { PageDataProvider } from './context/PageDataContext'

const EMPTY_PAGE_DATA = { slug: '/', content: {}, seo: {}, siteContent: {} }

export function render(url, pageData = EMPTY_PAGE_DATA) {
  return renderToString(
    <PageDataProvider value={pageData}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </PageDataProvider>
  )
}
