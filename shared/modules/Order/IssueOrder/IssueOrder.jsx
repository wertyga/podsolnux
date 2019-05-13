import { Fragment, useState, createRef } from 'react'
import { inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { Page, Section, Input } from 'shared/modules/common'

import { SetOrderBtn } from '../SetOrder/ButtonWrapper/Buttons'
import { TEXT as priceText } from '../SetOrder/TotalPrice/TotalPrice'

import './issue-order.sass'

const TEXT = {
  title: 'Оформить заказ. Фотостудия "Подсолнух"',
  negative: 'Назад',
  setOrder: 'Оформить',
  header: 'Оформление заказа',
  phone: 'Номер телефона',
  comment: 'Комментарий',
  images: 'Изображения',
  inputError: 'Заполните поле',
}

const IssueOrderComponent = ({ files, getTotalPrice, user, history }) => {
  if (!files.length) return <Redirect to="/set-order" />

  const [phone, setPhone] = useState(user.phone || '')
  const [comment, setComment] = useState('')
  const [inputError, setInputError] = useState('')

  const inputs = [
    {
      name: 'phone',
      label: TEXT.phone,
      placeholder: `${TEXT.phone}...`,
      value: phone,
      onChange: ({ target: { value } }) => setPhone(value),
      error: inputError.phone,
    },
    {
      name: 'comment',
      type: 'textarea',
      label: TEXT.comment,
      value: comment,
      onChange: ({ target: { value } }) => setComment(value),
      placeholder: `${TEXT.comment}...`,
    },
  ]

  const { totalPrice, filesObj, archiveFiles } = getTotalPrice()

  const handleTotalPrice = () => {
    if (!totalPrice) return null;

    return (
      <div className="issue-order__total-price">
        <span>{archiveFiles.length ? priceText.priceWithArchives : priceText.totalPrice}</span>
        <span>{`${totalPrice} ${priceText.currency}`}</span>
      </div>
    );
  }

  const onSubmit = () => {
    if (!phone) {
      setInputError.phone = TEXT.inputError
      return;
    }

    return { phone, comment };
  }

  const getUploadContainer = () => {
    if (typeof window === 'undefined') return null;
    return document.querySelector('.issue-order');
  }

  return (
    <Page
      className="issue-order"
      title={TEXT.title}
    >
      <Section grey h1={TEXT.header}>

        <div className="issue-order__content">
          <div className="form">
            <div className="form__inputs">
              {inputs.map(item => (
                <div className="form__inputs__input" key={item.name}>
                  <label>{item.label}</label>
                  <Input
                    {...item}
                  />
                </div>
              ))}
            </div>
            <SetOrderBtn onClick={onSubmit} disabled={!phone} targetContainer={getUploadContainer()}/>
          </div>

          <div className="issue-order__content__payment-list">
            {!!totalPrice &&
              <div className="issue-order__images">
                <div className="title">{TEXT.images}</div>
                {Object.entries(filesObj).map(([key, { price, amount }]) => (
                  <div key={key} className="issue-order__images__item">
                    <span>{`${key} (${amount}шт.):`}</span>
                    <span>{price}</span>
                  </div>
                ))}
              </div>
            }

            {!!archiveFiles.length &&
              <div className="issue-order__archives">
                <div className="title">{priceText.archives}</div>
                {archiveFiles.map(item => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            }

            {handleTotalPrice()}

          </div>
        </div>

        <div className="issue-order__buttons">
          <button className="btn negative" onClick={() => history.push('/set-order')}>{TEXT.negative}</button>
        </div>
      </Section>
    </Page>
  );
}

IssueOrderComponent.propTypes = {
  files: PropTypes.array,
  getTotalPrice: PropTypes.func,
}

const mapState = ({ printStore: { files, getTotalPrice }, userStore: { user } }) => ({
  files,
  getTotalPrice,
  user,
})

export const IssueOrder = inject(mapState)(IssueOrderComponent)