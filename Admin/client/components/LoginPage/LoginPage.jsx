import { inject, observer } from 'mobx-react'

import { Button, Form, Message } from 'semantic-ui-react'

const TEXT = {
  authErrorHeader: 'Authentication error',
}

@inject('userStore')
@observer
export class LoginPage extends React.Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  state = {
    username: '',
    password: '',
    error: '',
  }

  onChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value, error: '' });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    const { userStore: { loginUser }, history } = this.props;
    const emptyField = !username || !password;
    if (emptyField) return this.setState({ error: 'Fill all fields' });

    try {
      await loginUser(this.state)
      history.push('/')
    } catch (e) {
      this.setState({ error: getError(e).message })
    }
  }

  render() {
    const { error } = this.state;
    const { userStore: { pendingState } } = this.props;

    return (
      <div className="login-page">
        <h1>Login page</h1>

        <Form
          onSubmit={this.onSubmit}
          loading={pendingState === 'pending'}
          error={!!error}
        >
          <Form.Input
            name="username"
            label="Username"
            onChange={this.onChange}
          />
          <Form.Input
            label="Password"
            type="password"
            name="password"
            onChange={this.onChange}
          />

          <Message
            error
            header={TEXT.authErrorHeader}
            content={error}
          />
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
}