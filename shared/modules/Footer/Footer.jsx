import { Link } from 'react-router-dom'
import { inject } from 'mobx-react'

import './footer.sass'

const TEXT = {
  navigation: 'Навигация',
  about: 'О предприятии',
  subscribe: 'Подписка',
}

export const FooterComponent = ({ menuStore: { menuList } }) => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="footer__about footer__elem col-md-4 col-xs-12">
            <h3>{TEXT.about}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Saepe pariatur reprehenderit vero atque, consequatur id ratione, et non dignissimos culpa? Ut veritatis,
              quos illum totam quis blanditiis, minima minus odio!
            </p>
          </div>
          <nav className="footer__navigation footer__elem col-md-4 col-xs-12">
            <h3>{TEXT.navigation}</h3>
            {menuList.filter(item => item.href).map(({ _id, title, href }, i) => {
              return <a key={`${_id}-${i}`} href={href} title={title}>{title}</a>
            })}
          </nav>
          <div className="footer__subscribe footer__elem col-md-4 col-xs-12">
            <h3>{TEXT.subscribe}</h3>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = inject('menuStore')(FooterComponent)