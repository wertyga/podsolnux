import { inject, observer } from 'mobx-react'

import { Section, Loader, Page, Notify } from 'shared/modules/common'

import './prices-page.sass'

const TEXT = {
  description: 'Цена на услуги и товара фотостудии "Подсолнух"',
  title: 'Цены на товары и услуги',
}

@inject('pricesStore')
@observer
export class PricesPage extends React.Component {
  constructor(props) {
    super(props)

    const { getPricesList } = props.pricesStore
    getPricesList();
  }

  render() {
    const { pricesStore: { error, prices, pendingState, clearError } } = this.props;

    if (pendingState === 'pending') return <Page><Loader /></Page>
    return (
      <Page className="prices-page" title={TEXT.description}>
        {error && <Notify type="error" onClose={clearError}>{error.message}</Notify>}

        {Object.entries(prices).map(([key, value], i) => {
          return (
            <Section className="prices-page__content" grey={(i % 2) < 1} fluid h2={key} key={key}>
              {value.map(({ name, value, _id }) => (
                <div className="col-xs-12 prices-page__content__item" key={_id}>
                  <div className="col-xs-6">{name}</div>
                  <div className="col-xs-6">{value}</div>
                </div>
              ))}
            </Section>
          );
        })}
      </Page>
    );
  }
}