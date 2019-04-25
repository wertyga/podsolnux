export const parseQuery = (search) => (
  search.replace('?', '').split('&').reduce((a, b) => {
    const [key, value] = b.split('=');
    return {
      ...a,
      [key]: value,
    }
  }, {})
)