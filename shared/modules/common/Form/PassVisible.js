import Eye from 'react-icons/lib/io/eye'
import EyeDisabled from 'react-icons/lib/io/eye-disabled'

export const PassVisible = ({ visible, changePassVisible }) => (
  <div
    className="pass-visible"
    role="presentation"
    onClick={changePassVisible}
  >
    {visible ? <Eye /> : <EyeDisabled />}
  </div>
)

PassVisible.propTypes = {
  visible: PropTypes.bool,
  changePassVisible: PropTypes.func,
}