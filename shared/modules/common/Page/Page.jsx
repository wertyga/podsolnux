import { Helmet } from 'react-helmet'

import './page.sass'

export const Page = ({ className, title, description, children }) => (
  <div className={cn(
    'page-wrapper',
    className,
  )}>
    <Helmet>
      {title && <title>{title}</title>}
      {(description || title) && <meta name="description" content={description || title}/>}
    </Helmet>
    {children}
  </div>
);

Page.propTypes = {
  className: PropTypes.any,
  title: PropTypes.string,
  meta: PropTypes.node,
  children: PropTypes.any,
}