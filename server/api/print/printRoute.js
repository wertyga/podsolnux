import express from 'express';

import { PrintModel } from 'server/models'

export const printRoute = express.Router();

printRoute.get('/', async (req, res) => {
  try {
    const prints = await PrintModel.find({}).select(['format', 'paperType', 'price'])

    res.send({ prints })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})
