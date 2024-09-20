export const verifytoken = async (req, res, next) => {
	const {method} = req
	if (method === 'GET' || method === 'DELETE') {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return res.status(401).json({message: 'No Loged'})
		}
		try {
			const {username} = await jwt.verify(token, secretKey)
			if (username) {
				req.username = username
				next()
			} else return res.sendStatus(401)
		} catch {
			return res.sendStatus(401)
		}
	} else return res.sendStatus(405)
}
