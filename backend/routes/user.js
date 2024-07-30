import { Router } from 'express'
import admin from '../middlewares/admin.js'
import { create, login, extend, profile, logout, getAll, edit, get, getId, remove } from '../controllers/user.js'
import * as auth from '../middlewares/auth.js' // import { login } from '../middlewares/auth.js'

const router = Router()

router.post('/', create)
router.post('/login', auth.login, login)
router.patch('/extend', auth.jwt, extend)
router.get('/profile', auth.jwt, profile)
router.delete('/logout', auth.jwt, logout)

// 新增的路由
router.get('/', get) // 獲取所有用戶
router.get('/all', auth.jwt, admin, getAll) // 只有管理員可以查看所有用戶
router.get('/:id', auth.jwt, getId) // 根據 ID 獲取單個用戶
router.patch('/:id', auth.jwt, admin, edit) // 只有管理員可以編輯用戶
router.delete('/:id', auth.jwt, admin, remove) // 只有管理員可以刪除用戶

export default router
