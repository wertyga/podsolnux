import { useState } from 'react'
import Close from 'react-icons/lib/fa/times-circle'
import Check from 'react-icons/lib/fa/check-circle'

import { TEXT } from './FormatHelper'

const { prints } = TEXT
const fileName = 'Имя файла:'

export const FileItem = ({ file, id, title, paperType, price, isChecked = false, onCheck, onClose, zoomImage }) => {
  const [fileData, setFileData] = useState('')
  let fr = new FileReader();
  fr.readAsDataURL(file);
  fr.onload = () => {
    setFileData(fr.result)
  };

  const handleCheck = (e) => {
    e.stopPropagation()
    onCheck(id)
  }
  const handleClose = (e) => {
    e.stopPropagation()
    onClose(id)
  }

  const handleZoomImage = () => zoomImage(fileData)

  const { name } = file;

  return (
    <div className="file-item" role="presentation" onClick={handleZoomImage}>
      {!!fileData && <img className="file-item__img" src={fileData} alt={name} />}
      <Check
        className={cn(
          'file-item__check',
          { 'is-checked': isChecked }
        )}
        onClick={handleCheck}
      />
      <Close onClick={handleClose} className="file-item__close" />

      <div className="file-item__description">
        <div className="file-item__description__item file-item__description__item_name">
          <span>{fileName}</span>
          <span>{name}</span>
        </div>
        <div className="file-item__description__item">
          <span>{`${prints.title}:`}</span>
          <span>{title || '-'}</span>
        </div>
        <div className="file-item__description__item">
          <span>{`${prints.paperType}:`}</span>
          <span>{paperType || '-'}</span>
        </div>
        <div className="file-item__description__item">
          <span>{`${prints.price}:`}</span>
          <span>{price || '-'}</span>
        </div>
      </div>
    </div>
  );
}

FileItem.propTypes = {
  file: PropTypes.object,
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
  paperType: PropTypes.string,
  price: PropTypes.string,
  isChecked: PropTypes.bool,
  onCheck: PropTypes.func,
  onClose: PropTypes.func,
}