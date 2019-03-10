import './section.sass';

export const Section = ({ children, h2, h5, fluid, grey, className, title }) => (
  <section className={cn(
    'common-section',
    className,
    { grey },
    { fluid }
  )}>
    <div className="container">
      <div className="row headers">
        {h2 && <h2>{h2}</h2>}
        {h5 && <h5>{h5}</h5>}
        {title}
      </div>
      <div className="row">
        {children}
      </div>
    </div>
  </section>
)

Section.propTypes = {
  children: PropTypes.any,
  h2: PropTypes.string,
  h5: PropTypes.string,
  title: PropTypes.any,
  fluid: PropTypes.bool,
  grey: PropTypes.bool,
  className: PropTypes.any,
}