import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './database/db.connect.js'
import {verifytoken} from './middlewares/auth.middleware.js'
import {login, register} from './controllers/auth.controller.js'
import users from './routes/users.route.js'
import posts from './routes/posts.route.js'
import path from 'path'
import {infor} from './modules/info.module.js'
import {read} from './modules/read.module.js'

const PORT = process.env.PORT || 3000
const PATH = '/api/v1/'
const app = express()
app.disable('x-powered-by')

app.use(express.static(path.join(process.cwd(), 'public')), infor, cors(), express.json(), express.urlencoded({extended: false}))
app.use(connectDB)
app.post(PATH + 'register', register)
app.post(PATH + 'login', login)
app.use(PATH + 'users', verifytoken, users)
app.use(PATH + 'posts', verifytoken, posts)
app.get('/isAlive', (req, res) => {
	res.send('Server Running Correctly')
})
app.get('/logs', read)
app.use((req, res) => {
	res.status(404).sendFile(path.join(process.cwd(), 'public', '404.html'))
})
app.listen(PORT, (err) => {
	if (err) {
		return console.log(err.toString())
	}
	console.log('Server listen on', process.env.PUBLIC_URL || 'http://localhost:' + PORT.toString())
})
