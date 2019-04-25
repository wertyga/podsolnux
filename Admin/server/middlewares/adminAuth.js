export const authCheck = (req, res, next) => {
  const loginUrl = '/login';
  const { url, session } = req;

  if (url === loginUrl) return next();
  if(session.isAdmin) {
    next();
  } else {
    res.redirect('/login')
  }
};