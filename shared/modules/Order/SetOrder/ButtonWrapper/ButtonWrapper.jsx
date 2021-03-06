import { AddFileInput } from '../AddFileInput/AddFileInput'
import { ChooseAllBtn, RemoveAllBtn, SetIssueButton } from './Buttons'

export const ButtonWrapper = ({ setErrors, setFiles, chooseAll, files, checkedFiles, unChooseAll, removeAll }) => {
  const isNotAllSelected = files.find(({ id }) => !checkedFiles.includes(id))
  const isNotAllFilesSetFormat = files.filter(({ format }) => !format).length

  return (
    <div className="set-order__button-wrapper">
      <AddFileInput
        setErrors={setErrors}
        setFiles={setFiles}
      />
      {!!files.length && <SetIssueButton disabled={isNotAllFilesSetFormat} />}
      {!!files.length &&
        <div className="common-buttons">
          <ChooseAllBtn
            chooseAll={chooseAll}
            isChooseAll={!isNotAllSelected}
            unChooseAll={unChooseAll}
          />
          <RemoveAllBtn removeAll={removeAll} />
        </div>
        }
    </div>
  );
}

ButtonWrapper.propTypes = {
  setErrors: PropTypes.func,
  setFiles: PropTypes.func,
  chooseAll: PropTypes.func,
  unChooseAll: PropTypes.func,
  removeAll: PropTypes.func,
  files: PropTypes.array,
  checkedFiles: PropTypes.array,
}