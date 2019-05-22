export const fetchBanners = (category) => (
  fetch({
    method: 'get',
    url: `/api/banners/${category}`,
  })
)

export const fetchBannersCategories = () => (
  fetch({
    method: 'get',
    url: '/api/banners/get-banners-categories',
  })
)