import { observable } from 'mobx'

import * as api from './api'

export class OrderStore {
  @observable pendingState
  @observable error
  orders = []

  getAllOrders = async () => {
    try {
      this.pendingState = 'pending'
      this.error = undefined

      const { data: { orders } } = await api.getAllOrders()

      this.orders = orders

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.pendingState = 'rejected'
      this.error = getError(e)
    }
  }

  deleteOrder = async (orderNumber) => {
    try {
      this.pendingState = 'pending'
      this.error = undefined

      await api.deleteOrder(orderNumber)

      this.orders = this.orders.filter(item => item.orderNumber !== orderNumber)

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.pendingState = 'rejected'
      this.error = getError(e)
    }
  }
}