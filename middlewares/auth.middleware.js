import jwt from 'jsonwebtoken'
import {createToken} from '../modules/jwt.module.js'
import User from '../models/users.model.js'

const secretKey = process.env.SECRETKEY

export const verifytoken = async (req, res, next) => {
	const {method} = req
	const {id} = req.query
	if (method === 'GET' || method === 'DELETE' || method === 'POST') {
		const reqToken = req.headers.authorization || null
		if (!reqToken) {
			return res.status(401).json({message: 'No Loged'})
		}
		try {
			const token = reqToken.split(' ')[1]
			const decode = jwt.verify(token, secretKey)
			if (decode) {
				req.username = decode.username
				return next()
			} else return res.sendStatus(401)
		} catch (e) {
			if (e.name === 'TokenExpiredError') {
				try {
					const user = await User.findById(id).select('username')
					if (user.username) {
						const newToken = createToken(user.username)
						req.token = `Bearer ${newToken}`
						req.username = user.username
						next()
					}
				} catch {
					return res.status(401).json({message: 'Invalid ID'})
				}
			}
		}
	} else return res.sendStatus(405)
}
