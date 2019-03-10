import { ServicePreview } from 'shared/modules/common'

export const ServiceHomePreview  = ({ data, itemClassName}) => (
  <div className="home__services">
    {data.map(item => <ServicePreview key={item.title} {...item} className={cn(
      'col-lg-4 col-xs-12 col-sm-12',
    )}/>)}
  </div>
)