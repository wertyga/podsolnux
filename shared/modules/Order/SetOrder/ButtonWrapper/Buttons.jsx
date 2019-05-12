import { useState } from 'react'
import { createPortal } from 'react-dom'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import noop from 'lodash/noop'

import { UploadProgress } from '../UploadProgress'

const TEXT = {
  chooseAll: 'Выбрать все',
  deChooseAll: 'Снять выделение',
  removeAll: 'Удалить все',
  setOrder: 'Оформить заказ',
  setIssue: 'Оформить заказ',
}

export const SetIssueButton = withRouter(({ history, disabled }) => (
  <button
    className="btn primary"
    onClick={() => history.push('/issue-order')}
    disabled={disabled}
  >
    {TEXT.setIssue}
  </button>
))

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

const setOrderBtnComponent = ({ uploadFiles, pendingState, disabled, cancelUpload, targetContainer, onClick }) => {
  const [upload, setUpload] = useState(0)

  const onUploadProgress = data => {
    setUpload(Math.round(data.loaded / (data.total / 100)))
  }

  const setUploadFiles = () => {
    const data = onClick();
    uploadFiles(onUploadProgress, data)
  }

  return (
    <div className="submit-order-btn">
      {pendingState === 'pending' &&
        createPortal(
          <UploadProgress upload={upload} cancelUpload={cancelUpload} />,
          targetContainer || document.body,
        )
      }

      <button
        onClick={setUploadFiles}
        className="btn accent"
        disabled={disabled}
      >
        {TEXT.setOrder}
      </button>
    </div>
  );
}
const setOrderMapState = ({ orderStore: { uploadFiles, pendingState, cancelUpload }, printStore: { setIssueOrder } }) => ({
  uploadFiles,
  pendingState,
  cancelUpload,
  setIssueOrder,
})
export const SetOrderBtn = inject(setOrderMapState)(setOrderBtnComponent)

setOrderBtnComponent.propTypes = {
  uploadFiles: PropTypes.func,
  cancelUpload: PropTypes.func,
  pendingState: PropTypes.string,
  targetContainer: PropTypes.any,
  onClick: PropTypes.func,
}
setOrderBtnComponent.defaultProps = {
  onClick: noop,
}

ChooseAllBtn.propTypes = {
  chooseAll: PropTypes.func,
  unChooseAll: PropTypes.func,
  isChooseAll: PropTypes.bool,
}

RemoveAllBtn.propTypes = {
  removeAll: PropTypes.func,
}