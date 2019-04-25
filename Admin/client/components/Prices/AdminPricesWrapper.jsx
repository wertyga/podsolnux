import { inject, observer } from 'mobx-react'

import { List, Loader, Message } from 'semantic-ui-react'

import { AddNewWrapper } from './AddNewWrapper'
import { PricesItem } from './PricesItem'

import './prices.sass'

const mapState = ({ pricesStore: { prices, getPricesList, pendingState, error, editPrice, deletePrice } }) => ({
  prices,
  getPricesList,
  pendingState,
  error,
  editPrice,
  deletePrice,
})

@inject(mapState)
@observer
export class AdminPricesWrapper extends React.Component {
  static propTypes = {
    prices: PropTypes.object.isRequired,
    getPricesList: PropTypes.func.isRequired,
    deletePrice: PropTypes.func.isRequired,
    editPrice: PropTypes.func.isRequired,
    pendingState: PropTypes.string,
    error: PropTypes.any,
  }

  constructor(props) {
    super(props)

    props.getPricesList('all')
  }

  render() {
    const { pendingState, error, prices, editPrice, deletePrice } = this.props
    const isLoading = pendingState === 'pending'

    if (isLoading) return <Loader active>Loading...</Loader>
    return (
      <div className="prices-wrapper">
        <h1>Prices</h1>

        {error &&
          <Message
            error
            header="Error"
            content={error.message}
          />
        }

        <List
          divided
          verticalAlign='middle'
          className="prices-wrapper__list"
        >
          {Object.entries(prices).map(([key, value]) => {
            if (!value.length) return null;

            return (
              <PricesItem
                key={key}
                list={value}
                title={key}
                editPrice={editPrice}
                deletePrice={deletePrice}
              />
            );
          })}

          <List.Item
            className="prices-wrapper__list-item"
          >
            <AddNewWrapper />
          </List.Item>
        </List>
      </div>
    );
  }
}