import express from 'express'

import { likePost } from '../controllers/likeControllers.js'

const router = express.Router()

router.post('/', likePost)

export default router