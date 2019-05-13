import { inject } from 'mobx-react'
import { Redirect, Switch, Route, Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

import { Page, Section, Loader, Notify } from 'shared/modules/common'

import { userMenu } from './userMenu'

import '../user.sass'

const TEXT = {
  title: 'Страница пользователя. Фотоцентр "Подсолнух"',
  exit: 'Выйти',
}

const LKComponent = ({ user, pendingState, logoutUser, location: { pathname }, history, error, clearError }) => {
  if (isEmpty(user) && pendingState !== 'pending') {
    return <Redirect to="/auth"/>
  }

  const logout = async () => {
    try {
      await logoutUser()
      history.push('/')
    } catch (e) {}
  }

  return (
    <Page
      className="lk"
      title={TEXT.title}
    >
      {error && <Notify type="error" onClose={clearError}>{error.message}</Notify>}
      {pendingState === 'pending' ?
        <Loader /> :
        <Section grey fluid className="lk__wrapper">
          <ul className="lk__menu">
            {userMenu
              .filter(({ title }) => !!title)
              .map(({ href, title }) => (
              <li
                key={title}
                className={cn(
                  { active: pathname === href },
                )}
              >
                <Link to={href}>{title}</Link>
              </li>
            ))}
            <li
              key="exit"
              onClick={logout}
            >
              {TEXT.exit}
            </li>
          </ul>
          <div className="lk__content">
            <Switch>
              {userMenu.map(({ href, Component }) => <Route key={href} path={href} component={Component}/>)}
            </Switch>
          </div>
        </Section>
      }
    </Page>
  );
}

const mapState = ({ userStore: { user, pendingState, logoutUser, error, clearError } }) => ({
  user,
  pendingState,
  logoutUser,
  error,
  clearError,
})

export const LKWrapper = inject(mapState)(LKComponent);