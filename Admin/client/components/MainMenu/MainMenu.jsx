import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import './main-manu.sass'

const components = [
  {
    slug: 'Home',
    href: '/',
  },
  {
    slug: 'banners',
    href: '/banners',
  },
  {
    slug: 'Prices',
    href: '/prices',
  },
  {
    slug: 'Users',
    href: '/users',
  },
  {
    slug: 'Print',
    href: '/print',
  },
];

@withRouter
export class MainMenu extends React.Component {
  render() {
    const { location: { pathname } } = this.props;

    return (
      <Menu
        className="main-menu"
      >
        {components.map(({ slug, href }) => {
          const pathCheckRegexp = new RegExp(href);
          const isActive = href !== '/' ? pathCheckRegexp.test(pathname) : pathname === '/';
          return (
            <Menu.Item
              key={slug}
              className="main-menu__item"
              name={slug}
              active={isActive}
            >
              <Link to={href}>{slug}</Link>
            </Menu.Item>
          )
        })}
      </Menu>
    );
  }
}