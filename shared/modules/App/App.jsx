import React from 'react'
import Helmet from 'react-helmet'

import { MainMenu } from 'shared/modules/MainMenu'

const helmet = {
  title: 'Фотостудия "Подсолнух" - печать фотографий, услуги печати',
  content: "Широкий спектр печатных услуг, печать фотографий, распечатка текстов, и другой дряни",
}

export const App = ({ children }) => {
  const { title, content } = helmet;
  return (
    <div className="app">
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content={content}
        />
      </Helmet>
      <main>

        <nav>
          <MainMenu />
        </nav>

        <div className="main-wrapper">
          {children}
        </div>
      </main>
    </div>
  )
}