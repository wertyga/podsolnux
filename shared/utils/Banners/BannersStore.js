import { observable } from 'mobx'

import * as api from './api'

const pathes = {
  '/': 'home',
}

export class BannersStore {
  @observable bannerCategories = []
  @observable pendingState

  banners = {};

  constructor(data = {}) {
    Object.assign(this, data)
  }

  fetchBanners = async () => {
    if (!this.rootStore.history || this.pendingState === 'pending') return;

    const category = pathes[this.rootStore.history.location.pathname]
    if (!category || this.banners[category]) return;

    const { requestContext: { isMobile } } = this.rootStore.get('execContextStore')

    this.pendingState = 'pending'

    try {
      const { data: { banners: { banners } } } = await api.fetchBanners(category, isMobile)

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

  getBanners = () => {
    if (!this.rootStore.history) return [];

    const category = pathes[this.rootStore.history.location.pathname]
    if (!category || !this.banners[category]) return [];

    return this.banners[category].sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
  }
}