import mongoose from 'mongoose'
import crypto from 'crypto'

import shortId from 'short-id'

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
  phone: {
    type: String,
    unique: true,
  },
  isSubscribed: Boolean,
  hashPassword: String,
  orders: {
    type: Array,
    default: [],
  },
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
  const { _id, username, orders, email, phone } = this;
  return { _id, username, orders, email, phone };
}
userSchema.methods.isAnonimusUser = function () {
  return /-anonimus/.test(this.username)
}

userSchema.virtual('password')
  .get(function() { return this.hashPassword })
  .set(function(pass) { this.hashPassword = createPassword(pass) })

userSchema.statics.generateAnonimusUser = function () {
  return `${shortId.generate()}-anonimus`;
}

export const User = mongoose.model('user', userSchema)