import User from '../models/users.model.js'
import getDate from '../modules/date.module.js'

export const getPost = async (req, res) => {
	const {user} = req.params
	try {
		const {name, username, posts} = await User.findOne({username: user}).select('name username posts')
		if (posts.length !== 0) {
			res.json({isPosts: true, name, username, posts})
		} else {
			res.status(404).json({isPosts: false})
		}
	} catch (e) {
		res.status(500).json({msg: e.errmsg})
	}
}

export const createPost = async (req, res) => {
	const {username} = req.params
	const {post} = req.body
	try {
		const userData = await User.findOne({username})
		if (userData) {
			let id
			userData.posts.length === 0 ? (id = 0) : (id = userData.posts[userData.posts.length - 1].id + 1)
			console.log(id)
			const newPost = userData.posts.concat({
				id,
				body: post,
				createdAt: getDate(),
			})
			const data = await User.findOneAndUpdate({username}, {posts: newPost}, {new: true, select: {name: 1, username: 1, posts: 1}})
			data && res.json(data)
		} else {
			res.sendStatus(404)
		}
	} catch (e) {
		res.end(e.toString())
	}
}

export const deletePost = async (req, res) => {
	const {username} = req.params
	const {postId} = req.body
	try {
		const data = await User.findOne({username})
		if (data) {
			const filterData = data.posts.filter((post) => post.id !== postId)
			if (filterData.length !== data.posts.length) {
				const updateData = await User.findOneAndUpdate({username}, {posts: filterData}, {new: true}).select('posts')
				updateData && res.json({message: 'Deleted Post'})
			} else {
				res.status(404).json({message: 'Post Not Found'})
			}
		} else {
			res.status(404).json({message: 'User Not Found'})
		}
	} catch (e) {
		res.status(500).json({message: e.toString()})
	}
}
