import { inject, observer } from 'mobx-react'

import { Input } from 'shared/modules/common'

import { updatableUserFields } from 'server/models/user'
import { validateEmail } from 'shared/utils/Helpers'

import './user-settings.sass'

const TEXT = {
  header: 'Личные данные',
  username: 'Имя',
  email: 'Адрес электронной почты',
  phone: 'Телефон',
  isSubscribed: 'Подписки',
  verified: 'Верификация:',
  save: 'Сохранить',
  inputError: 'Ошибка при заполнении',
  emailError: 'Неверный адрес',
}

@inject('userStore')
@observer
export class UserSettings extends React.Component {
  constructor(props) {
    super(props)

    const { userStore: { user } } = props

    this.checkboxes = ['isSubscribed']
    this.ignoreInputs = ['verified']

    this.state = updatableUserFields
      .reduce((a, key) => ({ ...a, [key]: { value: user[key], error: '' } }), {})
  }

  onChange = (key, value) => this.setState({ [key]: { value, error: '' } })

  checkErrors = () => {
    const errors = Object.entries(this.state)
      .map(([key, { value }]) => {
        if(this.checkboxes.includes(key) || this.ignoreInputs.includes(key)) return false;

        if (!value) return key
      })
      .filter(item => !!item)

    if (errors.length) {
      this.setState({
        ...this.state,
        ...errors.reduce((a, key) => ({
          ...a,
          [key]: { value: this.state[key].value, error: TEXT.inputError },
        }), {})
      })
    }

    return !errors.length;
  }

  onSubmit = () => {
    if (!validateEmail(this.state.email.value)) {
      return this.setState({
        email: { value: this.state.email.value, error: TEXT.emailError }
      })
    }

    const updatedData = updatableUserFields.reduce((a, b) => ({
      ...a,
      [b]: this.state[b].value,
    }), {})

    this.props.userStore.updateUser(updatedData)
  }

  render() {
    const { userStore: { user: { verified } } } = this.props
    return (
      <div className="user-settings">
        <h1>{TEXT.header}</h1>

        <div className="user-settings__content">
          <div className="user-settings__inputs">
            {updatableUserFields.map(key => {
              if (this.checkboxes.includes(key) || this.ignoreInputs.includes(key)) return null;

              return (
                  <div className="user-settings__inputs__item" key={key}>
                    <div>{`${TEXT[key]}:`}</div>
                    <Input
                      name={key}
                      value={this.state[key].value}
                      onChange={({ target: { value } }) => this.onChange(key, value)}
                      error={this.state[key].error}
                    />
                  </div>
              );
            })}
          </div>
          <div className="user-settings__checkboxes">
            {this.checkboxes.map(key => (
              <div className="user-settings__inputs__item" key={key}>
                <div>{`${TEXT[key]}:`}</div>
                <Input
                  type="checkbox"
                  checked={!!this.state[key].value}
                  onChange={() => this.setState({ [key]: { value: !this.state[key].value, error: '' } })}
                  error={this.state[key].error}
                />
              </div>
            ))}
          </div>

          <div className={cn(
            'user-settings__verified',
            { verified },
          )}>
            <span>{TEXT.verified}</span>
            <span>{verified ? 'Есть': 'Нет'}</span>
          </div>

          <div className="save-btn">
            <button className="btn accent" onClick={this.onSubmit}>{TEXT.save}</button>
          </div>
        </div>
      </div>
    );
  }
}