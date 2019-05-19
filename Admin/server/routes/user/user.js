import express from 'express';

import { Admin } from '../../models/Admin'
import { User } from '../../../../server/models/user'

export const user = express.Router();

user.post('/login', async ({ body: { username, password }, session }, res) => {
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      res.status(400).json({ errors: [{ message: 'User is not exist' }] })
      return;
    }

    if(!admin.comparePasswords(password)) {
      res.status(400).json({ errors: [{ message: 'Invalid data' }] })
      return;
    }

    session.isAdmin = true;
    res.json({ success: true });
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})

user.get('/all', async (req, res) => {
  try {
    const users = await User.find({}).populate('orders', 'orderNumber')

    res.json({ users })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})

// user.get('/set-admin', async ({ query: { name: username, pass } }, res) => {
//   try {
//     await new Admin({
//       username,
//       password: pass,
//     }).save();
//   } catch (e) {
//     console.log(e)
//   }
//
//   res.end()
// })