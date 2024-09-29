import jwt from 'jsonwebtoken'

const secretKey = process.env.SECRETKEY
const expiretionTime = '15m'

export const createToken = (username) => {
	const token = jwt.sign({username}, secretKey, {
		expiresIn: expiretionTime,
	})
	return token
}
