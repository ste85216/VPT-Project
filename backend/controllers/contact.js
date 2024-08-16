import Contact from '../models/contact.js'
import { StatusCodes } from 'http-status-codes'

export const create = async (req, res) => {
  try {
    const result = await Contact.create(req.body)

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: '感謝您的聯繫，我們會盡快回覆您。',
      result
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
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
