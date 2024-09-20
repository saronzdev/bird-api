import {Router} from 'express'
import {getPost, createPost, deletePost} from '../controllers/posts.controller.js'

const posts = Router()

posts.get('/:user', getPost)
posts.post('/:username', createPost)
posts.delete('/:username', deletePost)

export default posts
