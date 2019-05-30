import { Helmet } from 'react-helmet'

import './page.sass'

export class Page extends React.Component {

  componentDidMount() {
    if (typeof window === 'undefined') return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  render() {
    const { className, title, description, children, style = {} } = this.props
    return (
      <div className={cn(
        'page-wrapper',
        className,
      )}
           style={style}
      >
        <Helmet>
          {title && <title>{title}</title>}
          {(description || title) && <meta name="description" content={description || title}/>}
        </Helmet>
        {children}
      </div>
    );
  }
}

Page.propTypes = {
  className: PropTypes.any,
  title: PropTypes.string,
  meta: PropTypes.node,
  children: PropTypes.any,
}