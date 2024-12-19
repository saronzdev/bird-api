import {Router} from 'express'
import {getAllUsers, getUser, getUserById, deleteUser} from '../controllers/users.controller.js'
import {verifytoken} from '../middlewares/auth.middleware.js'

const users = Router()

users.get('/', getAllUsers)
users.get('/id/:id', getUserById)
users.get('/:username', verifytoken, getUser)
users.delete('/:username', verifytoken, deleteUser)

export default users
