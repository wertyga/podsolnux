import { useState } from 'react'

const TEXT = {
  prints: {
    title: 'Формат',
    paperType: 'Тип бумаги',
    price: 'Цена',
  },
  currency: 'руб.'
}

export const FormatHelper = ({ prints, className }) => {
  const [active, setActive] = useState(false)

  const onClick = () => setActive(!active)

  return (
    <table
      className={cn(
        className,
        { active },
      )}
      onClick={onClick}
    >
      <thead>
        <tr>
          {Object.values(TEXT.prints).map(value => <td key={value}>{value}</td>)}
        </tr>
      </thead>
      <tbody>
        {prints.map(({ title, paperType, price }) => (
          <tr key={title}>
            <td>{title}</td>
            <td>{paperType}</td>
            <td>{`${price} ${TEXT.currency}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

FormatHelper.propTypes = {
  prints: PropTypes.array,
}