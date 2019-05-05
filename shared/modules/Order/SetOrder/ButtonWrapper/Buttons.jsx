import { useState } from 'react'
import { createPortal } from 'react-dom'
import { inject } from 'mobx-react'

import { UploadProgress } from '../UploadProgress'

const TEXT = {
  chooseAll: 'Выбрать все',
  deChooseAll: 'Снять выделение',
  removeAll: 'Удалить все',
  setOrder: 'Заказать',
}

export const ChooseAllBtn = ({ chooseAll, isChooseAll, unChooseAll }) => (
  <button
    onClick={isChooseAll ? unChooseAll : chooseAll}
    className="btn accent"
  >
    {isChooseAll ? TEXT.deChooseAll : TEXT.chooseAll }
  </button>
);

export const RemoveAllBtn = ({ removeAll }) => (
  <button
    onClick={removeAll}
    className="btn negative"
  >
    {TEXT.removeAll}
  </button>
);

const setOrderBtnComponent = ({ uploadFiles, pendingState, disabled, cancelUpload }) => {
  const [upload, setUpload] = useState(0)

  const onUploadProgress = data => {
    setUpload(Math.round(data.loaded / (data.total / 100)))
  }

  const setUploadFiles = () => uploadFiles(onUploadProgress)

  return (
    <div className="submit-order-btn">
      {pendingState === 'pending' &&
        createPortal(
          <UploadProgress upload={upload} cancelUpload={cancelUpload} />,
          document.querySelector('.set-order')
        )
      }

      <button
        onClick={setUploadFiles}
        className="btn primary"
        disabled={disabled}
      >
        {TEXT.setOrder}
      </button>
    </div>
  );
}
const setOrderMapState = ({ orderStore: { uploadFiles, pendingState, cancelUpload } }) => ({
  uploadFiles,
  pendingState,
  cancelUpload,
})
export const SetOrderBtn = inject(setOrderMapState)(setOrderBtnComponent)

setOrderBtnComponent.propTypes = {
  uploadFiles: PropTypes.func,
  cancelUpload: PropTypes.func,
  pendingState: PropTypes.string,
}

ChooseAllBtn.propTypes = {
  chooseAll: PropTypes.func,
  unChooseAll: PropTypes.func,
  isChooseAll: PropTypes.bool,
}

RemoveAllBtn.propTypes = {
  removeAll: PropTypes.func,
}