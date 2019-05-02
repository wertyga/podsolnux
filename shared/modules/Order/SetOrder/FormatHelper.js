import { useState, useEffect } from 'react'
import { inject } from 'mobx-react'
import sortedUniq from 'lodash/sortedUniq'
import AngleUp from 'react-icons/lib/fa/angle-up'
import AngleDown from 'react-icons/lib/fa/angle-down'

const TEXT = {
  prints: {
    title: 'Формат',
    paperType: 'Тип бумаги',
    price: 'Цена',
  },
  currency: 'руб.',
  saveChanges: 'Применить',
}

const FormatHelperComponent = ({ prints, className, onChange: propsChange, isMobile }) => {
  const [active, setActive] = useState(false)
  const [titleState, setTitle] = useState(false)
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
    title: {
      checked: titleState,
      onChange: item => () => setTitle(titleState === item ? false : item),
    },
    paperType: {
      checked: paperState,
      onChange: item => () => setPaper(paperState === item ? false : item),
    },
  }
  const selects = {}
  prints.map(({ title, paperType }) => ({ title, paperType })).forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (!selects[key]) {
        selects[key] = [value]
      } else {
        selects[key] = sortedUniq([...selects[key], value])
      }
    })
  })

  const onShow = () => setActive(!active)

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
        {Object.entries(selects).map(([key, values]) => (
          <div className="format-helper__content__list" key={key}>
            <p>{TEXT.prints[key]}</p>
            <ul>
              {values.map(item => (
                <li key={item} onClick={state[key].onChange(item)} className="format-helper__checkbox-list-item">
                  <span>{item}</span>
                  <input type="checkbox" checked={state[key].checked === item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button className="accent">{TEXT.saveChanges}</button>
      </div>
      <div className="format-helper__shower" onClick={onShow}>{active ? <AngleUp /> : <AngleDown />}</div>
    </div>
  );
}

FormatHelperComponent.propTypes = {
  prints: PropTypes.array,
  isMobile: PropTypes.bool,
}

const mapState = ({ execContextStore: { requestContext: { isMobile } } }) => ({
  isMobile,
})

export const FormatHelper = inject(mapState)(FormatHelperComponent);