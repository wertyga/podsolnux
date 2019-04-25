import axios from 'axios'
import _get from 'lodash/get'
import { isServer } from 'shared/utils/execContext/execContext'
import { config } from 'server/common/config'

export const fetch = ({ serverSide, url, ...props }) => {
  if (serverSide && isServer()) return axios({
    ...props,
    url: `http://localhost:${config.PORT}${url}`,
  });
  if (!isServer()) return axios({ url, ...props });
}

global.fetch = fetch;
global.getError = function(e) {
  const error = _get(e, 'response.data.errors[0]', {});

  return {
    ...error,
    message: error.message || e.message,
  }
}