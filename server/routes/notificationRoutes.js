import express from 'express'

import { postNotification, getNotification, deleteNotification, updatePushToken } from '../controllers/notificationControllers.js'

const router = express.Router()

router.post('/post', postNotification)
router.post('/get', getNotification)
router.post('/delete', deleteNotification)
router.post('/update', updatePushToken)

export default router