// import jwt from 'jsonwebtoken';
import axios from 'axios';

// import clientConfig from '../../../server/common/clientConfig';

export function Transport (opt) {
  let {
    user,
    files,
    // maxFileSize,
    sendFiles,
    uploadProgress,
    // self,
    orderName,
    contacts,
  } = opt;

  return {
    onSubmit() {
      this.formData = new FormData();

      for(let i = 0; i < files.length; i++) {
        if(files[i].file) {
          this.formData.append(files[i].file);
        } else {
          this.formData.append(files[i].name)
        };
      };

      return this._sendFiles({ data: this.formData })
    },

    _sendFiles(opt) {
      let cancelToken = axios.CancelToken;
      this._source = cancelToken.source();

      return sendFiles({
        // orderName,
        user,
        contacts,
        data: opt.data,
        onUploadProgress(e) {
          return uploadProgress(e)
        },
        cancelToken: this._source.token
      })
    }
  }
};