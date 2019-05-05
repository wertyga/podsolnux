import { useState } from 'react'

import { Loader } from 'shared/modules/common'

const TEXT = {
  cancel: 'Отмена',
}

export const UploadProgress = ({ upload, cancelUpload }) => (
  <div className="upload">
    <Loader>
      <p>{`${upload}%`}</p>
      <button className="btn accent" onClick={cancelUpload}>{TEXT.cancel}</button>
    </Loader>
  </div>
);