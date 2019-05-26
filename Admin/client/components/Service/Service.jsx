import { ServiceItem } from './ServiceItem'

import './service.sass'

const mock = [
  {
    _id: '123123',
    serviceSlug: 'Photoprint',
    serviceTitle: 'Photoprint with many formats',
    serviceDescription: 'diasj ld;saj;djas; jd;asj ;d;as klfoiasfiuagsuidagsiudiuasg  asuidgiugdiu iiu aidgi aiud diasj ld;saj;djas; jd;asj ;d;as klfoiasfiuagsuidagsiudiuasg  asuidgiugdiu iiu aidgi aiud diasj ld;saj;djas; jd;asj ;d;as klfoiasfiuagsuidagsiudiuasg  asuidgiugdiu iiu aidgi aiud',
    serviceHref: '/static/photoprint',
    serviceImage: '/images/1.jpeg',
  },
]

export class Service extends React.Component {
  render() {
    return (
      <div className="service">
        {mock.map(item => <ServiceItem key={item._id} {...item} />)}
      </div>
    );
  }
}