import express from 'express';

import { PrintModel } from '../../../../server/models'

export const printRoute = express.Router();

printRoute.get('/', async (req, res) => {
  try {
    const prints = await PrintModel.find({}).select(['title', 'paperType', 'price'])

    res.send({ prints })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})

printRoute.post('/', async ({ body: { paperType, name, price } }, res) => {
  try {
    const { _id, title, paperType: formatType, price: formatPrice } = await new PrintModel({
      title: name,
      paperType,
      price: parseFloat(price),
    }).save()

    res.send({ _id, paperType: formatType, price: formatPrice, title });
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})

printRoute.put('/', async ({ body: { id, data = [] } }, res) => {
  try {
    const changableObj = data.reduce((a, { name, value }) => ({
      ...a,
      [name]: name === 'price' ? parseFloat(value) : value,
    }), {});

    const { title, price, paperType, _id } = await PrintModel.findOneAndUpdate({ _id: id }, { $set: changableObj }, { new: true })
    res.send({ _id, title, paperType, price })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})

printRoute.delete('/', async ({ body: { id } }, res) => {
  try {
    const deletedPrice = await PrintModel.findOneAndDelete({ _id: id })

    res.json(deletedPrice)
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})