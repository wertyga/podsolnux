import './input.sass'

export const Input = ({ placeholder = '', onChange, value, error, type = 'text', ...restProps }) => (
  <div className="simple-input">
    {type !== 'textarea' ?
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...restProps}
      /> :
      <textarea
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...restProps}
      />
    }
    <span className="simple-input__error">{error}</span>
  </div>
)

Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
}