import { Link } from 'react-router-dom'

import './ServiceTextItem.sass'

const TEXT = {
  learnMore: 'Узнать больше',
}

export const ServiceTextItem = ({ title, description, href, linkDescription, className, Icon }) => {
  return (
    <div className={
      cn(
        'service-item',
        className,
      )
    }>
      {Icon() &&
        <div className="service-item__icon">
          <Icon />
        </div>
      }
      <main>
        <h4>{title}</h4>
        <p>{description}</p>
        <Link to={href} title={linkDescription || title}>{TEXT.learnMore}</Link>
      </main>
    </div>
  );
}
ServiceTextItem.defaultProps = {
  Icon: () => null,
}
