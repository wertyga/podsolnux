import { observable } from 'mobx'

import * as api from './api'

export class BannersStore {
  @observable items = [];
  @observable bannerCategories = [];
  @observable fetchStatus;

  fetchBanners = async () => {
    this.fetchStatus = 'pending';

    try {
      const { data: { items } } = await api.fetchBanners()

      this.items = items;

      this.fetchStatus = 'fulfilled';
    } catch (e) {
      this.fetchStatus = 'rejected';
    }
  }

  fetchBannersCategories = async () => {
    this.fetchStatus = 'pending';

    try {
      const { data: { items } } = await api.fetchBannersCategories()

      this.bannerCategories = items;

      this.fetchStatus = 'fulfilled';
    } catch (e) {
      this.fetchStatus = 'rejected';
    }
  }
}