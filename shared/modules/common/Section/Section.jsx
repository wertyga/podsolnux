import './section.sass';

export const Section = ({ children, h2, h5, fluid, grey, className, title, h1, isOne }) => {
  const isHasHeader = h1 || h2 || h5 || title
  return (
    <section className={cn(
      'common-section',
      className,
      { grey },
      { fluid },
      { 'is-one': isOne },
    )}>
      <div className="container">
        {h1 &&
          <div className="row">
            <div className="col-xs-12"><h1>{h1}</h1></div>
          </div>
        }
        {isHasHeader &&
          <div className="row headers">
            {h2 && <div className="col-xs-12"><h2>{h2}</h2></div>}
            {h5 && <div className="col-xs-12"><h5>{h5}</h5></div>}
            {title && <div className="col-xs-12">{title}</div>}
          </div>
        }
        <div className="row">
          <div className="col-xs-12">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.any,
  h2: PropTypes.string,
  h1: PropTypes.string,
  h5: PropTypes.string,
  title: PropTypes.any,
  fluid: PropTypes.bool,
  grey: PropTypes.bool,
  className: PropTypes.any,
}