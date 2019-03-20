import { Strategy as LocalStrategy } from 'passport-local'
import { compare as comparePassword } from 'server/utils/password'
import User from 'server/models/User'

export default passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          email = email.toLowerCase()
          const user = await User.query().findOne({ email })
          if (!user || !(await comparePassword(password, user.hash))) {
            done(null, false, { message: 'Email ou mot de passe invalide.' })
            return
          }
          done(null, user)
        } catch (err) {
          done(err)
        }
      },
    ),
  )
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.query().findById(id)
      done(null, user)
    } catch (err) {
      done(err)
    }
  })
}
