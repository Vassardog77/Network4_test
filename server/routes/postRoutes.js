import express from 'express'

import { postIgPosts, prepIgPosts } from '../controllers/postControllers.js'

const router = express.Router()

//router.post('/fb', postFbPosts)
router.post('/ig1', prepIgPosts)
router.post('/ig2', postIgPosts)

export default router