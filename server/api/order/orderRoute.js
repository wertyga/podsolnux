import express from 'express';
import Multiparty from 'multiparty'
import path from 'path'
import shortId from 'short-id'
import shell from 'shelljs'
import fs from 'fs'

import { config } from 'server/common/config'

import { User, OrderModel } from 'server/models'

export const orderRoute = express.Router();

const maxFileSize = 50 * (10 ** 6)
const TEXT = {
  unknownPaperType: 'Неуказана',
}

const uploadPath = (jsonString, orderNumber) => {
  const { title: format, paperType, id: fileId, amount = 1, price } = JSON.parse(jsonString)
  const { uploads: { orderPath } } = config
  const date = new Date();
  const datePart = `${date.getDate()}-${date.getMonth() + 1}`
  const formatsAmountPath = path.join(`${format}-${paperType || TEXT.unknownPaperType}`, String(amount))

  return {
    format,
    paperType,
    amount,
    price,
    datePath: datePart,
    formatsAmountPath,
    fullDirectoryPath: path.join(orderPath, datePart, orderNumber, formatsAmountPath),
    fileId,
  }
};

// const sendEmailByOrder = (orderName) => {
//   const transporter = nodemailer.createTransport(emailConfig);
//   const mailOptions = {
//     from: 'Foto_Podsolnux',
//     to: 'fotopodsolnux@gmail.com',
//     subject: `new Order - ${orderName || 'No order'}`,
//     html: `<div>Message: New order - ${orderName}</div>`
//   };
//   transporter.sendMail(mailOptions, (err, info) => {
//     if(err) {
//       log.error(err.message);
//       console.error(`Email not sent: ${err}`)
//     };
//   })
// };

orderRoute.post('/upload-files/:userID', async (req, res) => {
  const form = new Multiparty.Form({ maxFileSize })
  const orderNumber = shortId.generate()
  const orderFiles = []

  form.on('part', (part) => {
    const {
      datePath,
      fullDirectoryPath,
      fileId,
      formatsAmountPath,
      format,
      paperType,
      amount,
      price,
    } = uploadPath(part.name.replace(/%22/g, '"'), orderNumber);

    try {
      fs.statSync(fullDirectoryPath);
    } catch(err) {
      if(err.code === 'ENOENT') {
        shell.mkdir('-p', fullDirectoryPath);
      } else {
        res.status(500).json({ error: err.message });
        // log.error(err.message);
        return;
      }
    }

    const fileExt = part.filename.split('.')[part.filename.split('.').length - 1]
    const fileName = `${fileId}.${fileExt}`
    const filePath = path.join(fullDirectoryPath, fileName)
    orderFiles.push({
      filePath,
      format,
      fileId,
      paperType,
      amount,
      price,
    })
    const ws = fs.createWriteStream(filePath);
    part.pipe(ws)

    ws.on('error', (err) => {
      // log.error(err);
      form.emit('error', err)
    })
  })

  form.on('finish', async () => {
    const { userID } = req.params;
    let user;
    if (userID === 'none') {
      user = await new User().save()
    } else {
      user = await User.findById(userID)
      if (!user) user = await new User().save()
    }

    const { _id: orderID } = await new OrderModel({
      orderNumber,
      files: orderFiles,
      totalPrice: orderFiles.reduce((a, { price, amount }) => a + parseFloat(price) * amount, 0),
      user: user._id,
    }).save()

    user.orders = [...user.orders, orderID]
    await user.save()

    res.json({ order: { orderID, userID: user._id } })

  });
  form.on('error', (err) => {
    res.status(500).json({ errors: [{ message: err }] });
    // log.error(err);
  });

  form.parse(req);

});