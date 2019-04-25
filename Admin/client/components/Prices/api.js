export const fetchPricesList = (category) => (
  fetch({
    method: 'get',
    url: '/api/prices',
    params: {
      category,
    },
  })
)

export const addNewPrice = (data) => (
  fetch({
    method: 'post',
    url: '/api/prices',
    data,
  })
)

export const editPrice = ({ id, data }) => (
  fetch({
    method: 'put',
    url: '/api/prices',
    data: {
      id,
      data,
    },
  })
)

export const deletePrice = ({ id }) => (
  fetch({
    method: 'delete',
    url: '/api/prices',
    data: {
      id,
    },
  })
)