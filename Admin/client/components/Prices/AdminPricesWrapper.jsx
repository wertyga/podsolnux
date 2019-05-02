import { inject, observer } from 'mobx-react'

import { List, Loader, Message } from 'semantic-ui-react'

import { AddNewWrapper } from './AddNewWrapper'
import { PricesItem } from './PricesItem'

import './prices.sass'

class AdminPricesWrapperComponent extends React.Component {
  static propTypes = {
    prices: PropTypes.object.isRequired,
    getPricesList: PropTypes.func.isRequired,
    deletePrice: PropTypes.func.isRequired,
    editPrice: PropTypes.func.isRequired,
    pendingState: PropTypes.string,
    error: PropTypes.any,
    print: PropTypes.bool,
    addNewPendingState: PropTypes.string,
    addNewPrice: PropTypes.func.isRequired,
    categories: PropTypes.array,
  }

  constructor(props) {
    super(props)

    const isPrintCategory = props.print;
    props.getPricesList(isPrintCategory ? 'print' : 'all')
    this.addNewFields = isPrintCategory && ['name', 'paperType', 'price'];
  }

  render() {
    const { pendingState, error, prices, editPrice, deletePrice, print, addNewPendingState, addNewPrice, categories } = this.props
    const isLoading = pendingState === 'pending'

    if (isLoading) return <Loader active>Loading...</Loader>
    return (
      <div className="prices-wrapper">
        <h1>{!print ? 'Prices' : 'Print prices'}</h1>

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
            <AddNewWrapper
              isOneCategory={print}
              addNewPendingState={addNewPendingState}
              addNewPrice={addNewPrice}
              categories={categories}
              fields={this.addNewFields}
            />
          </List.Item>
        </List>
      </div>
    );
  }
}

const mapState = ({ pricesStore:
  { prices,
    getPricesList,
    pendingState,
    error,
    editPrice,
    deletePrice,
    addNewPendingState,
    addNewPrice,
    categories,
  } }) => ({
  prices,
  getPricesList,
  pendingState,
  error,
  editPrice,
  deletePrice,
  addNewPrice,
  addNewPendingState,
  categories,
})

const mapPrintState = ({ printStore:
  { printPrices,
    getPrintPrices,
    pendingState,
    error,
    editPrint,
    deletePrint,
    addNewPendingState,
    addNewPrint,
  } }) => ({
  prices: printPrices,
  getPricesList: getPrintPrices,
  pendingState,
  error,
  editPrice: editPrint,
  deletePrice: deletePrint,
  addNewPrice: addNewPrint,
  addNewPendingState,
  categories: ['print'],
  print: true,
})

export const AdminPricesWrapper = inject(mapState)(observer(AdminPricesWrapperComponent))
export const AdminPricesPrint = inject(mapPrintState)(observer(AdminPricesWrapperComponent))