import { Fragment } from 'react'

import { Map } from 'shared/modules/common'

const TEXT = {
  phone: 'Телефон',
  email: 'Адрес электронной почты',
  viber: 'Вайбер',
  workTime: 'Время работы',
}

export const AddressItem = ({ coords, address, contacts }) => {
  return (
    <div className="address__item">
      <h3>{address}</h3>

      <div className="address__item__content">
        <Map {...coords} />
        <div className="address__item__side">
          {Object.entries(contacts).map(([key, value]) => {
            switch(key) {
              case('phone'):
                return (
                  <div key={key}>
                    <span>{`${TEXT[key]}:`}</span>
                    <div className="address__item_phone">
                      {value.map(item => <a key={item} href={`tel:${item}`}>{item}</a>)}
                    </div>
                  </div>
                );

              case('workTime'):
                return (
                  <div key={key} className="address__item_work">
                    <span>{`${TEXT[key]}:`}</span>
                    <div>
                      {Object.entries(value).map(([key, value]) => (
                        <div key={key}>
                          <span>{`${key}:`}</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              case('email'):
                return (
                  <div key={key}>
                    <span>{`${TEXT[key]}:`}</span>
                    <a href={`mailto:${value}`}>{value}</a>
                  </div>
                );

              default:
                return (
                  <div key={key}>
                    <span>{`${TEXT[key]}:`}</span>
                    <span>{value}</span>
                  </div>
                );
            }
          })}
        </div>
      </div>
    </div>
  );
}

AddressItem.propTypes = {
  coords: PropTypes.shape({
    lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
  address: PropTypes.string,
  contacts: PropTypes.object,
}