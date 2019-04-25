import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'

const components = [
  {
    slug: 'banners',
    href: '/banners',
  },
  {
    slug: 'prices',
    href: '/prices',
  },
];

export class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="admin-home">
        <h1>Home</h1>
      </div>
    )
  }
}