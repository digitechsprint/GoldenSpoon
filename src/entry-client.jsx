import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { PageDataProvider } from './context/PageDataContext'

const pageData = window.__PAGE_DATA__ || { slug: '/', content: {}, seo: {}, siteContent: {} }

hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <PageDataProvider value={pageData}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PageDataProvider>
  </React.StrictMode>
)
