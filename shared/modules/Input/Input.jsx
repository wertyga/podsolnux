import React, { Component } from 'react'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import Search from 'react-icons/lib/fa/search'
import './Input.sass';

export class Input extends Component {
  static propTypes = {
    type: PropTypes.string, // Type of Input
    style: PropTypes.object, // Style of Input
    placeholder: PropTypes.string, // Placeholder of Input
    value: PropTypes.string, // Value of Input
    onChange: PropTypes.func.isRequired, // OnChange of Input
    name: PropTypes.string.isRequired, // Name of Input
    error: PropTypes.string, // Notify of Input
    floatText: PropTypes.string, // FloatText of Input
    disabled: PropTypes.bool, // Disabled of Input
    onClick: PropTypes.func, // Function for invoke some behavior when clicked on input
    autoFocus: PropTypes.bool,
    onSubmit: PropTypes.func,
    searchIcon: PropTypes.bool,
  }
  static defaultProps = {
    onSubmit: noop,
  }

  constructor() {
    super();

    this.state = {
      value: '',
      focus: false
    };
  };

  componentDidMount() {
    const {autoFocus} = this.props;
    if (autoFocus) this.setState({focus: true})
  }


    onFocus = () => {
      this.setState({
        focus: true
      });
    }

    onBlur = () => {
      this.setState({
        focus: false
      });
    }

    onChange = ({ target: { value } }) => {
      const { onChange } = this.props;
      return onChange(value)
    }

    onKeyPress = ({ keyCode }) => {
      const { onSubmit } = this.props;
      if (keyCode === 13) return onSubmit();
    }

    render() {

      const styles = this.props.style || {};
      const { searchIcon } = this.props;

      return (
        <div className={this.state.focus ? 'focus Input' : 'Input'} style={{color: this.props.error && 'red'}}>
          {this.props.label && <div className="label">{this.props.label}</div>}
          <div style={{position: 'relative'}}>
            <input
              onClick={this.props.onClick}
              ref={this.props.inputRef}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              type={this.props.type || 'text'}
              style={{
                ...styles,
                color: this.props.error && 'red'
              }}
              placeholder={this.props.placeholder}
              className={this.state.focus ? 'focus' : undefined}
              value={this.props.value}
              onChange={this.onChange}
              name={this.props.name}
              disabled={this.props.disabled}
              onKeyDown={this.onKeyPress}
            />
            <div className="borderBottom"></div>
            {searchIcon && <Search className="input__search"/>}
            <div
              className={(this.state.focus || (this.props.value || this.state.value)) ? 'focus floatText' : 'floatText'}
              style={{color: this.props.error ? 'red' : (this.props.disabled && 'rgb(150, 150, 150)')}}
            >
              {this.props.floatText}
            </div>
            <div className={(this.state.focus && !this.props.disabled) ? 'focus after' : 'after'}></div>
          </div>
          {this.props.error && <div className="error">{this.props.error}</div>}
        </div>

      );
    }
};