

export const fetchPrints = () => (
  fetch({
    method: 'get',
    url: '/api/print',
  })
)

export const sendOrder = ({ data, onUploadProgress, cancelToken }) => {
  return (
    fetch({
      method: 'post',
      url: '/api/order/upload-files',
      data,
      onUploadProgress,
      cancelToken: cancelToken,
    })
  );
}

export const issueOrder = ({ userID = '', data }) => (
  fetch({
    method: 'post',
    url: '/api/order/issue-order',
    data: { userID, ...data },
  })
)