import { useState, useEffect } from 'react'

import noop from 'lodash/noop'

import { Input } from 'shared/modules/common'
import { validateEmail } from 'shared/utils/Helpers'

import { PassVisible } from './PassVisible'

import './form.sass'

const TEXT = {
  commonEmptyError: 'Заполните поле',
  emailInvalid: 'Неверный адрес',
}

export const Form = ({ inputs, title, onSubmit, submitButtonText, footerContent, disabled, SubmitButton }) => {
  const values = {};
  inputs.forEach(({ name }) => {
    const [value, onChange] = useState('')
    const [error, setError] = useState('')
    values[name] = {
      onChange,
      value,
      error,
      setError,
    }
  })
  const [passVisible, changePassVisible] = useState(false)

  const handleChange = ({ target: { value, name } }) => {
    values[name].onChange(value)
    values[name].setError('')
  }

  const onSubmitFunc = (e) => {
    e.preventDefault();
    if(disabled) return;

    const emptyFields = inputs.map(({ name, require }) => {
      if (require && !values[name].value) return name;
      if (name === 'email') {
        if (!validateEmail(values[name].value)) return name;
      }
      return null;
    })
      .filter(item => !!item)

    if (emptyFields.length) {
      emptyFields.forEach(name => values[name].setError(name !== 'email' ? TEXT.commonEmptyError : TEXT.emailInvalid))

      return;
    }

    const returnedObj = Object.entries(values).reduce((a, [key, { value }]) => ({
      ...a,
      [key]: value,
    }), {});

    onSubmit(returnedObj)
  }

  return (
    <form className="form" onSubmit={onSubmitFunc}>
      <h2>{title}</h2>
      <div className="form__inputs">
        {inputs.map(({ type = 'text', name, label, extendPassField, placeholder }) => {
          const isExtendedPass = (extendPassField && !passVisible) ? type : ((extendPassField && passVisible) ? 'text' : type)
          return (
            <div
              className={cn(
                'form__inputs__input',
                { 'extend-pass': extendPassField },
              )}
              key={name}
            >
              {label && <label>{label}</label>}
              <Input
                type={isExtendedPass}
                name={name}
                onChange={handleChange}
                value={values[name].value}
                placeholder={placeholder}
                error={values[name].error}
                disabled={disabled}
              />
              {extendPassField &&
                <PassVisible
                  visible={passVisible}
                  changePassVisible={() => !disabled && changePassVisible(!passVisible)}
                />
              }
            </div>
          );
        })}
        {<button className="accent" disabled={disabled}>{submitButtonText}</button>}
      </div>

      {!!footerContent && footerContent}

    </form>
  );
}

Form.propTypes = {
  inputs: PropTypes.array.isRequired, // name: 'username',
                                      // label: TEXT.usernameLabel,
                                      // placeholder: `${TEXT.usernameLabel}...`,
                                      // require: true,
                                      // footerContent: PropTypes.any,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
}

Form.defaultProps = {
  onSubmit: noop,
}
