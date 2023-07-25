import express from 'express'

import { getPosts, createPosts, deletePost, sendChatKey } from '../controllers/posts.js'

const router = express.Router()

router.get('/', getPosts)
router.post('/', createPosts)
router.delete('/:id', deletePost)
router.post('/chatbot', sendChatKey)

export default router