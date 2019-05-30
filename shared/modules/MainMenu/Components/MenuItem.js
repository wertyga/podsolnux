import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import cn from 'classnames'
import { withRouter, Link } from 'react-router-dom'
import { inject } from 'mobx-react'
import { SubMenu } from './SubMenu'

const mapState = ({ execContextStore: { requestContext: { isMobile, isClient } } }) => ({
  isMobile,
  isClient,
})

@withRouter
@inject(mapState)
export class MenuItem extends Component {
  static propTypes = {
    isMobile: PropTypes.bool,
    isClient: PropTypes.bool,
    handleOpen: PropTypes.func,
    onClick: PropTypes.func,
  }
  static defaultProps = {
    handleOpen: noop,
    onClick: noop,
  }

  state = {
    openState: this.props.open,
    visible: false,
  }

  isHasSubmenu = !!(this.props.submenu && this.props.submenu.length);

  componentDidUpdate(prevProps) {
    const { isClient, open } = this.props;

    if (open !== prevProps.open) {
      if (open && isClient) {
        this.setState({ openState: open })
        setTimeout(() => this.setState({ visible: !this.state.visible }), 30)
        document.body.addEventListener('keydown', this.bodyCloseEvent)
      } else {
        this.setState({ visible: !this.state.visible })
        setTimeout(() => this.setState({ openState: open }), 200)
        document.body.removeEventListener('keydown', this.bodyCloseEvent)
      }
    }
  }

  bodyCloseEvent = (e) => {
    if (e.keyCode === 27) {
      this.props.open && this.onClick(e);
    }
  }

  onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const { handleOpen, _id, href, history, onClick } = this.props;

    if (href && !this.isHasSubmenu) {
      handleOpen(_id);
      onClick();
      return history.push(href);
    }
    if (!this.isHasSubmenu) return;

    handleOpen(_id);
  }

  render() {
    const { className, title, submenu, handleOpen, _id, href }  = this.props;
    const { visible, openState } = this.state;

    return (
      <Link
        className={cn(
          'menu-item',
          { 'menu-item__open': visible },
          { 'menu-item__title-active': openState },
          className,
        )}
        to={href || '/'}
        title={title}
      >
        <div
          className={cn(
            'menu-item__title',
          )}
          onClick={this.onClick}
        >
          <span>{title}</span>
          {this.isHasSubmenu && <span className="carret carret-down"/>}
        </div>
        {this.isHasSubmenu && openState && <SubMenu menu={submenu} onClick={() => handleOpen(_id, true)}/>}
      </Link>
    );
  }
}
