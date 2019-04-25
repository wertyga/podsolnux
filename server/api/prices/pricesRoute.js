import express from 'express';

import { PriceModel } from 'server/models'

export const priceRoute = express.Router();

priceRoute.get('/', async (req, res) => {
  try {
    const prices = await PriceModel.find({})

    const collectedPriced = prices.reduce((a, b) => {
      const { category, articleName: name, value, _id } = b;
      const added = !a[category] ? { [category]: [{ name, value, _id }] } : { [category]: [...a[category], { name, value, _id }] }
      return ({
        ...a,
        ...added,
      });
    }, {})

    res.send({ prices: collectedPriced })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})