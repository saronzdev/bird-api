import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	posts: {
		type: [
			{
				_id: false,
				id: {
					type: Number,
					required: true,
					sparse: true,
				},
				body: {
					type: String,
					required: true,
				},
				createdAt: {
					type: Object,
					required: true,
				},
			},
		],
		required: false,
	},
	createdAt: {
		type: Object,
		required: true,
	},
})

const User = mongoose.model('Users', userSchema)

export default User
