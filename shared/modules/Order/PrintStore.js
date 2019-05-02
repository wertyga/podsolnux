import { observable } from 'mobx'

import * as api from './SetOrder/api'

export class PrintStore {
  @observable pendingState
  @observable error
  @observable.ref files = []
  prints = []

  getPrintPrices = async () => {
    if (this.prints.length) return;
    try {
      this.pendingState = 'pending'

      const { data: { prints } } = await api.fetchPrints()

      this.prints = prints;
      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e)
      this.pendingState = 'rejected'
    }
  }

  clearError = () => this.error = undefined

  setFiles = files => this.files = [...this.files, ...files]
}