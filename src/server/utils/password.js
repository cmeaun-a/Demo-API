import bcrypt from 'bcrypt'

export const hash = async password => bcrypt.hash(password, 10)

export const compare = async (password, hash) => bcrypt.compare(password, hash)
