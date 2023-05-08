import express from 'express'

import { getMessages } from '../controllers/chatControllers.js'

const router = express.Router()

router.post('/', getMessages)

export default router