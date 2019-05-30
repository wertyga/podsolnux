import { inject } from 'mobx-react'
import { Link } from 'react-router-dom'

import './ServicePreview.sass'

const MAX_DESCRIPTION_WIDTH = 90

const mapState = ({ execContextStore: { requestContext: { isMobile } } }) => ({ isMobile })

@inject(mapState)
export class ServicePreview extends React.Component {
  getDescription = () => {
    const { isMobile, description } = this.props

    if (!isMobile || description.length <= MAX_DESCRIPTION_WIDTH) return description;

    return `${description.slice(0, MAX_DESCRIPTION_WIDTH).split(' ').slice(0, -1).join(' ')} ...`
  }

  render() {
    const { title, href, img, alt, className, createdAt, right } = this.props;

    const date = createdAt.toLocaleString().split(':').slice(0, -1).join(':')

    return (
      <Link
        className={cn(
          'service-preview',
          { 'service-preview_right': right },
          className,
        )}
        to={href || '#'}
      >
        <div className="service-preview__image">
          <img src={img} alt={alt || title} />
        </div>
        <div className="service-preview__description">
          <h4>{title}</h4>
          <div className="service-preview__short-description">
            {this.getDescription()}
          </div>
          <div className="service-preview__date">{date}</div>
        </div>
      </Link>
    );
  }
}