import { withRouter } from 'react-router-dom'

const TEXT = {
  number: 'Номер заказа:',
  filesCount: 'Количество файлов:',
  date: 'Дата:',
  photoAmount: 'Количество фотографий:',
}

export const OrderListItem = withRouter(({ orderNumber, files, createdAt, photoAmount, history, _id }) => {
  return (
    <div className="order-list__item" role="presentation" onClick={() => history.push(`/user/order?orderID=${_id}`)}>
      <div>
        <span>{TEXT.number}</span>
        <span>{orderNumber}</span>
      </div>
      <div>
        <span>{TEXT.filesCount}</span>
        <span>{files}</span>
      </div>
      <div>
        <span>{TEXT.photoAmount}</span>
        <span>{photoAmount}</span>
      </div>
      <div>
        <span>{TEXT.date}</span>
        <span>{`${createdAt.split('T')[0]} ${createdAt.split('T')[1].split('.')[0]}`}</span>
      </div>
    </div>
  );
})