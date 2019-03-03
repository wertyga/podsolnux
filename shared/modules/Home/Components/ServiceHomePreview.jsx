import { ServicePreview } from 'shared/modules/common/ServicePreview'

export const ServiceHomePreview  = ({ data, itemClassName}) => (
  <div className="home__services">
    {data.map(item => <ServicePreview key={item.title} {...item} className={itemClassName}/>)}
  </div>
)