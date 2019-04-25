import { inject } from 'mobx-react'
import { Redirect, Switch, Route, Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

import { Page, Section, Loader } from 'shared/modules/common'

import { userMenu } from './userMenu'

import '../user.sass'

const TEXT = {
  title: 'Страница пользователя. Фотоцентр "Подсолнух"',
}

const LKComponent = ({ user, pendingState, location: { pathname } }) => {
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
        <Section grey fluid className="lk__wrapper">
          <ul className="lk__menu">
            {userMenu.map(({ href, title }) => (
              <li
                key={title}
                className={cn(
                  { active: pathname === href },
                )}
              >
                <Link to={href}>{title}</Link>
              </li>
            ))}
          </ul>
          <Switch>
            {userMenu.map(({ href, Component }) => <Route key={href} path={href} component={Component}/>)}
          </Switch>
        </Section>
      }
    </Page>
  );
}

const mapState = ({ userStore: { user, pendingState } }) => ({
  user,
  pendingState,
})

export const LKWrapper = inject(mapState)(LKComponent);