import { useState, useEffect } from 'react'
import { inject } from 'mobx-react'

import { Page, Section, Loader } from 'shared/modules/common'
import { parseQuery } from 'shared/utils/query/query'

import './confirm.sass'

const TEXT = {
  registryTitle: 'Подтверждение регистрации. Фотостудия "Подсолнух"',
  passChangeTitle: 'Смена пароля. Фотостудия "Подсолнух"',
  successVerified: 'Учетная запись активна',
  failedVerified: 'Учетная запись активна',
}

const mapState = ({ userStore: { user, verifyUser, pendingState, error, clearError } }) => ({
  user,
  verifyUser,
  error,
  clearError,
  pendingState,
})

@inject(mapState)
export class ConfirmPage extends React.Component {
  constructor(props) {
    super(props)

    const { location: { search }, user: { _id }, verifyUser, pendingState, error } = props
    const { id } = parseQuery(search)
    if (id && id !== _id && pendingState !=='pending' && !(error || {}).message) {
      verifyUser(id)
    }
  }

  componentWillUnmount() {
    this.props.clearError()
  }

  render() {
    const { location: { search }, pendingState, error } = this.props
    const { registry } = parseQuery(search)

    return (
      <Page
        className="confirm"
        title={registry ? TEXT.registryTitle : TEXT.passChangeTitle}
      >
        {pendingState === 'pending' && <Loader />}
        <Section grey fluid isOne>
          <div className="confirm__content">
            <p>{!error ? TEXT.successVerified : error.message}</p>
          </div>
        </Section>
      </Page>
    );
  }
}

ConfirmPage.propTypes = {
  user: PropTypes.object,
  verifyUser: PropTypes.func,
  clearError: PropTypes.func,
  error: PropTypes.any,
  pendingState: PropTypes.string,
}