export const getAllOrders = () => (
  fetch({
    method: 'get',
    url: '/api/order/all',
  })
)

export const deleteOrder = (orderNumber) => (
  fetch({
    method: 'delete',
    url: `/api/order/${orderNumber}`,
  })
)