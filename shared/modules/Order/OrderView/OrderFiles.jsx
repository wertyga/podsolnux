import { useState } from 'react'

import { Modal } from 'shared/modules/common'

import { FileItem } from '../SetOrder/FileItem/FileItem'

export const OrderFiles = ({ files }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [imgData, setImgData] = useState('')

  const zoomImage = (imgData) => {
    setModalVisible(!modalVisible)
    setImgData(imgData)
  }

  return (
    <div className="order-view__files">
      <Modal visible={modalVisible} onClick={zoomImage}>
        <img src={imgData} alt="zoomed_image" />
      </Modal>
      {files.map(file => <FileItem key={file.filePath} {...file} id={file._id} zoomImage={zoomImage} disabled />)}
    </div>
  );
}

