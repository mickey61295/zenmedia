import express from 'express'
import authMiddleWare from '../Middleware/authMiddleWare.js'
import {
	deleteUser,
	followUser,
	getAllUsers,
	getUser,
	unFollowUser,
	updateUser,
} from '../Controllers/UserController.js'

const router = express.Router()

router.get('/:id', getUser)
router.get('/', getAllUsers)
router.put('/:id', authMiddleWare, updateUser)
router.delete('/:id', authMiddleWare, deleteUser)
router.put('/:id/follow', authMiddleWare, followUser)
router.put('/:id/unfollow', authMiddleWare, unFollowUser)

export default router
