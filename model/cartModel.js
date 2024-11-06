const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema(
   [
    {
        email:{
            type:String,
            ref:'userSchemas',
            require:true
        },
        category:{
            type:String,
            require:true
        },
        name:{
            type:String,
            require:true
        },
        url:{
            type:String,
            require:true
        },
        price:{
            type:String,
            require:true
        },
        qty:{
            type:Number,
            default:1,
        }
    }
   ],
 
)
const cartModel = mongoose.model('CartSchema',CartSchema)
module.exports = cartModel;