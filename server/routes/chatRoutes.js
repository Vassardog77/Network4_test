import express from 'express'

import { addPeople, getMessages, renameChat } from '../controllers/chatControllers.js'

const router = express.Router()

router.post('/', getMessages)
router.post('/addpeople', addPeople)
router.post('/rename', renameChat)

export default router