export const fetchPricesList = () => (
  fetch({
    serverSide: true,
    method: 'get',
    url: '/api/prices',
  })
)