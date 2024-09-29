import {readFile} from 'fs/promises'
import path from 'path'

export const read = async (req, res) => {
	try {
		const accesLog = await readFile(path.join(process.cwd(), 'acces.log'), 'utf-8')
		return res.send(accesLog.split('\n'))
	} catch (e) {
		return res.send(e.toString())
	}
}
