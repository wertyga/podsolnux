import { observable } from 'mobx'

import * as api from './api'

export class OrderListStore {
  @observable pendingState
  orders = []

  getOrdersList = async () => {
    const userID = this.rootStore.get('cookiesStore').get('fp-userID')
    if (!userID) return;

    try {
      this.pendingState = 'pending'

      const { data: { orders } } = await api.getOrdersList(userID)

      this.orders = orders

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e)
      this.pendingState = 'rejected'
    }
  }
}