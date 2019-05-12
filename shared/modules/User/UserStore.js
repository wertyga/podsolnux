import { observable } from 'mobx'
import _get from 'lodash/get'

import * as api from './api'

export class UserStore {
  @observable pendingState;
  @observable error;
  @observable.ref user = {}

  constructor(data = {}) {
    Object.assign(this, data)
  }

  subscribe = async (email) => {
    try {
      await api.sendSubscribe(email)
    } catch (e) {
      throw _get(e, 'response.data.errors[0].message', '') || e.message
    }
  }

  authenticate = async (data) => {
    this.pendingState = 'pending'
    this.error = ''

    try {
      const { data: { user } } = await api.auth(data)

      this.user = user
      this.rootStore.get('cookiesStore').set('fp-userID', user._id)

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e);
      this.pendingState = 'rejected'
      throw this.error;
    }
  }

  getUser = async (id) => {
    if (!id) return;
    this.pendingState = 'pending'
    this.error = ''

    try {
      const { data: { user } } = await api.getUser(id)

      this.user = user
      this.pendingState = 'fulfilled'
    } catch (e) {
      this.pendingState = 'rejected'
    }
  }

  verifyUser = async (id) => {
    if (!id) return;
    this.pendingState = 'pending'
    this.error = ''

    try {
      const { data: { user } } = await api.verifyUser(id)

      this.user = user
      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e);
      this.pendingState = 'rejected'
    }
  }

  logoutUser = async () => {
    const { _id } = this.user;
    if (!_id) return;

    try {
      this.pendingState = 'pending'
      this.error = ''

      await api.logoutUser(_id)
      this.clearUser()
      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e)
      this.pendingState = 'rejected'
      throw this.error;
    }
  }

  clearError = () => {
    this.error = ''
    this.pendingState = undefined
  }

  clearUser = () => {
    this.rootStore.get('cookiesStore').remove('fp-userID')
    this.user = {};
  }
}