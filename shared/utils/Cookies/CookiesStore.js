import Cookies from 'universal-cookie';

export class CookiesStore {
  constructor(initCookies) {
    this.cookies = new Cookies(initCookies);
    const HALF_OF_THE_YEAR = 10368000;
    this.defaultOptions = {
      path: '/',
      maxAge: HALF_OF_THE_YEAR,
    };
  }

  get(name, options = {}) {
    return this.cookies.get(name, options);
  }
  set(name, value, options = this.defaultOptions) {
    this.cookies.set(name, value, { ...options });
    return {
      [name]: value,
    };
  }
  remove(name, options = this.defaultOptions) {
    this.cookies.remove(name, { ...options });
    return name;
  }
  getAll(options = {}) {
    return this.cookies.getAll(options);
  }
}
