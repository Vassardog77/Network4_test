import express from 'express'

import { postWebhooks } from '../controllers/webhookControllers.js'

const router = express.Router()

router.get('/', postWebhooks)

export default router