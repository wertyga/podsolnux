import React, { Component } from 'react'

import './Loader.sass'

export const Loader = ({ children }) => (
  <div className="loader">
    <div className="loader__wrapper">
      <div className="loader__spinner" />
      <p>Загрузка...</p>
      {children}
    </div>
  </div>
)
