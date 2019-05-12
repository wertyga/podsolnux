import { observable } from 'mobx'
import isEmpty from 'lodash/isEmpty'
import { archives } from 'shared/utils/files/checkFile'

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

      const {data: {prints}} = await api.fetchPrints()

      this.prints = prints;
      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e)
      this.pendingState = 'rejected'
    }
  }

  clearError = () => this.error = undefined

  setFiles = files => this.files = [...this.files, ...files]

  updateFile = ({ids, ...data}) => {
    this.files = this.files.map(item => {
      if (ids.includes(item.id)) {
        const {format, paperType} = data;

        const {price = ''} = this.prints.find(print => {
          if (paperType) return print.format === format && print.paperType === paperType;
          return print.format === format;

        }) || {}
        return {...item, ...data, price: `${price} руб.`};
      }
      return item;
    })
  }

  deleteFile = id => this.files = this.files.filter(file => file.id !== id)

  getTotalPrice = () => {
    const archiveFiles = []
    let totalPrice = 0

    const filesObj = this.files.reduce((a, { format, paperType, price, file: { type, name } }) => {
      const titleString = `${format || ''} ${paperType || ''}`
      const parsedPrice = parseFloat(price)

      if (archives.includes(type.split('/')[1])) {
        archiveFiles.push(name)
        return a;
      }

      if (!titleString.trim()) return a
      if (!a[titleString]) {
        totalPrice += parsedPrice
        return {...a, [titleString]: `${parsedPrice} руб.`}
      }

      totalPrice += parsedPrice
      return {...a, [titleString]: `${parseFloat(a[titleString]) + parsedPrice} руб.`}
    }, {})

    return {
      totalPrice,
      filesObj,
      archiveFiles,
    }
  }

  getArchiveFiles = (file) => {
    if (!file) return this.files.map(({ type }) => archives.includes(type.split('/')[1]))
    return archives.includes((file.type || '').split('/')[1])
  }
}
