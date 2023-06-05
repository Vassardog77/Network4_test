import express from 'express'

import { postNotification, getNotification, deleteNotification } from '../controllers/notificationControllers.js'

const router = express.Router()

router.post('/post', postNotification)
router.post('/get', getNotification)
router.post('/delete', deleteNotification)

export default router