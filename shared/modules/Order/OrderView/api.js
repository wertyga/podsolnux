export const fetchOrder = orderID => (
  fetch({
    method: 'get',
    url: `/api/order/${orderID}`,
  })
)