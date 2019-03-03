import { ServiceTextItem } from 'shared/modules/common/ServiceTextItem'

import './style/Advantages.sass'

export const Advantages = ({ data, itemClassName }) => (
  <div className="home__advantages">
    {data.map(item => <ServiceTextItem key={item.title} {...item} className={itemClassName} />)}
  </div>
)