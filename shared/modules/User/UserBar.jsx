import { inject } from 'mobx-react'
import isEmpty from 'lodash/isEmpty'
import { Link, withRouter } from 'react-router-dom'

import UserFace from 'react-icons/lib/fa/user-plus'

const TEXT = {
  authIn: 'Войти',
  authOut: 'Выйти',
  authed: 'ЛК',
}

const mapState = ({ userStore: { user } }) => ({
  isAuth: !isEmpty(user),
})

@withRouter
@inject(mapState)
export class UserBar extends React.Component {
  static propTypes = {
    isAuth: PropTypes.bool,
  }

  render() {
    const { isAuth, location: { pathname } } = this.props;
    return (
      <div className={cn(
        'user-bar',
        { logged: isAuth},
      )}>
        <Link
          className={cn(
            'user-bar__auth',
            { active: /auth|user/.test(pathname) },
          )}
          to={!isAuth ? '/auth' : '/user'}
        >
          <UserFace size={25} />
          <span>{isAuth ? TEXT.authed : TEXT.authIn}</span>
        </Link>
      </div>
    );
  }
}