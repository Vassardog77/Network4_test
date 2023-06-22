import express from 'express'

import { getWebhooks } from '../controllers/webhookControllers.js'

const router = express.Router()

router.get('/', getWebhooks)

export default router