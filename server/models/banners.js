import mongoose from 'mongoose'

const BannerSchema = new mongoose.Schema({
  category: {
    type: String,
    require: true,
  },
  position: {
    type: Number,
    default: 1000,
  },
  imagePath: {
    type: String,
    require: true,
  },
}, { timestamps: true });

export const BannerModel = mongoose.model('banner', BannerSchema)

const BannerCategorySchema = new mongoose.Schema({
  slug: {
    type: String,
    require: true,
    unique: true,
  },
  banners: {
    type: Array,
    default: [],
  },
}, { timestamps: true });

export const BannerCategoryModel = mongoose.model('bannerCategory', BannerCategorySchema)