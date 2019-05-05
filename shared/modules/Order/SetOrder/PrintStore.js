import { observable } from 'mobx'

import * as api from './api'

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

  updateFile = ({ ids, ...data }) => {
    this.files = this.files.map(item => {
      if (ids.includes(item.id)) {
        const { title, paperType } = data;

        const { price = '' } = this.prints.find(print => {
          if (paperType) return print.title === title && print.paperType === paperType;
          return print.title === title;

        })
        return { ...item, ...data, price: `${price} руб.` };
      }
      return item;
    })
  }

  deleteFile = id => this.files = this.files.filter(file => file.id !== id)
}