import { Page, Section } from 'shared/modules/common'

import { AddressItem } from './AddressItem'

import './address.sass'

const TEXT = {
  title: 'Адрес. Фотостудия "Подсолнух"',
  header: 'Адрес',
}

export const addresses = {
  levkova: {
    coords: {
      lat: 53.8814256,
      lng: 27.5539121
    },
    address: 'г. Минск, ул. Левкова, 8/2',
    contacts: {
      phone: ['+375 29 334 09 86'],
      email: 'fotopodsolnux@gmail.com',
      viber: '123123',
      workTime: {
        'Пн.-Пт.': '10:00 - 19:00',
        'Сб.': '10:00 - 17:00',
      },
    },
  },
}

export class Address extends React.Component {
  render() {
    return (
      <div className="address">
        <Page title={TEXT.title}>
          <Section h1={TEXT.header} grey>
            {Object.entries(addresses).map(([key, value]) => (
              <AddressItem key={key} {...value} />
            ))}
          </Section>
        </Page>
      </div>
    );
  }
}