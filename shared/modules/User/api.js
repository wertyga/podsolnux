export const sendSubscribe = (email) => (
  fetch({
    url: '/api/user/set-subscription',
    method: 'post',
    data: {
      email,
    },
  })
)

export const auth = ({ isRegistry, ...user }) => {
  const url = isRegistry ? '/api/user/registry' : '/api/user/login'
  return (
    fetch({
      url,
      method: 'post',
      data: {
        ...user,
      },
    })
  );
}

export const getUser = (id) => (
  fetch({
    serverSide: true,
    url: '/api/user/get-user',
    method: 'get',
    params: {
      id,
    },
  })
);

export const verifyUser = (id) => (
  fetch({
    serverSide: true,
    url: '/api/user/verify-user',
    method: 'post',
    data: {
      id,
    },
  })
);