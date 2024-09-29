import path from 'path'
import getDate from './date.module.js'
import {createWriteStream} from 'fs'

export const writeLog = createWriteStream(path.join(process.cwd(), 'acces.log'), {flags: 'a'})

export const infor = (req, res, next) => {
	const {originalUrl, method} = req
	const {statusCode} = res
	const contentLength = JSON.stringify(req.headers).length
	const time = getDate()
	const start = Date.now()

	res.on('finish', () => {
		const duration = Date.now() - start
		if (method !== 'OPTIONS') writeLog.write(`${method} ${statusCode} ${originalUrl} ${duration}ms ${contentLength} ${time.time} ${time.date}\n`)
	})
	next()
}
