export const fetchPrints = () => (
  fetch({
    method: 'get',
    url: '/api/print',
  })
)

export const addNewPrint = (data) => (
  fetch({
    method: 'post',
    url: '/api/print',
    data,
  })
)

export const editPrint = ({ id, data }) => (
  fetch({
    method: 'put',
    url: '/api/print',
    data: {
      id,
      data,
    },
  })
)

export const deletePrint = ({ id }) => (
  fetch({
    method: 'delete',
    url: '/api/print',
    data: {
      id,
    },
  })
)