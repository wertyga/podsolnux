import jsonStringifySafe from 'json-stringify-safe';
import { toJS } from 'mobx';

export const dehydrate = data => jsonStringifySafe(
  toJS(data, true),
);

export const dehydrateRootStore = rootStore =>
  dehydrate(
    [...rootStore.stores].reduce((data, [storeKey, storeData]) => ({
      ...data,
      [storeKey]: {
        ...storeData,
        rootStore: undefined,
      },
    }), {}),
  );

export const rehydrate = () => window.__PRELOADED_STATE__; // eslint-disable-line
