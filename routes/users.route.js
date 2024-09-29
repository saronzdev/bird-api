import {Router} from 'express'
import {getAllUsers, getUser, deleteUser} from '../controllers/users.controller.js'
import {verifytoken} from '../middlewares/auth.middleware.js'

const users = Router()

users.get('/', getAllUsers)
users.get('/:username', getUser)
users.delete('/:username', deleteUser)

export default users
