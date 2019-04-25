import { observable, action } from 'mobx'

import * as api from './api'

export class PricesStore {
  @observable pendingState
  @observable addNewPendingState
  @observable error
  @observable.ref prices = {}
  @observable.ref categories = []

  @action
  getPricesList = async (category) => {
    this.pendingState = 'pending'
    this.error = undefined
    this.prices = {}

    try {
      const { data: { prices, categories = [] } } = await api.fetchPricesList(category)

      this.prices = prices;
      this.categories = categories;

      this.pendingState = 'fulfilled'
    } catch (e) {
      console.log(e);
      this.pendingState = 'rejected'
      this.error = getError(e)
    }
  }

  @action
  addNewPrice = async (data) => {
    this.addNewPendingState = 'pending'
    this.error = undefined

    try {
      const { data: { articleName: name, category, value, _id } } = await api.addNewPrice(data)

      this.collectPrices(category, { name, value, _id })
      if (!this.categories.includes(category)) this.categories.push(category)
      this.addNewPendingState = 'fulfilled'
    } catch (e) {
      this.addNewPendingState = 'rejected'
      throw getError(e);
    }
  }

  @action
  editPrice = async (id, data) => {
    if (!id) return;

    try {
      const { data: { articleName: name, category, value, _id } } = await api.editPrice({ id, data })

      this.collectPrices(category, { name, value, _id }, true)
    } catch(e) {
      throw getError(e);
    }
  }

  @action
  deletePrice = async (id) => {
    try {
      const { data: { category, _id } } = await api.deletePrice({ id })

      this.prices = {
        ...this.prices,
        [category]: this.prices[category].filter(item => item._id !== _id)
      }
    } catch (e) {
      throw getError(e);
    }
  }

  collectPrices = (category, prices, editedPrice) => {
    const isNewCategory = !this.prices[category]

    if (isNewCategory) {
      this.prices = {
        ...this.prices,
        [category]: [prices],
      }
    } else if (editedPrice) {
      const editedPrice = this.prices[category].map((item) => {
        if (item._id === prices._id) {
          return prices;
        }

        return item;
      })
      this.prices = {
        ...this.prices,
        [category]: editedPrice,
      }
    } else {
      this.prices = {
        ...this.prices,
        [category]: [...this.prices[category], prices],
      }
    }
  }
}