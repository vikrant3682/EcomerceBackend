const mongoose = require('mongoose');

const Order = mongoose.Schema({
    email:{
        type:String,
        require:true,
      
    },
   products:{
      type:Array,
      require:true
   },
   total_price:{
    type:String,
    require:true
   },
   Responses:{
       seen:{
        type:Boolean,
       },
       complete:{
        type:Boolean
       },
       outForDelivery:{
        type:Boolean,
       },
       complete:{
        type:Boolean
       }

   }
})

const orderModel = mongoose.model('orderSchema',Order);

module.exports = orderModel;