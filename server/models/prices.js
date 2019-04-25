import mongoose from 'mongoose'

const PriceSchema = new mongoose.Schema({
  articleName: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const PriceModel = mongoose.model('price', PriceSchema)
// export const PriceModel = mongoose.model('price', PriceSchema)