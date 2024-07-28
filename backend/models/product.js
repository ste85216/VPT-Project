import { Schema, model } from "mongoose";

const Schema = new Schema({
  name: {
    type: String,
    required: [true, '請輸入商品名稱']
  }
})