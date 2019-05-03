import { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { createPortal } from 'react-dom'

import { Page, Section, Loader, Notify, Modal } from 'shared/modules/common'

import { AddFileInput } from './AddFileInput/AddFileInput'
import { FileItem } from './FileItem'
import { FormatHelper } from './FormatHelper'

import './set-order.sass'

const TEXT = {
  title: 'Сделать заказ. Фотостудия "Подсолнух"',
  noFileChooseError: 'Не выбрано ни одного файла ',
};

@inject('printStore')
@observer
export class SetOrder extends React.Component {
  constructor(props) {
    super(props)

    props.printStore.getPrintPrices()

    this.state = {
      errors: [],
      checkedFiles: [],
      modalVisible: false,
      imgData: '',
    }
  }

  setErrors = errors => this.setState({ errors })

  clearStateErrors = () => this.setState({ errors: [] })

  onCheck = id => {
    if (!this.state.checkedFiles.includes(id)) {
      this.setState({ checkedFiles: [...this.state.checkedFiles, id] })
    } else {
      this.setState({ checkedFiles: this.state.checkedFiles.filter(item => item !== id) })
    }
  }

  setFileData = ({ title, paperType }) => {
    const { checkedFiles } = this.state
    const { printStore: { updateFile } } = this.props
    if (!checkedFiles.length) {
      this.setState({ errors: [TEXT.noFileChooseError] })
      return false;
    }
    updateFile({ ids: checkedFiles, title, paperType })
    this.setState({ checkedFiles: [] })
    return true;
  }

  closeFile = (id) => {
    const { printStore: { deleteFile } } = this.props
    deleteFile(id)
  }

  zoomImage = (imgData) => this.setState({ modalVisible: !this.state.modalVisible, imgData })

  render() {
    const { printStore: { pendingState, clearError, error, prints, files, setFiles } } = this.props
    const { errors: stateErrors, checkedFiles, modalVisible, imgData } = this.state
    return (
      <Page
        className="set-order"
        title={TEXT.title}
      >
        {!!prints.length &&
          createPortal(
            <Fragment>
              <FormatHelper
                prints={prints}
                setFileData={this.setFileData}
                errorNode={
                  <div>
                    {!!stateErrors.length &&
                    <Notify type="error" onClose={this.clearStateErrors}>
                      <ul>
                        {stateErrors.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </Notify>
                    }
                  </div>
                }
              />
            </Fragment>,
            document.getElementsByClassName('main-menu')[0]
          )
        }
        {error && <Notify type="error" onClose={clearError}>{error.message}</Notify>}

        <Modal visible={modalVisible} onClick={this.zoomImage}>
          <img src={imgData} alt="zoomed_image" />
        </Modal>

        {pendingState === 'pending' && <Loader />}
        <Section grey fluid>
          <AddFileInput
            setErrors={this.setErrors}
            setFiles={setFiles}
          />

          <div className="set-order__content">
            {files.map(item => (
              <FileItem
                key={item.id}
                {...item}
                isChecked={checkedFiles.includes(item.id)}
                onCheck={this.onCheck}
                onClose={this.closeFile}
                zoomImage={this.zoomImage}
              />
            ))}
          </div>
        </Section>
      </Page>
    );
  }
}