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
  phone: {
    type: String,
  },
  comment: {
    type: String,
  },
}, { timestamps: true });

OrderSchema.methods.getClientFields = function() {
  const needFields = ['totalPrice', 'user', 'orderNumber', 'phone', '_id', 'phone', 'comment']

  const userFields = needFields.reduce((a, b) => ({ ...a, [b]: this[b] }), {})

  return {
    ...userFields,
    files: this.files.map(({ amount, format, paperType, price, isArchiveFile, filePath }) => (
      {
        amount,
        format,
        paperType,
        price,
        isArchiveFile,
        filePath: filePath.split('ORDERS')[1],
      }
    )),
  }
}

export const OrderModel = mongoose.model('order', OrderSchema)