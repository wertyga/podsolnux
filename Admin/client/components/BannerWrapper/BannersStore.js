import { observable } from 'mobx'
import isEmpty from 'lodash/isEmpty'

import * as api from './api'

export class BannersStore {
  @observable pendingState
  @observable error

  bannerCategories = []
  banners = {}
  currentCategory = {}
  file

  fetchCategories = async () => {
    try {
      this.pendingState = 'pending'
      this.error = ''

      const { data: { categories } } = await api.fetchCategories()

      this.bannerCategories = categories

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e)
      this.pendingState = 'rejected'
    }
  }

  addCategory = async (slug) => {
    try {
      this.pendingState = 'pending'
      this.error = ''

      const { data: { category } } = await api.addCategory(slug)

      this.bannerCategories = [...this.bannerCategories, category]

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e)
      this.pendingState = 'rejected'
    }
  }

  getBannerCategory = async (slug) => {
    try {
      this.pendingState = 'pending'
      this.error = ''

      const { data: { category } } = await api.fetchCategory(slug)

      this.currentCategory = { ...category, banners: this.sortBanners(category.banners) }

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e)
      this.pendingState = 'rejected'
    }
  }

  addBannerImage = async () => {
    if (!this.file || isEmpty(this.currentCategory)) {
      this.error = { message: 'Choose image' }
      return;
    }

    try {
      this.pendingState = 'pending'

      const { slug } = this.currentCategory
      const blob = new FormData()

      blob.append(slug, this.file)

      const { data: { banners } } = await api.addBanner(blob)

      this.currentCategory = {
        ...this.currentCategory,
        banners: this.sortBanners(banners),
      }
      this.file = undefined

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e)
      this.pendingState = 'rejected'
      throw e
    }
  }

  deleteCategory = async (slug) => {
    if (!slug) return;

    try {
      this.pendingState = 'pending'
      this.error = ''

      await api.deleteCategory(slug)

      this.bannerCategories = this.bannerCategories.filter(item => item.slug !== slug)

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e)
      this.pendingState = 'rejected'
      throw e
    }
  }

  renameCategory = async (slug, newName) => {
    try {
      this.error = ''

      const { data: { category } } = await api.renameCategory(slug, newName)

      this.bannerCategories = this.bannerCategories.map((item) => {
        if (item.slug === slug) return { ...item, slug: category.slug };

        return item;
      })
      this.currentCategory = { ...this.currentCategory, slug: category.slug  }

      this.rootStore.history.replace(`/banners/${category.slug}`)
    } catch (e) {
      this.error = getError(e)
    }
  }

  deleteBanner = async (slug, banner) => {
    try {
      this.pendingState = 'pending'
      this.error = ''

      await api.deleteBanner(slug, banner)

      this.currentCategory = {
        ...this.currentCategory,
        banners: this.currentCategory.banners.filter(({ path }) => path !== banner),
      }

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e)
      this.pendingState = 'rejected'
    }
  }

  changeBanner = async (slug, banner, data) => {
    try {
      this.pendingState = 'pending'
      this.error = ''

      const { data: { banners } } = await api.changeBanner(slug, banner, data)

      this.currentCategory = {
        ...this.currentCategory,
        banners: this.sortBanners(banners),
      }

      this.pendingState = 'fulfilled'
    } catch (e) {
      this.error = getError(e)
      this.pendingState = 'rejected'
    }
  }

  sortBanners = (banners) => banners.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
}