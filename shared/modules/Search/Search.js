import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { inject } from 'mobx-react'
import Search from 'react-icons/lib/fa/search'
import Close from 'react-icons/lib/md/close'
import { Input } from 'shared/modules/Input'

import './search.sass'

const TEXT = {
  placeholder: 'Поиск...',
}

const mapState = ({ execContextStore: { requestContext: { isMobile } } }) => ({
  isMobile,
})

@inject(mapState)
export class SearchComponent extends Component {
  static propTypes = {
    isMobile: PropTypes.bool,
  }

  state = {
    open: false,
    value: ''
  }

  onIconClick = () => {
    this.setState({ open: !this.state.open }, () => {
      if (!this.state.open) this.setState({ value: '' })
    })
  }

  onChange = (value) => {
    this.setState({ value })
  }

  onSubmit = () => {
    this.setState({ open: false , value: '' })
  }

  render() {
    const { open, value } = this.state;
    const { size, isMobile } = this.props;

    return (
      <div
        className={cn(
          'search',
          { 'search__open': open },
        )}
        // onClick={this.onIconClick}
      >
        <div className={cn(
          'search__input-wrapper',
          { 'search__input-wrapper__open': open }
        )}>
          <Input
            value={value}
            name="search"
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            placeholder={TEXT.placeholder}
            searchIcon={!isMobile}
          />
          {!isMobile && <div className="search__close" onClick={this.onSubmit}><Close size={15} /></div>}
        </div>

        <Search size={size} onClick={this.onIconClick} className="search__search-icon"/>
      </div>
    );
  }
}