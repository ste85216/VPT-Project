import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '請輸入商品名稱']
  },
  price: {
    type: Number,
    required: [true, '請輸入商品價格'],
    min: [0, '商品價格最少 0 元']
  },
  image: {
    type: String,
    required: [true, '請上傳商品圖片']
  },
  color: {
    type: [String]
  },
  size: {
    type: [String]
  },
  category: {
    type: String,
    required: [true, '商品分類必填'],
    enum: {
      values: ['排球衣', '排球褲', '排球', '護具', '球鞋', '其他'],
      message: '商品分類錯誤'
    }
  },
  sell: {
    type: Boolean,
    required: [true, '請選擇是否上架']
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('products', schema)
