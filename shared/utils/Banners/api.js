export const fetchBanners = () => (
  fetch({
    method: 'get',
    url: '/api/banners/get-banners',
  })
)

export const fetchBannersCategories = () => (
  fetch({
    method: 'get',
    url: '/api/banners/get-banners-categories',
  })
)