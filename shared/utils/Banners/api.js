export const fetchBanners = (category, isMobile) => (
  fetch({
    method: 'get',
    headers: {
      'mobile': isMobile ? 'phone' : '',
    },
    url: `/api/banners/${category}`,
  })
)

export const fetchBannersCategories = () => (
  fetch({
    method: 'get',
    url: '/api/banners/get-banners-categories',
  })
)