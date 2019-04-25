import { inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

import { Page, Section, Loader } from 'shared/modules/common'

import '../user.sass'

const TEXT = {
  title: 'Страница пользователя. Фотоцентр "Подсолнух"',
}

const LKComponent = ({ user, pendingState }) => {
  if (isEmpty(user) && (pendingState === 'fulfilled' || pendingState === 'rejected')) {
    return <Redirect to="/auth"/>
  }
  return (
    <Page
      className="lk"
      title={TEXT.title}
    >
      {pendingState === 'pending' ?
        <Loader /> :
        <Section grey fluid>
          <h1>LK</h1>
        </Section>
      }
    </Page>
  );
}

const mapState = ({ userStore: { user, pendingState } }) => ({
  user,
  pendingState,
})

export const LK = inject(mapState)(LKComponent);