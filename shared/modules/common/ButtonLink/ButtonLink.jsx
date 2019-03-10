import { Link } from 'react-router-dom'

import './button-link.sass'

export const ButtonLink = ({ href, title }) => (
  <Link to={href} title={title} className="button-link">
    {title}
  </Link>
)