import express from 'express'
import cors from 'cors'
import path from 'path'
import connectDB from './src/database/db.connect.js'
import {login, register} from './src/controllers/auth.controller.js'
import users from './src/routes/users.route.js'
import posts from './src/routes/posts.route.js'
import  session from 'express-session'

const PORT = process.env.PORT || 3000
const PATH = '/api/v1/'
const app = express()
app.disable('x-powered-by')


app.use(cors())
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    sameSite: 'none'
  }
}))
app.use(express.static(path.join(process.cwd(), 'public')), express.json(), express.urlencoded({extended: false}))
app.use(connectDB)
app.post(PATH + 'register', register)
app.post(PATH + 'login', login)
app.use(PATH + 'users', users)
app.use(PATH + 'posts', posts)
app.get('/isAlive', (req, res) => {
	res.send('Server Running Correctly')
})
app.use((req, res) => {
	res.status(404).sendFile(path.join(process.cwd(), 'public', '404.html'))
})
app.listen(PORT, (err) => {
	if (err) {
		return console.log(err.toString())
	}
	console.log('Server listen on', process.env.PUBLIC_URL || 'http://localhost:' + PORT.toString())
})
