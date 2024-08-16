import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '請填寫姓名']
  },
  email: {
    type: String,
    required: [true, '請填寫電子郵件']
  },
  subject: {
    type: String,
    required: [true, '請填寫主旨']
  },
  content: {
    type: String,
    required: [true, '請填寫內容']
  }
})

export default model('contacts', schema)
