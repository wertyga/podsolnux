import { inject, observer } from 'mobx-react'
import isEmpty from 'lodash/isEmpty'

import { TEXT as totaPriceText } from '../SetOrder/TotalPrice/TotalPrice'

const TEXT = {
  emptyOrder: 'Заказ не найден',
  images: 'Изображения',
  archives: 'Архивные файлы: ',
  amount: 'Колличество: ',
  formatPrice: 'Расчетная цена: ',
  currency: 'руб.',
  count: 'шт.',
  phone: 'Телефон:',
  comment: 'Комментарий: ',
  totalPrice: 'Итоговая стоимость:',
}

const OrderViewInnerItem = ({ format, amount, formatPrice }) => {
  return (
    <div className="order-view-inner__item">
      <ul className="order-view-inner__item__content">
        <li>{format}</li>
        <li><span className="bold">{TEXT.amount}</span><span>{`${amount} ${TEXT.count}`}</span></li>
        <li><span className="bold">{TEXT.formatPrice}</span><span>{`${formatPrice} ${TEXT.currency}`}</span></li>
      </ul>
    </div>
  );
}

const OrderViewInnerComponent = ({ files, comment, phone, totalPrice, renderImages, orderViewStore: { collectFilesAmountPrice } }) => {
  const { images, archives } = collectFilesAmountPrice(files)

  return (
    <div className="order-view-inner">
      {!isEmpty(images) &&
        <div className="order-view-inner__files">
          <span className="order-view-inner__item__title">{TEXT.images}</span>
          <div className="order-view-inner__files__content">
            {Object.entries(images).map(([key, value]) => (
              <OrderViewInnerItem key={key} format={key} {...value} />
            ))}
          </div>
          {!!archives &&
          <p className="order-view-inner__archives">
            <span>{TEXT.archives}</span>
            <span>{`${archives} ${TEXT.count}`}</span>
          </p>
          }
        </div>
      }
      {phone &&
        <div className="order-view-inner__phone">
          <span>{TEXT.phone}</span>
          <span>{phone}</span>
        </div>
      }
      {comment &&
        <div className="order-view-inner__comment">
          <span>{TEXT.comment}</span>
          <span>{comment}</span>
        </div>
      }
      {totalPrice &&
        <div className="order-view-inner__totalPrice">
          <span>{!!archives ? totaPriceText.priceWithArchives : TEXT.totalPrice}</span>
          <span>{`${totalPrice} ${TEXT.currency}`}</span>
        </div>
      }
    </div>
  );
}

export const OrderViewInner = inject('orderViewStore')(observer(OrderViewInnerComponent))