import { useState } from 'react'

import { Loader } from 'shared/modules/common'

export const FileItem = ({ file }) => {
  const [fileData, setFileData] = useState('')
  let fr = new FileReader();
  fr.readAsDataURL(file);
  fr.onload = () => {
    setFileData(fr.result)
  };

  const { name } = file;
  return (
    <div className="file-item">
      {!!fileData && <img className="file-item__img" src={fileData} alt={name} />}
    </div>
  );
}