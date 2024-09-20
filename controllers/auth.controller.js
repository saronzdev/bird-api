import User from '../models/users.model.js'
import getDate from '../modules/date.module.js'
import {createToken} from '../modules/jwt.module.js'
import {encryptPassword, comparePassword} from '../modules/encrypt.module.js'

export const register = async (req, res) => {
	const {name, email, username, password} = req.body
	if ((name, email, username, password)) {
		try {
			const pswEncrypt = await encryptPassword(password)
			const newUser = User({
				name,
				email,
				username,
				password: pswEncrypt,
				createdAt: getDate(),
			})
			const data = await newUser.save()
			data
				? res.status(201).json({message: 'User Created', token: createToken(data.username)})
				: res.status(500).json({message: 'Unhandled Exception'})
		} catch (e) {
			if (e.code === 11000) {
				if (e.keyValue.username) {
					return res.status(409).json({message: 'User Not Avaiable', code: 1})
				} else if (e.keyValue.email) {
					return res.status(409).json({message: 'Email Not Avaiable', code: 2})
				}
			}
			return res.status(500).json({message: e.toString()})
		}
	}
}

export const login = async (req, res) => {
	const {username, password} = req.body
	try {
		const user = await User.findOne({username}).select('password')
		if (user) {
			const isEqual = await comparePassword(password, user.password)
			if (isEqual) return res.status(200).json({token: createToken(user.username)})
			else return res.sendStatus(401)
		} else return res.sendStatus(404)
	} catch (e) {
		res.status(500).json({message: e.toString()})
	}
}
