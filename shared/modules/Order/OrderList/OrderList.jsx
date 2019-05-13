import { inject, observer } from 'mobx-react'

import { Loader } from 'shared/modules/common'

import { OrderListItem } from './OrderListItem'

import './order-list.sass'

const TEXT = {
  header: 'Список заказов',
  emptyList: 'У вас еще нет сохраненных заказов',
}

@inject('orderListStore')
@observer
export class OrderList extends React.Component {
  static propTypes = {
    orderListStore: PropTypes.object,
  }

  constructor(props) {
    super(props)

    props.orderListStore.getOrdersList()
  }

  render() {
    const { orderListStore: { pendingState, orders } } = this.props;

    if (pendingState === 'pending') return <Loader />;
    return (
      <div className="order-list">
        {!orders.length && <h2>{TEXT.emptyList}</h2>}
        {orders.map(item => <OrderListItem key={item._id} {...item} />)}
      </div>
    );
  }
}