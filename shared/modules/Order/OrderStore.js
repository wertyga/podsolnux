import { observable } from 'mobx'
import noop from 'lodash/noop'
import axios from 'axios'

import * as api from './SetOrder/api'

export class OrderStore {
  @observable pendingState
  @observable error
  cancelUpload = noop
  orders = []

  uploadFiles = async (uploadFunc = noop, additionalData = {}) => {
    const formData = new FormData()
    const { files, getArchiveFiles } = this.rootStore.get('printStore')
    const { user: { _id: userID } } = this.rootStore.get('userStore')

    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    this.cancelUpload = source.cancel

    for (let i = 0; i < files.length; i++) {
      const isArchiveFile = getArchiveFiles(files[i].file)
      const { format, paperType, file, id, price, amount } = files[i]
      formData.append(JSON.stringify({ format, paperType, id, price, isArchiveFile, amount }), file)
    }
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(`${key}=${value}`, '')
    })
    formData.append(`userID=${userID || ''}`, '')

    try {
      this.pendingState = 'pending'

      const { data: { order } } = await api.sendOrder({
        data: formData,
        onUploadProgress: uploadFunc,
        cancelToken: source.token,
      }, additionalData)

      this.saveOrder(order)
      this.cancelUpload = noop
      this.pendingState = 'fulfilled'
      this.rootStore.history.push(`/thanks-for-order?orderID=${order._id}`)
    } catch (e) {
      this.error = e.response && getError(e)
      this.cancelUpload = noop
      this.pendingState = 'rejected'
    }
  }

  saveOrder = (order) => {
    const cookiesStore = this.rootStore.get('cookiesStore')
    const userStore = this.rootStore.get('userStore')
    const { user: userID, _id: orderID } = order

    cookiesStore.set('fp-userID', userID)
    userStore.user = { userID }

    this.orders = [...this.orders, orderID]
    this.rootStore.get('printStore').files = []
    this.rootStore.get('orderViewStore').order = order
  }

}