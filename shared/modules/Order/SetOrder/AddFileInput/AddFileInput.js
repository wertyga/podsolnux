import { useState } from 'react'

import shortId from 'short-id'

import { checkFileType } from 'shared/utils/files'

const TEXT = {
  addFile: 'Добавить файл...',
}

export const AddFileInput = ({ setErrors, setFiles }) => {
  const mainRef = React.createRef()

  const onChangeFiles = ({ target: { files, value } }) => {
    const arr = []
    const errors = []
    // let availablePaper = this.props.fotoParams.find(item => item.paperType.find(type => type.value === true));
    for(let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileErrors = checkFileType(file)
      if (fileErrors.length) {
        errors.push(...fileErrors)
        continue;
      }
      // const fileType = files[i].name.split('.')[1].toLowerCase();
      // if(files[i].size < 10 ** 9 && (images.indexOf(fileType) !== -1 || archives.indexOf(fileType) !== -1)) {
      //   const fileObj = {
      //     id: shortId.generate(),
      //     file: e.target.files[i],
      //     fileType: e.target.files[i].name.split('.')[1].toLowerCase(),
      //     format: availablePaper ? availablePaper.title : '',
      //     paper: availablePaper ? availablePaper.paperType[0].title : '',
      //     amount: 1
      //   };
      //   arr.push(fileObj);
      // }
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