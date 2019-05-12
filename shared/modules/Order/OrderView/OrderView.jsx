import { useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import { withRouter } from 'react-router-dom'

import { Page, Section, Loader, Notify } from 'shared/modules/common'
import { parseQuery } from 'shared/utils'

import { OrderViewInner } from './OrderViewInner'

import './order-veiw.sass'

const TEXT = {
  emptyOrder: 'Заказ не найден',
  headerView: (id) => `Номер заказа: ${id}`,
  headerThanks: 'Спасибо за заказ',
  titleThanks: 'Спасибо  за покупку. Фотостудия "Подсолнух"',
  titleView: 'Просмотр заказа. Фотостудия "Подсолнух"',
}

@inject('orderViewStore')
@observer
export class OrderView extends React.Component {
  static propTypes = {
    orderViewStore: PropTypes.object,
  }

  constructor(props) {
    super(props)

    const { orderViewStore: { getOrder }, location: { search } } = props
    const { orderID } = parseQuery(search)
    getOrder(orderID)
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }

  render() {
    const { orderViewStore: { order, pendingState, error, clearError }, location: { pathname } } = this.props

    const { orderNumber } = order
    const isThanksPage = /thanks/.test(pathname)
    const title = isThanksPage ? TEXT.titleThanks : TEXT.titleView
    const header = isThanksPage ? TEXT.headerThanks : TEXT.headerView(orderNumber)

    return (
      <Page title={title} className="order-view">
        <Section h1={header} h2={isThanksPage && orderNumber && TEXT.headerView(orderNumber)}>
          {!orderNumber && pendingState !== 'pending' && TEXT.emptyOrder}
          {pendingState === 'pending' && <Loader />}
          {error && <Notify type="error" onClose={clearError}>{error.message}</Notify>}

          <OrderViewInner {...order} renderImages={!isThanksPage}/>
        </Section>
      </Page>
    );
  }
}