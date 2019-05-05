import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  files: {
    type: Array,
  },
  orderNumber: {
    type: String,
  },
}, { timestamps: true });

export const OrderModel = mongoose.model('order', OrderSchema)