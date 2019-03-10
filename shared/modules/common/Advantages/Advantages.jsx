import { ServiceTextItem } from 'shared/modules/common'

import './advantages.sass'

export const Advantages = ({ data, itemClassName }) => (
  <div className="advantages">
    {data.map(item => <ServiceTextItem key={item.title} {...item} className={itemClassName} />)}
  </div>
)