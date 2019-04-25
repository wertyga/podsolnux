import { useEffect } from 'react'

import './notify.sass'

const TEXT = {
  close: 'Закрыть',
}

export const Notify = ({ children, closeText, onClose, type }) => {
  let mainRef = React.createRef();

  useEffect(() => {
    mainRef.scrollIntoView({ behavior: 'smooth' })
  })
  return (
    <div
      className={cn(
        'global-error',
        { error: type === 'error' },
      )}
      ref={node => mainRef = node}
    >
      <div>{children}</div>
      <div
        className="close"
        onClick={onClose}
        role="presentation"
      >
        {closeText || TEXT.close}
      </div>
    </div>
  );
}

Notify.propTypes = {
  closeText: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.any,
}