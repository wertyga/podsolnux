import express from 'express'

import { BannerCategoryModel } from 'server/models'

export const bannersRoute = express.Router();

bannersRoute.get('/:slug', async ({ params: { slug }, headers: { mobile } }, res) => {
  try {
    const banners = await BannerCategoryModel.findOne({ slug }).select(['banners', 'slug'])

    if (!banners) throw new Error('No category founded')

    res.json({ banners: {
      ...banners._doc,
      banners: banners.banners.filter(item => !!item.mobile === !!mobile)
    } })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})