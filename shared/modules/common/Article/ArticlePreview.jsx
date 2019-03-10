import { Link } from 'react-router-dom'

import { getBuitifulDate } from 'shared/utils'

import './article.sass'

export const ArticlePreview = ({ img, title, author, time, topic, description, className, href, topicHref }) => (
  <div className={cn(
    'article-preview',
    className,
  )}>
    <img src={img} alt={title} />

    <div className="article-preview__content">
      <h2>
        <Link to={href || '/'}>{title}</Link>
      </h2>

      <div className="article-preview__subtitle">
        <span>{author}</span>
        <span className="disc"/>
        <span>{getBuitifulDate(time)}</span>
        <span className="disc"/>
        <Link to={topicHref || '/'}>{topic}</Link>
      </div>
    </div>

    <div className="article-preview__description">
      {description}
    </div>

  </div>
)

ArticlePreview.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  time: PropTypes.string,
  topic: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.any,
  href: PropTypes.string,
  topicHref: PropTypes.string,
}