import MobileDetect from 'mobile-detect';
import _get from 'lodash/get';

export const isServer = () => !(typeof window !== 'undefined' && window.document)

export class ExecContextStore {
  constructor(userAgent) {
    let mobileDetect;
    const preparedUserAgent = typeof userAgent === 'string' ? userAgent : ''
    if (isServer()) {
      mobileDetect = new MobileDetect(preparedUserAgent);
    } else {
      // try:to get user-agent from window
      mobileDetect = new MobileDetect(_get(window, 'navigator.userAgent', ''))
    }
    this.requestContext = {
      isMobile: !!mobileDetect.mobile(),
      isClient: !isServer(),
      isServer: isServer(),
    };
  }
}