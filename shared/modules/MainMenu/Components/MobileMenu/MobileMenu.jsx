import React, { Component } from 'react'
import Close from 'react-icons/lib/fa/times-circle'
import { ButterMenu } from 'shared/modules/MainMenu/Components/ButterMenu/ButterMenu'
import { Search } from 'shared/modules/Search'
import { MenuItem } from '../MenuItem'

import './main-menu-mobile.sass'

export class MenuMobile extends Component {
  state = {
    open: '',
    openMenu: false,
  }

  handleOpen = (id, isSubmenu) => {
    this.setState({ open: this.state.open === id ? '' : id },
      () => isSubmenu && !this.state.open && this.setState({ openMenu: false })
    )
  }

  handleMenuOpen = () => {
    this.setState({ openMenu: !this.state.openMenu });
  }

  render() {
    const { list } = this.props;
    const { open, openMenu } = this.state;

    return (
      <ButterMenu
        open={openMenu}
        onClick={this.handleMenuOpen}
        right
        menu={
          <div className="main-menu-mobile">
            {list.map((item) => {
              return (
                <MenuItem
                  key={item._id}
                  handleOpen={this.handleOpen}
                  open={open === item._id}
                  {...item}
                />
              );
            })}
            <div onClick={this.handleMenuOpen} className="main-menu-mobile__close">
              <Close size={20} />
            </div>

            <Search />
          </div>
        }
      />
    );
  }
}