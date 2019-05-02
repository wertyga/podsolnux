import express from 'express';

import { User } from 'server/models'
import { sendEmail } from 'server/common/functions/sendEmail'

export const userRoute = express.Router();

const TEXT = {
  alreadyExistUser: 'Пользователь уже существует',
  userExpire: 'Пользователь не найден или уже верифицирован',
  invalidData: 'Неверные данные',
  notVerified: 'Пользователь не прошел подтверждение',
  noUser: 'Пользователь не найден',
}

userRoute.post('/set-subscription', async ({ body: { email } }, res) => {
  try {
    await User.findOneAndUpdate({ email }, { $set: { email, isSubscribed: true } }, { upsert: true })

    res.send({ type: 'subscription', status: 'ok' })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }]  })
  }
})

// Tests
// userRoute.get('/set-user', async (req, res) => {
//   try {
//     await new User({
//       username: 'wertyga',
//       password: 'www',
//     }).save()
//
//     res.end()
//   } catch (e) {
//     console.warn(e)
//   }
// })
//
// userRoute.get('/get-pass', async (req, res) => {
//   try {
//     const user = await User.findOne({})
//     console.log(user.comparePasswords('www'))
//   } catch (e) {
//     console.warn(e)
//   } finally {
//     res.end();
//   }
// })

userRoute.post('/registry', async ({ body: { username, password, email } }, res) => {
  try {
    const existUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existUser) {
      return res.status(409).json({ errors: [{ message: TEXT.alreadyExistUser }] })
    }
    const user = await new User({
      username,
      email,
      password,
    }).save();
    await sendEmail({ registry: true, email, userId: user._id })

    res.send({ user: user.getCommonFields() })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }] })
  }
})

userRoute.post('/login', async ({ body: { username, password } }, res) => {
  const user = await User.findOne({ username })

  if (!user || !user.comparePasswords(password)) {
    return res.status(400).json({ errors: [{ message: TEXT.invalidData }] })
  }
  if (!user.verified) return res.status(400).json({ errors: [{ message: TEXT.notVerified }] })

  res.json({ user: user.getCommonFields() })
})

userRoute.get('/verify-user', async ({ body: { id } }, res) => {
  try {
    const user = await User.findOne({ _id: id })

    if (!user || user.verified) {
      return res.status(400).json({ errors: [{ message: TEXT.userExpire }] })
    }
    user.verified = true
    const { orders, username, _id, email } = await user.save()

    res.json({ user: { orders, username, _id, email } })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }] })
  }
})

userRoute.get('/get-user', async ({ query: { id } }, res) => {
  try {
    const user = await User.findOne({ _id: id })

    if (!user) return res.status(404).json({ errors: [{ message: TEXT.noUser }] })

    res.json({ user: user.getCommonFields() })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }] })
  }
})

userRoute.post('/logout-user', async ({ body: { id } }, res) => {
  try {
    const user = await User.findOne({ _id: id })

    if (!user) return res.status(404).json({ errors: [{ message: TEXT.noUser }] })

    res.json({ success: 'true' })
  } catch ({ message }) {
    res.status(500).json({ errors: [{ message }] })
  }
})