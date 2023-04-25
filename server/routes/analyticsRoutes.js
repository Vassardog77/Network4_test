import express from 'express'

import { getFbAnalytics,getIgAnalytics } from '../controllers/analyticsControllers.js'

const router = express.Router()

router.post('/ig', getIgAnalytics)
router.post('/fb', getFbAnalytics)

export default router