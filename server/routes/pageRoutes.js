import express from 'express'

import { getFbPages } from '../controllers/pageControllers.js'

const router = express.Router()

router.post('/', getFbPages)

export default router