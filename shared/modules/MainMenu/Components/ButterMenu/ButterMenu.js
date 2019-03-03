import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import cn from 'classnames';

import './ButterMenu.sass'

export class ButterMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open || false
    };
  };

  componentDidMount() {
    setTimeout(() => {
      this.f.classList.add('appear');
    }, 300);
    setTimeout(() => {
      this.s.classList.add('appear');
    }, 400);
    setTimeout(() => {
      this.t.classList.add('appear');
    }, 500)

  };

  componentDidUpdate(prevProps) {
    if(this.props.open && (this.props.open !== prevProps.open)) {
      this.setState({ open : this.props.open });
    }
  };

  onClick = e => {
    // this.setState({ open : !this.state.open });
    this.props.onClick();
  };


  render() {
    const { open } = this.props;

    return (
      <div className={cn({
        'butter-menu': true,
        open,
        right: this.props.right,
        ...this.props.className
      })}>
        <div className="bars" onClick={this.onClick}>
          <div className='f' ref={node => this.f = node} />
          <div className='s' ref={node => this.s = node} />
          <div className='t' ref={node => this.t = node} />
        </div>

        {this.props.menu}

      </div>
    );
  }
};

ButterMenu.defaultProps = {
  onClick: noop,
}

ButterMenu.propTypes = {
  onClick: PropTypes.func,
  open: PropTypes.bool, // Control open menu [ default === this.state.open]
  right: PropTypes.bool, // Determinate from what side bars amd menu will be slide [ default === left]
  barHeight: PropTypes.number, // Height of bars [ default === 1]
  className: PropTypes.object, // Adding classNames view is { [key]: bool }
  // menu: PropTypes.arrayOf(PropTypes.shape({
  //   text: PropTypes.string.isRequired, // Title of the list element
  //   onClick: PropTypes.func, // Function when click on list item
  //   className: PropTypes.object, // Object of classnames { [key]: [value] }
  // })), // Array of objects that's mapping to side menu list
  menu: PropTypes.node,
};