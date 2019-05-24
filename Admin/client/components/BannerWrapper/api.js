export const fetchCategories = () => (
  fetch({
    method: 'get',
    url: '/api/banners/categories',
  })
)

export const addCategory = (category) => (
  fetch({
    method: 'post',
    url: '/api/banners/categories',
    data: { category },
  })
)

export const fetchCategory = (category) => (
  fetch({
    method: 'get',
    url: `/api/banners/categories/${category}`,
  })
)

export const addBanner = (blob) => (
  fetch({
    method: 'post',
    url: `/api/banners`,
    data: blob,
  })
)

export const deleteCategory = (slug) => (
  fetch({
    method: 'delete',
    url: `/api/banners/categories/${slug}`,
  })
)

export const renameCategory = (slug, newName) => (
  fetch({
    method: 'put',
    url: '/api/banners/categories',
    data: {
      slug,
      newName,
    }
  })
)

export const deleteBanner = (slug, banner) => (
  fetch({
    method: 'delete',
    url: '/api/banners',
    data: {
      slug,
      banner,
    }
  })
)

export const changeBanner = (slug, banner, data) => (
  fetch({
    method: 'put',
    url: '/api/banners',
    data: {
      slug,
      banner,
      data,
    }
  })
)