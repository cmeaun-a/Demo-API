import User from 'server/models/User'
import omit from 'lodash/omit'

export const findOrCreateUser = async (
  { googleId, email, facebookId },
  done,
) => {
  try {
    let user = await User.query()
      .where(builder =>
        facebookId
          ? builder.where({ facebookId })
          : builder.where({ googleId }),
      )
      .first()

    if (!user) {
      user = await User.query().insertAndFetch({
        facebookId: facebookId || null,
        googleId: googleId || null,
        email,
      })
    }
    done(null, omit(user, 'hash', 'facebookId', 'googleId'))
  } catch (err) {
    done(err)
  }
}
