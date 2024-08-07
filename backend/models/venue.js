import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '球場名稱必填']
  },
  images: {
    type: [String],
    required: [true, '球場圖片必填'],
    validate: {
      validator: function (v) {
        return v.length > 0
      },
      message: '需要一張球場圖片'
    }
  },
  address: {
    type: String,
    required: [true, '球場地址必填']
  },
  category: {
    type: String,
    required: [true, '商品分類必填'],
    enum: {
      values: ['球衣', '球褲', '球襪', '球鞋', '排球', '護具', '其他'],
      message: '商品分類錯誤'
    }
  },
  sell: {
    type: Boolean,
    required: [true, '商品上架狀態必填']
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('products', schema)
