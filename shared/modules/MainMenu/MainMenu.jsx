import React, { Fragment } from 'react'
import { inject } from 'mobx-react'
import { Search } from 'shared/modules/Search'
import { withRouter, Link } from 'react-router-dom'

import { Mobile, Desktop } from 'shared/utils'
import { UserBar } from 'shared/modules/User'

import { MenuItem } from './Components/MenuItem'
import { MenuMobile } from './Components/MobileMenu/MobileMenu'

import './main-menu.sass';

const Logo = () => <Link className="logo" to="/">LOGO</Link>

const mapState = ({ menuStore: { fetchStatus, menuList, setLocation }, execContextStore: { requestContext: { isMobile } } }) => ({
  fetchStatus,
  menuList,
  setLocation,
  isMobile,
})

export const findExceptionLocation = (pathname) => {
  const exeptionManuLocations = ['auth', 'user'];
  return exeptionManuLocations.find(item => new RegExp(item).test(pathname));
}

@withRouter
@inject(mapState)
export class MainMenu extends React.Component {
  state = {
    open: '',
  }

  componentDidMount() {
    this.setItemActive();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setItemActive();
    }
  }

  handleOpen = (id) => {
    this.setState({ open: this.state.open === id ? '' : id })

  }

  setItemActive = () => {
    const { setLocation, location: { pathname } } = this.props
    const menuItem = setLocation()
    if (findExceptionLocation(pathname) || !menuItem) {
      this.setState({ open: '' })
    } else if (!menuItem.submenu) {
      this.setState({ open: menuItem._id })
    }
  }

  render() {
    const { menuList } = this.props;

    return (
      <div className="main-menu">
        <Fragment>
          <Desktop>
            <Logo />
          </Desktop>
          <Mobile>
            <Logo />
          </Mobile>
        </Fragment>

        <Fragment>
          <Desktop>
            <div className="main-menu__menu">
              {menuList.map(item => (
                <MenuItem
                  key={item._id}
                  open={this.state.open === item._id}
                  handleOpen={this.handleOpen}
                  {...item}
                />
              ))}
            </div>
          </Desktop>
          <Mobile>
            <MenuMobile list={menuList} />
          </Mobile>
        </Fragment>

        <Fragment>
          <Desktop>
            <div className="main-menu__right-side">
              <Search size={20} />
              <UserBar />
            </div>
          </Desktop>
        </Fragment>

      </div>
    );
  }
}