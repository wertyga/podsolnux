import { observable } from 'mobx'

import * as api from './api'

export class PrintStore {
  @observable pendingState;
  @observable addNewPendingState
  error;
  printPrices = {}

  getPrintPrices = async () => {
    this.pendingState = 'pending'
    this.error = undefined
    this.prices = {}

    try {
      const { data: { prints } } = await api.fetchPrints()

      this.printPrices = {
        print: prints,
      };

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e)
      this.pendingState = 'rejected'
    }
  }

  addNewPrint = async (fetchData) => {
    this.addNewPendingState = 'pending'
    this.error = undefined
    try {
      const { data: { _id, title, paperType, price } } = await api.addNewPrint(fetchData)

      this.printPrices = {
        print: [...this.printPrices.print, { _id, title, paperType, price }],
      }

      this.addNewPendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e);
      this.addNewPendingState = 'rejected'
    }
  }

  editPrint = async (id, data) => {
    if (!id) return;

    this.addNewPendingState = 'pending'
    this.error = undefined

    try {
      const { data: { title, price, paperType, _id } } = await api.editPrint({ id, data })

      this.printPrices = {
        print: this.printPrices.print.map(item => {
          if (item._id === id) return { title, paperType, price,_id };
          return item;
        })
      }
      this.addNewPendingState = 'fulfilled'
    } catch(e) {
      this.error = getError(e);
      this.addNewPendingState = 'rejected'
    }
  }

  deletePrint = async (id) => {
    this.addNewPendingState = 'pending'
    this.error = undefined
    try {
      await api.deletePrint({ id })

      this.printPrices = {
        print: this.printPrices.print.filter(item => item._id !== id)
      }

      this.addNewPendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e);
      this.addNewPendingState = 'rejected'
    }
  }
}