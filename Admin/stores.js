import { observable } from 'mobx';

import { UserStore } from 'admin/client/components/User'
import { PricesStore, PrintStore } from 'admin/client/components/Prices'
import { BannersStore } from 'shared/utils/Banners'
import { OrderStore } from 'admin/client/components/Orders'

class RootStore {
  stores = new Map();

  @observable.ref location;

  set(storeName, store) {
    store.rootStore = this;
    this.stores.set(storeName, store);
    return this;
  }

  get(storeName) {
    return this.stores.get(storeName);
  }

  register() {
    this.stores.forEach((store) => {
      store.register && store.register(this);
    });
  }

  toProps() {
    const props = { rootStore: this };
    this.stores.forEach((value, key) => {
      props[key] = value;
    });
    return props;
  }

  set history(history) {
    this.pHistory = history;
  }

  get history() {
    return this.pHistory;
  }
}

const STORES = {
  UserStore,
  BannersStore,
  PricesStore,
  PrintStore,
  OrderStore,
};

export const initStore = (initState = {}, history) => {
  const rootStore = new RootStore();
  rootStore.history = history;

  Object.entries(STORES).forEach(([key, StoreClass]) => {
    const storeName = `${key.charAt(0).toLocaleLowerCase()}${key.slice(1)}`;
    const instance = new StoreClass(initState[storeName] || {});
    rootStore.set(storeName, instance);
  });

  const initRootStore = rootStore.register.bind(rootStore);
  initRootStore();

  return { rootStore, initRootStore };
};
