import { inject, observer } from 'mobx-react'

import { Loader, Grid, Message, Segment, Header, List } from 'semantic-ui-react'

import { OrderItem } from './OrderItem'

import './orders.sass'

@inject('orderStore')
@observer
export class AdminOrders extends React.Component {
  constructor(props) {
    super(props)

    const { orderStore: { getAllOrders } } = props
    getAllOrders()

    this.state = {
      show: [],
      error: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ error: '' })
    }
  }

  componentDidMount() {
    const { match: { params: { message } } } = this.props
    if (message) {
      this.setState({ error: { message } })
    }
  }

  handleShow = (date) => this.setState(
    { show: this.state.show.includes(date) ?
      this.state.show.filter(item => item !== date) :
      [...this.state.show, date]
    })

  render() {
    const { show, error: stateError } = this.state
    const { orderStore: { pendingState, orders, error: propsError, deleteOrder } } = this.props
    if (pendingState === 'pending') return <Loader active>Loading...</Loader>
    const error = stateError || propsError

    return (
      <div className="orders">
        <h1>ORDERS</h1>
        {error && <Message error content={error.message}/>}
        <List>
          {Object.entries(orders).map(([date, value]) => (
            <List.Item key={date} className={cn(
              { show: show.includes(date) },
            )}>
              <List.Icon name="folder" />
              <List.Content>
                <List.Header><span onClick={() => this.handleShow(date)}>{date}</span></List.Header>
                <List.Description>

                  {!!value.length && value.map(item => <OrderItem key={item.orderNumber} {...item} deleteOrder={deleteOrder} />)}

                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}