import { observable } from 'mobx'

import * as api from './api'

export class BannersStore {
  @observable bannerCategories = []
  @observable pendingState

  banners = {};

  fetchBanners = async (category) => {
    if (!category) return;
    this.pendingState = 'pending'

    try {
      const { data: { banners } } = await api.fetchBanners(category)

      this.banners = {
        ...this.banners,
        [category]: banners,
      }

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.pendingState = 'rejected'
    }
  }

  fetchBannersCategories = async () => {
    this.pendingState = 'pending';

    try {
      const { data: { items } } = await api.fetchBannersCategories()

      this.bannerCategories = items;

      this.pendingState = 'fulfilled';
    } catch (e) {
      this.pendingState = 'rejected';
    }
  }
}