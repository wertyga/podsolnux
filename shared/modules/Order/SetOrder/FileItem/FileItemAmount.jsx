import Plus from 'react-icons/lib/fa/plus-square'
import Minus from 'react-icons/lib/fa/minus-square'

import { Input } from 'shared/modules/common'

export const FileItemAmount= ({ amount = 1, updateAmount, id, disabled }) => {
  const update = ({ target: { value } }) => {
    const parsedValue = parseInt(value)
    if (!/\d/.test(parsedValue) || amount === value) return;
    updateAmount({ id, amount: Math.max(parsedValue, 1) })
  }

  const minusClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (amount < 2) return;
    updateAmount({ id, amount: parseInt(amount) - 1 })
  }

  const plusClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    updateAmount({ id, amount: parseInt(amount) + 1 })
  }

  return (
    <div className={cn(
      'file-item__amount',
      { disabled },
    )}>
      <Minus onClick={minusClick} className="minus" />
      <Input
        name="amount"
        value={amount}
        onChange={update}
      />
      <Plus onClick={plusClick} className="plus"/>
    </div>
  );
}

FileItemAmount.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  updateAmount: PropTypes.func,
  id: PropTypes.string,
}