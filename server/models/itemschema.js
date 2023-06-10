const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    title:String,
    completeState:{type:Boolean,default:false}
})

const Item=mongoose.model('item',schema)

module.exports= Item