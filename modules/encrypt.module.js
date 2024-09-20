import bcrypt from 'bcrypt'
import 'dotenv/config'

const salts = Number(process.env.SALTS)

export const encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(salts)
	const hash = await bcrypt.hash(password, salt)
	return hash
}

export const comparePassword = async (password, hash) => {
	const isEqual = await bcrypt.compare(password, hash)
	return isEqual
}
