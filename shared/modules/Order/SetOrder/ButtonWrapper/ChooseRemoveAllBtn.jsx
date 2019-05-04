const TEXT = {
  chooseAll: 'Выбрать все',
  deChooseAll: 'Снять выделение',
  removeAll: 'Удалить все',
}

export const ChooseAllBtn = ({ chooseAll, isChooseAll, unChooseAll }) => (
  <button
    onClick={isChooseAll ? unChooseAll : chooseAll}
    className="btn accent"
  >
    {isChooseAll ? TEXT.deChooseAll : TEXT.chooseAll }
  </button>
);

export const RemoveAllBtn = ({ removeAll }) => (
  <button
    onClick={removeAll}
    className="btn negative"
  >
    {TEXT.removeAll}
  </button>
);

ChooseAllBtn.propTypes = {
  chooseAll: PropTypes.func,
  unChooseAll: PropTypes.func,
  isChooseAll: PropTypes.bool,
}

RemoveAllBtn.propTypes = {
  removeAll: PropTypes.func,
}