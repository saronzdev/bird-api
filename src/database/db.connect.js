import mongoose from 'mongoose'
import 'dotenv/config'

let first = true

const connectDB = async (req, res, next) => {
	try {
		const data = await mongoose.connect(process.env.MONGODB_URI)
		if (first) {
			console.log('Database Connected')
			first = false
		}
		next()
	} catch (e) {
		return res.status(500).json({
			message: 'Database Error',
			error: e.toString(),
		})
	}
}

export default connectDB
