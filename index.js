import express from 'express'
import cors from 'cors'
import connectDB from './database/db.connect.js'
import {login, register} from './controllers/auth.controller.js'
import users from './routes/users.route.js'
import posts from './routes/posts.route.js'

const PORT = process.env.PORT || 3000
const PATH = '/api/v1/'
const app = express()
app.disable('x-powered-by')

app.use(cors(), express.json(), express.urlencoded({extended: false}))
app.use(connectDB)
app.post(PATH + 'register', register)
app.post(PATH + 'login', login)
app.use(PATH + 'users', users)
app.use(PATH + 'posts', posts)

app.listen(PORT, (err) => {
	if (err) {
		return console.log(err.toString())
	}
	console.log('Server listen on http://localhost:' + PORT)
})
