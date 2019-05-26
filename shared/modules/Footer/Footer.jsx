import { Fragment } from 'react'
import { inject } from 'mobx-react'

import { EmailSubscription } from 'shared/modules/common/EmailSubscription'

import { addresses } from 'shared/modules/Address/Address'

import './footer.sass'

const TEXT = {
  navigation: 'Навигация',
  about: 'О предприятии',
  subscribe: 'Подписка',
  descriptionSubscription: 'Вы можете подписаться на наши новости',
  address: 'Адрес:',
  workTime: 'Режим работы:',
}

export const FooterComponent = ({ menuStore: { menuList } }) => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="footer__about footer__elem col-md-4 col-xs-12">
            <h3>{TEXT.about}</h3>
            <div className="footer__address">

              <div className="footer__address__item">
                <h4>{TEXT.address}</h4>
                {Object.values(addresses).map(({ address }) => <p key={address}>{address}</p>)}
              </div>

              <div className="footer__address__item">
                <h4>{TEXT.workTime}</h4>
                {Object.values(addresses).map(({ contacts: { workTime } }) => (
                  Object.entries(workTime).map(([key, value]) => (
                    <div key={key}>
                      <span>{`${key}: `}</span>
                      <span>{value}</span>
                    </div>
                  ))
                ))}
              </div>
            </div>
          </div>
          <nav className="footer__navigation footer__elem col-md-4 col-xs-12">
            <h3>{TEXT.navigation}</h3>
            {menuList.filter(item => item.href).map(({ _id, title, href }, i) => {
              return <a key={`${_id}-${i}`} href={href} title={title}>{title}</a>
            })}
          </nav>
          <div className="footer__subscribe footer__elem col-md-4 col-xs-12">
            <h3>{TEXT.subscribe}</h3>

            <EmailSubscription
              text={TEXT.descriptionSubscription}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = inject('menuStore')(FooterComponent)