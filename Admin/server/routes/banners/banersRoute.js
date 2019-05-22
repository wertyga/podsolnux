import express from 'express'
import fs from 'fs'
import path from 'path'
import multiparty from 'multiparty'
import shortId from 'short-id'
import shell from 'shelljs'

import { config } from '../../common/config'

import { BannerCategoryModel } from '../../../../server/models'

export const bannersRoute = express.Router();

bannersRoute.get('/categories', async (req, res) => {
  try {
    const categories = await BannerCategoryModel.find({})

    res.json({ categories: categories.map(({ slug, banners}) => ({ slug, count: banners.length })) })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})

bannersRoute.post('/categories', async ({ body: { category } }, res) => {
  try {
    const existCategory = await BannerCategoryModel.findOne({ slug: category })
    if (existCategory) {
      res.status(400).json({ errors: [{ message: 'Category already exist' }] })
      return;
    }

    const newCategory = await new BannerCategoryModel({ slug: category }).save()

    res.json({ category: { slug: newCategory.slug, count: 0 } })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }] })
  }
})

bannersRoute.get('/categories/:slug', async ({ params: { slug } }, res) => {
  try {
    const existCategory = await BannerCategoryModel.findOne({ slug })
      .select(['banners', 'slug'])

    if (!existCategory) {
      res.status(400).json({ errors: [{ message: 'No category' }] })
      return;
    }

    res.json({ category: existCategory })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }] })
  }
})

bannersRoute.post('/', async (req, res) => {
  try {
    const form = new multiparty.Form()
    let categoryName;
    let fileFullPath;

    form.on('part', (part) => {
      const { name: category, filename } = part

      if (!filename) {
        part.resume()
        return;
      }

      const fullDirectoryPath = path.join(config.bannersUpload, category)
      const ext = filename.split('.').slice(-1)[0]
      const filePath = path.join(fullDirectoryPath, `${shortId.generate()}.${ext}`)
      categoryName = category
      fileFullPath = filePath.replace(process.cwd(), '')

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

      const ws = fs.createWriteStream(filePath)
      part.pipe(ws)

      ws.on('error', (err) => {
        // log.error(err);
        form.emit('error', err)
      })
    })

    form.on('error', (err) => {
      res.status(500).json({ errors: [{ message: err }] });
      // log.error(err);
    });

    form.on('finish', async () => {
      const updatedCategory = await BannerCategoryModel.findOneAndUpdate({ slug: categoryName }, { $push: { banners: fileFullPath } }, { new: true })

      res.json({ banners: updatedCategory.banners, slug: categoryName })
    })

    form.parse(req)
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }] })
  }
})

bannersRoute.put('/', async ({ body: { slug, banner } }, res) => {
  try {
    const category = await BannerCategoryModel.findOneAndUpdate({ slug }, { $pull: { banners: banner } }, { new: true })

    res.json({ category })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }] })
  }
})

bannersRoute.delete('/categories/:slug', async ({ params: { slug } }, res) => {
  try {
    await BannerCategoryModel.findOneAndDelete({ slug })

    res.json('success deleted')
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }] })
  }
})

bannersRoute.put('/categories', async ({ body: { slug, newName } }, res) => {
  try {
    const category = await BannerCategoryModel.findOneAndUpdate({ slug }, { $set: { slug: newName } }, { new: true })

    res.json({ category })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }] })
  }
})