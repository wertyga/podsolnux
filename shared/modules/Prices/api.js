export const fetchPricesList = (category = '') => (
  fetch({
    serverSide: true,
    method: 'get',
    url: '/api/prices',
    params: {
      category,
    }
  })
)