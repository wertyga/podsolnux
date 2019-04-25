import { observable } from 'mobx'
import isEmpty from 'lodash/isEmpty'

import * as api from './api'

export class PricesStore {
  prices = {}
  @observable error
  @observable pendingState

  constructor(data = {}) {
    Object.assign(this, data);
  }

  getPricesList = async () => {
    if (!isEmpty(this.prices)) return;

    this.pendingState = 'pending'
    this.clearError()
    this.prices = {}

    try {
      const { data: { prices } } = await api.fetchPricesList()

      this.prices = prices;
      this.pendingState = 'fulfilled'
    } catch (e) {
      this.pendingState = 'rejected'
      this.error = getError(e)
    }
  }

  clearError = () => this.error = undefined
}