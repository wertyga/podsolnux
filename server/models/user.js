import mongoose from 'mongoose'
import crypto from 'crypto'

import { config } from '../common/config'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  isSubscribed: Boolean,
  hashPassword: String,
  orders: Array,
  verified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const createPassword = (pass) => (
  crypto.createHmac('sha256', config.hash.secret).update(pass).digest('hex')
)

userSchema.methods.comparePasswords = function(pass) {
  return this.hashPassword === createPassword(pass);
}

userSchema.methods.getCommonFields = function() {
  const { _id, username, orders, email } = this;
  return { _id, username, orders, email };
}

userSchema.virtual('password')
  .get(function() { return this.hashPassword })
  .set(function(pass) { this.hashPassword = createPassword(pass) })

export const User = mongoose.model('user', userSchema)