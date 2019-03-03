import { Link } from 'react-router-dom'

import './ServicePreview.sass'

export class ServicePreview extends React.Component {
  render() {
    const { description, title, href, img, alt, className } = this.props;
    return (
      <div
        className={cn(
          'service-preview',
          className,
        )}
      >
        <Link to={href || '#'}>
          <img src={img} alt={alt || title} />
          <div className="service-preview__description">
            <h4>{title}</h4>
            <div className="service-preview__short-description">
              {description}
            </div>
          </div>
        </Link>
      </div>
    );
  }
}