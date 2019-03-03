import React, { Fragment } from 'react';
import { inject } from 'mobx-react';
import { Search } from 'shared/modules/Search'
import { withRouter } from 'react-router-dom'

import { Mobile, Desktop } from 'shared/utils'

import { MenuItem } from './Components/MenuItem';
import { MenuMobile } from './Components/MobileMenu/MobileMenu'

import './main-menu.sass';

const Logo = () => <div className="logo">LOGO</div>

const mapState = ({ menuStore: { fetchStatus, menuList, setLocation } }) => ({
  fetchStatus,
  menuList,
  setLocation,
})

@inject(mapState)
export class MainMenu extends React.Component {
  state = {
    open: '',
  }
  componentDidMount() {
    const { setLocation } = this.props;
    const location = setLocation();

    if (location) this.setState({ open: location._id })
  }

  handleOpen = (id) => {
    this.setState({ open: this.state.open === id ? '' : id })
  }
  render() {
    const { menuList, fetchStatus } = this.props;

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

        <Desktop>
          <Search size={17} />
        </Desktop>

      </div>
    );
  }
}