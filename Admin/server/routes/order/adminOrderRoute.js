import express from 'express'
import fs from 'fs'
import archiver from 'archiver'

import { OrderModel } from '../../../../server/models/order'
import { config } from '../../common/config'

export const adminOrderRoute = express.Router();

const TEXT = {
  notFoundOrder: num => `Заказ ${num} не найден`,
}

const sortedOrders = (orders) => (
  orders.reverse().reduce((a, b) => {
    const dateKey = b.createdAt.toLocaleDateString()

    return { ...a, [dateKey]: !a[dateKey] ? [b] : [...a[dateKey], b] }
  }, {})
)

adminOrderRoute.get('/all', async (req, res) => {
  try {
    const orders = await OrderModel.find({})

    const newOrder = orders.map((item) => {
      const { files = [] } = item
      const newFiles = files.reduce((a, { filePath }) => {
        const [, , format, amount] = filePath.replace(`${config.uploads.orderPath}/`, '').split('/')

        if (!a[format]) return { ...a, [format]: parseInt(amount) }

        return { ...a, [format]: a[format] + parseInt(amount) }
      }, {})

      return { ...item._doc, files: newFiles }
    })

    res.json({ orders: sortedOrders(newOrder) })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})

adminOrderRoute.get('/:orderNumber', async ({ params: { orderNumber } }, res) => {
  try {
    const order = await OrderModel.findOne({ orderNumber }) || {}

    if (!order || !order.orderPath) {
      res.redirect(`http://localhost:3001/order-error/${TEXT.notFoundOrder(orderNumber)}`)
      return;
    }

    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    archive.directory(order.orderPath, order.orderNumber);
    archive.pipe(res);
    archive.finalize();

  } catch ({ message }) {
    res.redirect(`http://localhost:3001/order-error/${message}`)
  }
});

adminOrderRoute.delete('/:orderNumber', async ({ params: { orderNumber } }, res) => {
  try {
    await OrderModel.findOneAndDelete({ orderNumber })

    res.json('success')
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }] });
  }
});