import express from 'express';
import Multiparty from 'multiparty'
import path from 'path'
import shortId from 'short-id'
import shell from 'shelljs'
import fs from 'fs'

import { getPhotoAmount } from 'shared/utils'
import { User, OrderModel } from 'server/models'

import { uploadPath } from 'server/common/functions/files'
import { sendEmailByOrder } from 'server/common/functions/sendEmail'

export const orderRoute = express.Router();

const maxFileSize = 50 * (10 ** 6)

orderRoute.get('/list/:userID', async ({ params: { userID } }, res) => {
  try {
    const orders = await OrderModel.find({ user: userID }, ['createdAt', 'files', 'orderNumber'])

    res.json({ orders: orders.map(item => ({ ...item._doc, files: item.files.length, photoAmount: getPhotoAmount(item.files) })) })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})

orderRoute.post('/upload-files', async (req, res) => {
  const form = new Multiparty.Form({ maxFileSize })
  const orderNumber = shortId.generate()
  let directoryOrder;
  const orderFiles = []

  const orderData = {}

  form.on('part', (part) => {
    if (!part.filename) {
      const [key, value] = part.name.split('=')
      orderData[key] = value
      return;
    }
    const {
      fullDirectoryPath,
      fileId,
      format,
      paperType,
      amount,
      price,
      isArchiveFile,
      orderPath,
    } = uploadPath(part.name.replace(/%22/g, '"'), orderNumber);
    if (!directoryOrder) directoryOrder = orderPath

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
      isArchiveFile,
    })
    const ws = fs.createWriteStream(filePath);
    part.pipe(ws)

    ws.on('error', (err) => {
      // log.error(err);
      form.emit('error', err)
    })
  })

  form.on('finish', async () => {
    const { userID, phone, comment } = orderData;
    let user;
    if (!userID) {
      user = await new User().save()
    } else {
      user = await User.findById(userID)
      if (!user) user = await new User().save()
    }

    const order = await new OrderModel({
      orderNumber,
      files: orderFiles,
      totalPrice: orderFiles.reduce((a, { price, amount }) => a + parseFloat(price) * amount, 0),
      user: user._id,
      phone,
      comment,
      orderPath: directoryOrder,
    }).save()

    user.orders = [...user.orders, order._id]
    if (!user.phone) user.phone = phone
    await user.save()

    sendEmailByOrder(orderNumber)

    res.json({ order: order.getClientFields() })

  });
  form.on('error', (err) => {
    res.status(500).json({ errors: [{ message: err }] });
    // log.error(err);
  });

  form.parse(req);
});

orderRoute.get('/:orderID/:userID', async ({ params: { orderID, userID } }, res) => {
  if (!orderID || !userID || orderID === 'null' || userID === 'null') {
    res.json({ order: {} })
    return;
  }
  try {
    const [order, user] = await Promise.all([
      OrderModel.findById(orderID),
      User.findById(userID),
    ])
    // console.log(order._id, user._id, order._id === user._id);
    if (!order || !user) {
      res.json({ order: {} })
    } else {
      res.json({ order: order.getClientFields() })
    }
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }] });
  }

})