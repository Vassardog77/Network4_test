import express from 'express'

import { postComment } from '../controllers/commentControllers.js'

const router = express.Router()

router.post('/', postComment)

export default router