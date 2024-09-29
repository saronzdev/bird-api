import path from 'path'
import {createWriteStream} from 'fs'

const writeLog = createWriteStream(path.join(process.cwd(), 'acces.log'), {flags: 'a'})

export const saronzreq = (req, res, next) => {
	const {originalUrl, method} = req
	const {statusCode} = res
	const contentLength = JSON.stringify(req.headers).length
	const time = new Date().toISOString()
	writeLog.write(`${method} ${statusCode} ${originalUrl} ${contentLength} ${time}\n`)
	next()
}
