import mongoose from 'mongoose'
import crypto from 'crypto'

import { config } from '../common/config'

export const updatableUserFields = ['username', 'email', 'phone', 'isSubscribed']

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    unique: true,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  hashPassword: String,
  orders: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'order',
    }],
    default: [],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  bonus: {
    type: Array,
    default: [],
  },
}, { timestamps: true });

const createPassword = (pass) => (
  crypto.createHmac('sha256', config.hash.secret).update(pass).digest('hex')
)

userSchema.methods.comparePasswords = function(pass) {
  return this.hashPassword === createPassword(pass);
}
userSchema.methods.getCommonFields = function() {
  const { _id, username, orders, email, phone, isSubscribed, verified } = this;
  return { _id, username, orders, email, phone, isSubscribed, verified };
}

userSchema.virtual('password')
  .get(function() { return this.hashPassword })
  .set(function(pass) { this.hashPassword = createPassword(pass) })

export const User = mongoose.model('user', userSchema)