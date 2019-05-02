export const fetchPrints = () => (
  fetch({
    method: 'get',
    url: '/api/print',
  })
)