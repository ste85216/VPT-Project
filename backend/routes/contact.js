import { Router } from 'express'
import { create } from '../controllers/contact.js'

const router = Router()

router.post('/', create)
