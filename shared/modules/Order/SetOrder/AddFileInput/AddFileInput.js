import { useState } from 'react'

import shortId from 'short-id'

import { checkFileType } from 'shared/utils/files'

const TEXT = {
  addFile: 'Добавить файл...',
}

export const AddFileInput = ({ setErrors, setFiles }) => {
  const mainRef = React.createRef()

  const onChangeFiles = ({ target: { files } }) => {
    const arr = []
    const errors = []

    for(let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileErrors = checkFileType(file)
      if (fileErrors.length) {
        errors.push(...fileErrors)
        continue;
      }

      arr.push({
        id: shortId.generate(),
        file,
      })
    }
    if (errors.length) setErrors(errors)

    setFiles(arr)

    mainRef.current.value = ''



    // this.props.addFotoParams(arr)
    //   .then(() => { this.fileInput.value = '' })
  };

  return (
    <div className="add-file">
      <label htmlFor="file-input" className="btn accent">{TEXT.addFile}</label>
      <input
        ref={mainRef}
        multiple={true}
        type="file"
        id="file-input"
        style={{ display: 'none'}}
        onChange={onChangeFiles}
      />
    </div>
  );
}

AddFileInput.propTypes = {
  setErrors: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired,
}