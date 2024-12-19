import User from '../models/users.model.js'
import getDate from '../modules/date.module.js'

export async function getPosts(req, res) {
  try {
    const data = await User.find().select('posts')
    if (data) {
      return res.cookie('myCookie', 'cookieValue', {
        httpOnly: true, // La cookie no es accesible desde JavaScript
        secure: true,   // La cookie solo se envía a través de HTTPS
        sameSite: 'None' // Permite el uso de la cookie en contextos de sitios cruzados
      }).json(data)
    }
    else {
      return res.status(404).json({msg: 'No posts'})
    }
  }
  catch(e) {
    return res.status(500).json({msg: e.toString()})
  }  
} 

export const getPost = async (req, res) => {
  const {user} = req.params
	const {token} = req
	try {
		const {name, username, posts} = await User.findOne({username: user}).select('name username posts')
		if (posts.length !== 0) {
			if (token) res.json({isPosts: true, name, username, posts, token})
			else res.json({isPosts: true, name, username, posts})
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
	const {token} = req
	if (post) {
		try {
			const userData = await User.findOne({username})
			if (userData) {
				let id
				userData.posts.length === 0 ? (id = 0) : (id = userData.posts[userData.posts.length - 1].id + 1)

				const newPost = userData.posts.concat({
					id,
					body: post,
					createdAt: getDate(),
				})
				const data = await User.findOneAndUpdate({username}, {posts: newPost}, {new: true, select: {name: 1, username: 1, posts: 1}})
				if (token) res.json({...data.toObject(), token})
				else res.json(data)
			} else {
				res.sendStatus(404)
			}
		} catch (e) {
			res.json(e.toString())
		}
	} else return res.status(405).json({message: 'Post Is Missing'})
}

export const deletePost = async (req, res) => {
	const {username} = req.params
	const {postId} = req.body
	const {token} = req
	try {
		const data = await User.findOne({username})
		if (data) {
			const filterData = data.posts.filter((post) => post.id !== postId)
			if (filterData.length !== data.posts.length) {
				const updateData = await User.findOneAndUpdate({username}, {posts: filterData}, {new: true}).select('posts')
				if (token) res.json({message: 'Deleted Post', token})
				else res.json({message: 'Deleted Post'})
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
