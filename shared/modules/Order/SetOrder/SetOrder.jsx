import { inject, observer } from 'mobx-react'
import { createPortal } from 'react-dom'

import { Page, Section, Loader, Notify } from 'shared/modules/common'

import { AddFileInput } from './AddFileInput/AddFileInput'
import { FileItem } from './FileItem'
import { FormatHelper } from './FormatHelper'

import './set-order.sass'

const TEXT = {
  title: 'Сделать заказ. Фотостудия "Подсолнух"',
};

@inject('printStore')
@observer
export class SetOrder extends React.Component {
  constructor(props) {
    super(props)

    props.printStore.getPrintPrices()

    this.state = {
      errors: [],
    }
  }

  setErrors = errors => this.setState({ errors })

  clearStateErrors = () => this.setState({ errors: [] })

  render() {
    const { printStore: { pendingState, clearError, error, prints, files, setFiles } } = this.props
    const { errors: stateErrors } = this.state

    return (
      <Page
        className="set-order"
        title={TEXT.title}
      >
        {!!prints.length &&
          createPortal(
            <FormatHelper prints={prints} className="set-order__format-helper"/>,
            document.getElementsByClassName('main-menu')[0]
          )
        }
        {error && <Notify type="error" onClose={clearError}>{error.message}</Notify>}
        {!!stateErrors.length &&
          <Notify type="error" onClose={this.clearStateErrors}>
            <ul>
              {stateErrors.map(item => <li key={item}>{item}</li>)}
            </ul>
          </Notify>
        }
        {pendingState === 'pending' && <Loader />}
        <Section grey fluid>
          <AddFileInput
            setErrors={this.setErrors}
            setFiles={setFiles}
          />

          <div className="set-order__content">
            {files.map(item => <FileItem key={item.id} {...item} />)}
          </div>
        </Section>
      </Page>
    );
  }
}