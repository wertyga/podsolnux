import { observable } from 'mobx'

import * as api from './api'

export class UserStore {
  @observable pendingState;
  @observable error;
  @observable.ref users = [];

  loginUser = async (data) => {
    this.pendingState = 'pending';

    try {
      await api.loginUser(data)

      this.pendingState = 'fulfilled';
    } catch (e) {
      this.pendingState = 'rejected';
      throw e;
    }
  }

  getUsers = async () => {
    this.pendingState = 'pending';

    try {
      const { data: { users } } = await api.fetchUsers()

      this.users = users;

      this.pendingState = 'fulfilled';
    } catch (e) {
      this.pendingState = 'rejected';
      this.error = getError(e)
    }
  }
}