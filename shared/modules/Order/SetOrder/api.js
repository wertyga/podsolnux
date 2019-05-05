export const fetchPrints = () => (
  fetch({
    method: 'get',
    url: '/api/print',
  })
)

export const sendOrder = ({ data, onUploadProgress, id, cancelToken }) => (
  fetch({
    method: 'post',
    url: `/api/order/upload-files/${id || 'none'}`,
    data,
    onUploadProgress,
    cancelToken: cancelToken,
  })
)