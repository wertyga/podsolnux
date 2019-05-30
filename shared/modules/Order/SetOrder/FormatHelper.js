import { useState, useEffect } from 'react'
import { inject } from 'mobx-react'
import noop from 'lodash/noop'

import { TotalPrice } from './TotalPrice/TotalPrice'

export const TEXT = {
  prints: {
    format: 'Формат',
    paperType: 'Тип бумаги',
    price: 'Цена',
  },
  currency: 'руб.',
  saveChanges: 'Применить',
  showFormats: 'Показать форматы',
  hideFormats: 'Скрыть форматы',
}

const Chooses = ({ options, format, onChange, checked }) => (
  <div className="format-helper__content__list">
    <p>{TEXT.prints[format]}</p>
    <ul>
      {options.map(item => (
        <li key={item} onClick={onChange(item)} className="format-helper__checkbox-list-item">
          <span>{item}</span>
          <input type="checkbox" checked={checked === item} onChange={noop}/>
        </li>
      ))}
    </ul>
  </div>
)

const FormatHelperComponent = ({ prints, className, isMobile, setFileData, errorNode }) => {
  const [active, setActive] = useState(false)
  const [formatState, setFormat] = useState(false)
  const [paperState, setPaper] = useState(false)
  const [isFixed, setFixed] = useState(false)

  const mainRef = React.createRef()

  const checkScroll = () => {
    if(window.pageYOffset > (!isMobile ? 86 : 70)) {
      !isFixed && setFixed(true)
    } else if (isFixed) {
      setFixed(false)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('scroll', checkScroll)
    return () => window.removeEventListener('scroll', checkScroll)
  })

  const state = {
    format: {
      checked: formatState,
      onChange: item => () => setFormat(formatState === item ? false : item),
    },
    paperType: {
      checked: paperState,
      onChange: item => () => setPaper(paperState === item ? false : item),
    },
  }
  const selects = {}
  prints.map(({ format, paperType }) => ({ format, paperType }))
    .forEach((item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (key === 'paperType' && state.format.checked) {
          const isPaperFormatExist = prints.find(print => print.format === state.format.checked && value === print.paperType)
          if (!isPaperFormatExist) return;
        }
        if (!selects[key]) {
          selects[key] = [value]
        } else {
          if (selects[key].includes(value)) return;
          selects[key] = [...selects[key], value]
        }
      })
  })

  const onShow = () => setActive(!active)

  const onSubmit = () => {
    const { format, paperType } = state;
    if (!format.checked && !paperType.checked) return;

    const successResult = setFileData({
      format: formatState,
      paperType: paperState,
    })

    if (successResult) clearState();
  }

  const clearState = () => {
    setActive(false)
    setFormat(false)
    setPaper(false)
  }

  const { format, paperType } = state;

  return (
    <div
      className={cn(
        'format-helper',
        { active },
        { 'is-fixed': isFixed }
      )}
      ref={mainRef}
    >
      <div className="format-helper__content">
        <Chooses
          title="title"
          options={selects.format}
          checked={format.checked}
          onChange={format.onChange}
        />
        {format.checked &&
          <Chooses
            title="paperType"
            options={selects.paperType}
            checked={paperType.checked}
            onChange={paperType.onChange}
          />
        }

        <button className="accent" onClick={onSubmit}>{TEXT.saveChanges}</button>
      </div>
      <div className="format-helper__shower" onClick={onShow}>{active ? TEXT.hideFormats : TEXT.showFormats}</div>
      <TotalPrice />
      {errorNode}
    </div>
  );
}

FormatHelperComponent.propTypes = {
  prints: PropTypes.array,
  isMobile: PropTypes.bool,
  setFileData: PropTypes.func,
  errorNode: PropTypes.node,
}

const mapState = ({ execContextStore: { requestContext: { isMobile } } }) => ({
  isMobile,
})

export const FormatHelper = inject(mapState)(FormatHelperComponent);