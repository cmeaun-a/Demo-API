import express from 'express'
import passport from 'passport'
import pick from 'lodash/pick'

const router = new express.Router()

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      next(err)
      return
    }
    if (!user) {
      res.send(info)
      return
    }

    req.logIn(user, err => {
      if (err) next(err)
      else res.send({ message: null })
    })
  })(req, res, next)
})

router.get('/isAuthenticated', (req, res) => {
  req.isAuthenticated()
  res.send(pick(req.user, ['email', 'id']))
})

router.get('/logout', (req, res) => {
  req.logout()
  res.send('logout')
})
export default router
