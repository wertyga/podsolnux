import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Loader.sass'

export class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <div className="loader__wrapper">
          <div className="loader__spinner" />
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }
}
