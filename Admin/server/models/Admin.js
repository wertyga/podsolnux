import mongoose from 'mongoose';
import crypto from 'crypto'

import { config } from '../common/config'

const { Schema } = mongoose;

const AdminSchema = new Schema({
    username: {
        type: String
    },
    hashPassword: {
        type: String
    }
}, { timestamps: true });

const createPassword = (pass) => (
  crypto.createHmac('sha256', config.hash.secret).update(pass).digest('hex')
)

AdminSchema.methods.comparePasswords = function(pass) {
  return this.hashPassword === createPassword(pass);
}

AdminSchema.virtual('password')
  .get(function() { return this.hashPassword })
  .set(function(pass) { this.hashPassword = createPassword(pass) })

export const Admin = mongoose.model('admin', AdminSchema)