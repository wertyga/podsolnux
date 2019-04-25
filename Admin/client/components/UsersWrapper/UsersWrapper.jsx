import { inject, observer } from 'mobx-react'

import { List, Message, Loader } from 'semantic-ui-react'

import { UserItem } from './UserItem'

import './user-wrapper.sass'

@inject('userStore')
@observer
export class UsersWrapper extends React.Component {
  static propTypes = {
    userStore: PropTypes.object,
  }

  constructor(props) {
    super(props);

    props.userStore.getUsers();
  }
  render() {
    const { userStore: { error, users, pendingState } } = this.props

    if (pendingState === 'pending') return <Loader active>Loading...</Loader>
    return (
      <div className="users-wrapper">
        {error && <Message error content={error.message}/>}
        <h1>Users</h1>

        <List divided>
          {users.map(item => <UserItem className="users-wrapper__item" key={item._id} {...item} />)}
        </List>
      </div>
    );
  }
}