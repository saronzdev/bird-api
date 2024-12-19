import express from 'express'
import cors from 'cors'
import path from 'path'
import connectDB from './src/database/db.connect.js'
import {login, register} from './src/controllers/auth.controller.js'
import users from './src/routes/users.route.js'
import posts from './src/routes/posts.route.js'
import expressSession from 'express'

const PORT = process.env.PORT || 3000
const PATH = '/api/v1/'
const app = express()
app.disable('x-powered-by')

if (process.env.NODE_ENV === "development"){
  app.use(
    cors({
      origin: "https://localhost:3000",
      credentials: true,
    })
  )
}

if (process.env.NODE_ENV === "production"){
  app.use(
    cors({
      origin: "https://bird-dusky.vercel.app",
      credentials: true,
    })
  )
}

if (process.env.NODE_ENV === "development"){
  res.cookie("token", token, {
  // can only be accessed by server requests
  httpOnly: true,
  // path = where the cookie is valid
  path: "/",
  // domain = what domain the cookie is valid on
   domain: "localhost",
  // secure = only send cookie over https
  secure: false,
  // sameSite = only send cookie if the request is coming from the same origin
  sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
  // maxAge = how long the cookie is valid for in milliseconds
  maxAge: 3600000, // 1 hour
})
}

if (process.env.NODE_ENV === "production"){
  res.cookie("token", token, {
  // can only be accessed by server requests
  httpOnly: true,
  // path = where the cookie is valid
  path: "/",
  // secure = only send cookie over https
  secure: true,
  // sameSite = only send cookie if the request is coming from the same origin
  sameSite: "none", // "strict" | "lax" | "none" (secure must be true)
  // maxAge = how long the cookie is valid for in milliseconds
  maxAge: 3600000, // 1 hour
})
}


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
