import {Router} from 'express'
import {getPosts, getPost, createPost, deletePost} from '../controllers/posts.controller.js'
import {verifytoken} from '../middlewares/auth.middleware.js'

const posts = Router()

posts.get('/', getPosts)
posts.get('/:user', getPost)
posts.post('/:username', verifytoken, createPost)
posts.delete('/:username', verifytoken, deletePost)

export default posts
