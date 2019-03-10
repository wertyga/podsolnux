const WEEKDAYS_LONG = {
  ru: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
};
const WEEKDAYS_SHORT = {
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
};
export const MONTHS_SHORT = {
  ru: [
    'Янв',
    'Фев',
    'Март',
    'Апр',
    'Май',
    'Июнь',
    'Июль',
    'Авг',
    'Сент',
    'Окт',
    'Нояб',
    'Дек',
  ],
};
export const MONTHS = {
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
};

export const getBuitifulDate = (date) => {
  const time = new Date(Date.parse(date));
  const day = time.getDate();
  const month = MONTHS_SHORT.ru[time.getMonth()];
  const year = time.getFullYear();
  const hour = time.getHours();
  const minutes = time.getMinutes();

  return `${month} ${day}, ${year} ${hour}:${minutes}`
}