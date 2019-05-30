import { Link } from 'react-router-dom'

import './ServiceTextItem.sass'

const TEXT = {
  learnMore: 'Узнать больше',
}

export const ServiceTextItem = ({ title, description, href, linkDescription, className, Icon }) => {
  return (
    <Link className={
      cn(
        'service-item',
        className,
      )
    }
          to={href} title={linkDescription || title}
    >
      {Icon() &&
        <div className="service-item__icon">
          <Icon />
        </div>
      }
      <main>
        <h4>{title}</h4>
        <p>{description}</p>
        <p className="learn-more">{TEXT.learnMore}</p>
      </main>
    </Link>
  );
}
ServiceTextItem.defaultProps = {
  Icon: () => null,
}
