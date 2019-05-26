import { Link } from 'react-router-dom'

export const ServiceItem = ({ serviceImage, serviceDescription, serviceTitle, serviceSlug }) => {
  return (
    <Link className="service__item" to={`/service/${serviceSlug}`}>
      <img src={serviceImage} alt="service-image"/>
      <div className="service__item__content">
        <p className="title">{serviceTitle}</p>
        <p className="description">{serviceDescription}</p>
      </div>
    </Link>
  );
}