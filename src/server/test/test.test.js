import User from 'server/models/User'
import useDatabase from './useDatabase'

useDatabase()

describe('User', () => {
  it('should create a user', async () => {
    await User.query().delete()
    const user = await User.query().insertAndFetch({ email: 'test@test.test' })
    expect(user).toBeDefined()
    expect(user.email).toBe('test@test.test')
  })
})
