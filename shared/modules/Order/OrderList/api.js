export const getOrdersList = (userID) => (
  fetch({
    method: 'get',
    url: `/api/order/list/${userID}`,
  })
)