export const fetchOrder = ({ orderID, userID }) => (
  fetch({
    method: 'get',
    url: `/api/order/${orderID || 'null'}/${userID || 'null'}`,
  })
)