import React, { Component, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Close from 'react-icons/lib/fa/times-circle'
import { ButterMenu } from 'shared/modules/MainMenu/Components/ButterMenu/ButterMenu'
import { Search } from 'shared/modules/Search'
import { UserBar } from 'shared/modules/User'
import { MenuItem } from '../MenuItem'

import { findExceptionLocation } from '../../MainMenu'

import './main-menu-mobile.sass'

const MenuMobileComponent = ({ list, location: { pathname } }) => {
  const getPathId = () => (list.find(({ href }) => pathname === href) || {})._id

  const [open, setOpen] = useState(getPathId());
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => setOpenMenu(!openMenu);

  const handleOpen = (id, isSubmenu) => {
    setOpen(open === id ? '' : id);
    isSubmenu && !open && setOpenMenu(false);
  }

  useEffect(() => {
    if (findExceptionLocation(pathname)) setOpen('');
    setOpenMenu(false);
    setOpen(getPathId())
  }, [pathname])

  return (
    <ButterMenu
      open={openMenu}
      onClick={handleMenuOpen}
      right
      menu={
        <div className="main-menu-mobile">
          {list.map((item) => {
            return (
              <MenuItem
                key={item._id}
                handleOpen={handleOpen}
                open={open === item._id}
                onClick={handleMenuOpen}
                {...item}
              />
            );
          })}
          <div onClick={handleMenuOpen} className="main-menu-mobile__close">
            <Close size={20} />
          </div>

          <div className="main-menu-mobile__footer">
            <UserBar />
            <Search size={20} />
          </div>
        </div>
      }
    />
  );
}

export const MenuMobile = withRouter(MenuMobileComponent)

// @withRouter
// export class MenuMobile extends React.Component {
//   constructor(props) {
//     super(props)
//
//     const {  } = props.list.find(({ href }) => href === pathname) || {};
//     this. state = {
//       open: pathId '',
//       openMenu: false,
//     }
//   }
//
//   componentDidUpdate(prevProps) {
//     if (this.props.location.pathname !== prevProps.location.pathname) {
//       this.setState({
//         open: findExceptionLocation(pathname) ? '' : this.state.open,
//         openMenu: false,
//       })
//     }
//   }
//
//   handleMenuOpen = () => setOpenMenu(!openMenu);
//
//   handleOpen = (id, isSubmenu) => {
//     this.setState({
//       open: this.state.open === id ? '' : id,
//       openMenu: isSubmenu && this.state.open && false,
//     })
//   }
//
//   render() {
//     const { list, location: { pathname } } = this.props
//     return (
//       <ButterMenu
//         open={openMenu}
//         onClick={this.handleMenuOpen}
//         right
//         menu={
//           <div className="main-menu-mobile">
//             {list.map((item) => {
//               return (
//                 <MenuItem
//                   key={item._id}
//                   handleOpen={this.handleOpen}
//                   open={open === item._id}
//                   onClick={this.handleMenuOpen}
//                   {...item}
//                 />
//               );
//             })}
//             <div onClick={handleMenuOpen} className="main-menu-mobile__close">
//               <Close size={20} />
//             </div>
//
//             <div className="main-menu-mobile__footer">
//               <UserBar />
//               <Search size={20} />
//             </div>
//           </div>
//         }
//       />
//     );
//   }
// }