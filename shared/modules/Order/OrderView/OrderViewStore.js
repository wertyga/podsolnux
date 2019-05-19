import { observable } from 'mobx'

import * as api from './api'

export class OrderViewStore {
  @observable pendingState
  @observable error
  order = {}

  getOrder = async (orderID) => {
    if (this.order._id === orderID || !orderID) return;

    const userID = this.rootStore.get('cookiesStore').get('fp-userID')
    this.pendingState = 'pending'
    this.error = undefined

    try {
      const { data: { order } } = await api.fetchOrder({ orderID, userID })

      this.order = order

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e)
      this.pendingState = 'rejected'
    }
  }

  clearError = () => this.error = undefined

  collectFilesAmountPrice = (files = []) => {
    let archives = 0
    const images = files.reduce((a, { amount, format, paperType, price, isArchiveFile }) => {
      if (isArchiveFile) {
        archives ++
        return a;
      }
      const title = `${format} ${paperType}`
      const formatPrice = parseFloat(price) * amount

      return {
        ...a,
        [title]: {
          amount: a[title] ? a[title].amount + +amount : +amount,
          formatPrice: a[title] ? a[title].formatPrice + formatPrice : formatPrice,
        },
      }
    }, {})

    return {
      images,
      archives,
    }
  }
}