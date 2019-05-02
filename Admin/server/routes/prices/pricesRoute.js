import express from 'express';

import { PriceModel, PrintModel } from '../../../../server/models'

export const priceRoute = express.Router();

priceRoute.get('/', async ({ query: { category } }, res) => {
  const exceptions = ['print'];
  try {
    const categoryName = category === 'all' ? { category: { $nin: exceptions } } : { category }
    const prices = await PriceModel.find(categoryName)

    const collectedPriced = prices.reduce((a, b) => {
      const { category, articleName: name, value, _id } = b;
      const added = !a[category] ? { [category]: [{ name, value, _id }] } : { [category]: [...a[category], { name, value, _id }] }
      return ({
        ...a,
        ...added,
      });
    }, {})

    res.send({ prices: collectedPriced, categories: Object.keys(collectedPriced) })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})

priceRoute.post('/', async ({ body }, res) => {
  const { value, name, category } = body;

  try {
    const newPrice = await new PriceModel({
      value,
      articleName: name.trim(),
      category: category.trim(),
    }).save()

    res.send(newPrice);
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})

priceRoute.put('/', async ({ body: { id, data = [] } }, res) => {
  try {
    const changableObj = data.reduce((a, {name, value}) => ({
      ...a,
      [name]: value
    }), {});
    const price = await PriceModel.findOneAndUpdate({ _id: id }, { $set: changableObj }, { new: true })
    res.send(price)
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})

priceRoute.delete('/', async ({ body: { id } }, res) => {
  try {
    const deletedPrice = await PriceModel.findOneAndDelete({ _id: id })

    res.json(deletedPrice)
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})