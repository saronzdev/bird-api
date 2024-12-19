import {Router} from 'express'
import {getPost, createPost, deletePost} from '../controllers/posts.controller.js'
import {verifytoken} from '../middlewares/auth.middleware.js'

const posts = Router()

posts.get('/:user', getPost)
posts.post('/:username', verifytoken, createPost)
posts.delete('/:username', verifytoken, deletePost)

export default posts
