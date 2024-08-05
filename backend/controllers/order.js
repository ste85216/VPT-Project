import Order from '../models/order.js'
import User from '../models/user.js'
import { StatusCodes } from 'http-status-codes'

export const create = async (req, res) => {
  try {
    if (req.user.length === 0) throw new Error('EMPTY')
    const user = await User.findById(req.user._id, 'cart').populate('cart.p_id')
    const ok = user.cart.every(item => item.p_id.sell)
    if (!ok) throw new Error('SOLD_OUT')

    await Order.create({ user: req.user._id, cart: user.cart })
    // 清空購物車
    req.user.cart = []
    await req.user.save()

    res.status(StatusCodes.OK).json({
      success: true,
      message: ''
    })
  } catch (error) {
    if (error.name === 'EMPTY') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: true,
        message: '購物車是空的'
      })
    } else if (error.name === 'SOLD_OUT') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: true,
        message: '商品已售完'
      })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
}

export const get = async (req, res) => {
  try {
    const result = await Order.find({ user: req.user._id }).populate('cart.p_id')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const result = await Order.find().populate('user', 'account').populate('cart.p_id')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}
