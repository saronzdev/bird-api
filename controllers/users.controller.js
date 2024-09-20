import User from '../models/users.model.js'

export const getAllUsers = async (req, res) => {
	try {
		const data = await User.find().select('name username posts')
		if (data) {
			return res.json(data)
		} else return res.sendStatus(404)
	} catch (e) {
		return res.status(500).json({message: e.toString()})
	}
}

export const getUser = async (req, res) => {
	const userParam = req.params.username
	const userReq = req.username
	if (userParam === userReq) {
		try {
			const data = await User.findOne({username: userParam}).select('name username email createdAt')
			if (data) return res.json(data)
			else return res.sendStatus(404)
		} catch (e) {
			return res.status(500).json({message: e.toString()})
		}
	} else return res.status(401).json({message: 'Have Not Acces'})
}

export const deleteUser = async (req, res) => {
	const userParam = req.params.username
	const userReq = req.username
	if (userParam === userReq) {
		try {
			const data = await User.deleteOne({username: userParam})
			if (data) return res.json({message: 'User Deleted'})
			else return res.status(404).json({message: 'User Not Found'})
		} catch (e) {
			return res.status(500).json({message: e.toString()})
		}
	} else return res.status(401).json({message: 'Have Not Acces'})
}
