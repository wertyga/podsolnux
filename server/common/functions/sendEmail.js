import nodemailer from 'nodemailer'

import { emailConfig } from '../emailConfig'
import { config } from 'server/common/config'

const registryText = (userId) => (
  `<div>Подтверждение регистрации:</div>
    <br />
    <a href="${config.hostAddress}/confirm?id=${userId}&registry=true">Подстверждаю регистрацию</a>
    <br />
    <div>Ссылка будет доступна в течении 60 минут</div>`
)

export const sendEmailByOrder = (orderName) => {
  const transporter = nodemailer.createTransport(emailConfig);
  const mailOptions = {
    from: 'Foto_Podsolnux',
    to: 'fotopodsolnux@gmail.com',
    subject: `new Order - ${orderName || 'No order'}`,
    html: `<div>Message: New order - ${orderName}</div>`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      // log.error(err.message);
      console.error(`Email not sent: ${err}`)
    };
  })
}

export const sendEmail = async ({ email, registry, userId }) => {
  const transporter = nodemailer.createTransport(emailConfig);
  const mailOptions = {
    from: 'Фотоателье "Подсолнух"',
    to: email,
    subject: 'Подтверждения регистрации',
    html: registry ? registryText(userId) : 'asdasd',
  };

  return new Promise((res, rej) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        rej(err);
      } else {
        res(info);
      }
    })
  })
}