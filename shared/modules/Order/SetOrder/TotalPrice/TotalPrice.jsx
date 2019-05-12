import { createPortal } from 'react-dom'

import { inject, observer } from 'mobx-react'

import MinusSquare from 'react-icons/lib/fa/minus-square'
import PlusSquare from 'react-icons/lib/fa/plus-square'

import './totalPrice.sass'

export const TEXT = {
  totalPrice: 'Итовая цена: ',
  currency: 'руб.',
  archives: 'Архивы: ',
  priceWithArchives: 'Итоговая цена без учета файлов в архивах: ',
}

const mapState = ({ printStore: { getTotalPrice }, execContextStore: { requestContext: { isMobile } } }) => (
  {
    getTotalPrice,
    isMobile,
  }
)

@inject(mapState)
@observer
export class TotalPrice extends React.Component {
  static propTypes = {
    getTotalPrice: PropTypes.func.isRequired,
    isMobile: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.getPrices(props)

    this.state = {
      open: !this.props.isMobile,
    }
  }

  componentWillReceiveProps() {
    this.getPrices()
  }

  getPrices = (props = this.props) => {
    const { totalPrice, filesObj, archiveFiles } = props.getTotalPrice()
    this.totalPrice = totalPrice
    this.filesObj = filesObj
    this.archiveFiles = archiveFiles
  }

  handleOpen = () => {
    if (!this.props.isMobile) return;

    this.setState({ open: !this.state.open })
  }

  getOpenIcon = () => {
    const { isMobile, getTotalPrice } = this.props
    if (!isMobile) return null;

    const { totalPrice, archiveFiles } = getTotalPrice()

    if (!totalPrice && !archiveFiles.length) return null;

    return this.state.open ? <MinusSquare onClick={this.handleOpen} /> : <PlusSquare onClick={this.handleOpen} />;
  }

  getContent = () => {
    const { open } = this.state
    const { isMobile, getTotalPrice } = this.props

    if (isMobile && !open) return null;

    const { totalPrice, filesObj, archiveFiles } = getTotalPrice()

    return (
      <div className="total-price__content">
        {!!totalPrice &&
        <ul className="total-price__list">
          {Object.entries(filesObj).map(([key, value]) => (
            <li key={key}>
              <span>{`${key}:`}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
        }

        {!!archiveFiles.length &&
        <div className="total-price__archives">
          <span className="total-price__archives_header">{TEXT.archives}</span>
          {archiveFiles.map(item => <span key={item} className="total-price__archives_item">{item}</span>)}
        </div>
        }

        {!!totalPrice &&
        <div className="total-price__final-price">
          <span>{`${TEXT.totalPrice}`}</span>
          <span>{`${totalPrice} ${TEXT.currency}`}</span>
        </div>
        }
      </div>
    );
  }

  render() {
    const { open } = this.state
    const { isMobile, getTotalPrice } = this.props
    const { totalPrice, archiveFiles } = getTotalPrice()

    if (!totalPrice && !archiveFiles.length) return null;

    return (
      <div className={cn(
        'total-price',
        { open: isMobile && open }
      )}>
        {this.getOpenIcon()}
        {this.getContent()}
      </div>
    );
  }
}