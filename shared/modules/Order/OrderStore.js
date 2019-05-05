import { observable } from 'mobx'
import noop from 'lodash/noop'
import axios from 'axios'

import * as api from './SetOrder/api'

export class OrderStore {
  @observable pendingState
  @observable error
  cancelUpload = noop
  orders = []

  uploadFiles = async (uploadFunc = noop) => {
    const formData = new FormData()
    const { files } = this.rootStore.get('printStore')
    const { user: { _id } } = this.rootStore.get('userStore')

    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    this.cancelUpload = source.cancel

    for (let i = 0; i < files.length; i++) {
      const { title, paperType, file, id, price } = files[i]
      formData.append(JSON.stringify({ title, paperType, id, price }), file)
    }

    try {
      this.pendingState = 'pending'

      const { data: { order } } = await api.sendOrder({
        data: formData,
        id: _id,
        onUploadProgress: uploadFunc,
        cancelToken: source.token,
      })

      this.saveOrder(order)

      this.cancelUpload = noop
      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = e.response && getError(e);
      this.cancelUpload = noop
      this.pendingState = 'rejected'
    }
  }

  saveOrder = ({ orderID, userID }) => {
    const cookiesStore = this.rootStore.get('cookiesStore')
    const userIDCookie = cookiesStore.get('userID')

    if (!userIDCookie) cookiesStore.set('userID', userID)

    this.orders = [...this.orders, orderID]
    this.rootStore.get('printStore').files = []
  }

}