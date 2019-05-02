import mongoose from 'mongoose'

const PrintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  paperType: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const PrintModel = mongoose.model('print', PrintSchema)