import { useEffect, useState } from 'react'
import noop from 'lodash/noop'

import './modals.sass'


export class Modal extends React.Component {
  state = {
    preVisible: false,
    fullVisible: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      if (this.props.visible) {
        this.setState({ preVisible: true })
        setTimeout(() => this.setState({ fullVisible: true }), 0)
      } else {
        this.close()
      }
    }
  }

  close = () => {
    this.setState({ fullVisible: false })
    setTimeout(() => this.setState({ preVisible: false }), 300)
  }

  render() {
    const { onClick, children } = this.props
    const { preVisible, fullVisible } = this.state
    return (
      <div
        className={cn(
          'modal',
          { 'modal__pre-shown': preVisible },
          { 'modal__shown': fullVisible },
        )}
        role="presentation"
        onClick={onClick}
      >
        <div className="modal__content-wrapper">
          {children}
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  onClick: noop,
}

Modal.propTypes = {
  onClick: PropTypes.func,
  visible: PropTypes.bool,
}