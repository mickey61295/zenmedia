import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.SECRET_KEY
const authMiddleWare = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]
		if (token) {
			const decoded = jwt.verify(token, secret)
			req.body_id = decoded?.id
		}
		next()
	} catch (error) {
		console.log(error)
	}
}

export default authMiddleWare
