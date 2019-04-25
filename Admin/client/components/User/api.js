export const loginUser = (data) => (
  fetch({
    url: '/api/user/login',
    method: 'post',
    data,
  })
)

export const fetchUsers = () => (
  fetch({
    url: '/api/user/all',
    method: 'get',
  })
)