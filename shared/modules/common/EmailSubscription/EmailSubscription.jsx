import _get from 'lodash/get'
import { inject } from 'mobx-react'

import { Input } from 'shared/modules/common/Input'
import { validateEmail } from 'server/middlewares/inputsValidation'

import './subscription.sass'

const TEXT = {
  placeholder: 'E-mail...',
  submit: 'Подписаться',
  incorrectEmail: 'Неверный адрес',
  successSubscription: 'Спасибо за подписку!',
}

@inject('userStore')
export class EmailSubscription extends React.Component {
  state = {
    email: '',
    error: '',
    successSubscription: false,
    disabled: false,
  }

  onChange = ({ target: { value } }) => {
    if (this.state.disabled) return;

    this.setState({
      error: '',
      email: value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { disabled, email } = this.state;
    if (disabled) return;

    if (!validateEmail(email)) {
      this.setState({ error: TEXT.incorrectEmail })
    } else {
      this.sendRequest();
    }
  }

  sendRequest = async () => {
    try {
      const { subscribe } = this.props.userStore
      const { email } = this.state
      this.setState({ disabled: true })

      await subscribe(email)

      this.setState({ email: '', successSubscription: true }, () => {
        setTimeout(() => this.setState({ successSubscription: false }), 3000)
      })
    } catch (message) {
      this.setState({ error: message })
    } finally {
      this.setState({ disabled: false })
    }
  }

  render() {
    const { title, text, placeholder = TEXT.placeholder } = this.props;
    const { error, email, disabled, successSubscription } = this.state;

    return (
      <form className="email-subscription" onSubmit={this.onSubmit}>
        <h4>{title}</h4>
        <p>{text}</p>

        <div className="email-subscription__inner">
          <Input
            placeholder={placeholder}
            onChange={this.onChange}
            value={email}
            error={error}
          />

          <button type="submit" disabled={disabled}>{TEXT.submit}</button>
        </div>

        {!successSubscription && <span className="email-subscription__success">{TEXT.successSubscription}</span>}
      </form>
    );
  }
}