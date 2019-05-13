import { useState } from 'react'
import { inject } from 'mobx-react'
import isEmpty from 'lodash/isEmpty'
import { Redirect } from 'react-router-dom'

import { Page, Section, Loader, Form, Notify } from 'shared/modules/common'

import { parseQuery } from 'shared/utils'

import { FormFooter } from './FormFooter'

import './auth-page.sass'

const TEXT = {
  title: 'Авторизация. Фотостудия "Подсолнух"',
  authTitle: 'Войти',
  usernameLabel: 'Логин',
  passwordLabel: 'Пароль',
  emailLabel: 'Адрес электронной почты',
  enter: 'Войти',
  registryTitle: 'Регистрация',
  authFooter: 'Зарегестрироваться',
  successAuth: 'Спасибо за регистрацию. На вашу почту отправлено письмо с активацией аккаунта',
}

const AuthPageComponent = ({ location: { search }, history, authenticate, pendingState, error, clearError, user }) => {
  if (!isEmpty(user)) return <Redirect to="/user" />
  const [successAuth, setSuccessAuth] = useState(false)

  const { registry } = parseQuery(search)

  const onSubmit = async (data) => {
    try {
      await authenticate({
        ...data,
        isRegistry: registry,
      })
      if (!registry) {
        history.push('/')
      } else {
        setSuccessAuth(true)
      }
    } catch (e) {}
  }

  const closeSuccessAuth = () => setSuccessAuth(false);

  const inputs = [
    {
      name: 'username',
      label: TEXT.usernameLabel,
      placeholder: `${TEXT.usernameLabel}...`,
      require: true,
    },
    {
      name: 'password',
      type: 'password',
      label: TEXT.passwordLabel,
      extendPassField: true,
      placeholder: `${TEXT.passwordLabel}...`,
      require: true,
    },
  ]

  if (registry) inputs.push({
    name: 'email',
    label: TEXT.emailLabel,
    placeholder: `${TEXT.emailLabel}...`,
    require: true,
  })

  const h2 = registry ? TEXT.registryTitle : TEXT.authTitle
  const buttonText = registry ? TEXT.registryTitle : TEXT.enter
  const footerTitle = registry ? TEXT.authTitle : TEXT.authFooter
  const footerHref = registry ? '/auth' : '/auth?registry=true'

  return (
    <Page
      className="auth-page"
      title={TEXT.title}
    >
      {error && <Notify type="error" onClose={clearError}>{error.message}</Notify>}
      {successAuth && <Notify onClose={closeSuccessAuth}>{TEXT.successAuth}</Notify>}
      <Section grey h2={h2} fluid>
        {pendingState === 'pending' && <Loader />}
        <Form
          key={`key-${search}-${successAuth}`}
          inputs={inputs}
          submitButtonText={buttonText}
          footerContent={<FormFooter title={footerTitle} href={footerHref}/>}
          onSubmit={onSubmit}
          disabled={pendingState === 'pending'}
        />
      </Section>
    </Page>
  );
}

const mapState = ({ userStore: { authenticate, pendingState, error, clearError, user } }) => ({
  authenticate,
  pendingState,
  error,
  clearError,
  user,
})

export const AuthPage = inject(mapState)(AuthPageComponent);