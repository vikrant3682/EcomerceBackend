const express = require('express')
const jwtVerify = require('../middleware/jwtVerify');
const orderModel = require('../model/orderModel');
const Razorpay = require('razorpay');
const router = express.Router()


const key_id = "rzp_test_j9y9J7mpIATZVk";
const key_secret = "E0qcrngMstXWyv21bU4ANfW5";






router.post('/',jwtVerify,async(req,res)=>{
    const {email} = req.user;
    const {data,total_price} = req.body;
    try {
        const store = new orderModel({
            email:email,
            products:data,
            total_price:total_price
        })
        await store.save()
        res.send('Your order have save successfully');
    } catch (error) {
        res.send('somthing error')
    }
})


router.post('/order',async(req,res)=>{
    try {
        
        let instance = new Razorpay({
            key_id: key_id,
            key_secret: key_secret,
          });
          let option = {
            amount: Number(req.body.amount) * 100,
            currency: "INR",
          };
          instance.orders.create(option, (err, order) => {
            if (err) {
              return res.send(err);
            } else {
           
              res.send(order);
            }
          });


    } catch (error) {
        res.send('somthing erro')
    }

})


router.post('/verify',async(req,res)=>{
     try {
         
        let body =
        req.body.response.razorpay_order_id +
        "|" +
        req.body.response.razorpay_payment_id;
  
      var expectedSignature = crypto
        .createHmac("sha256", key_secret)
        .update(body.toString())
        .digest("hex");
  
      if (expectedSignature === req.body.response.razorpay_signature) {
        res.send("sign valid");
      } else {
        res.send("sign invalid");
      }


     } catch (error) {
        res.send('somthing erro')
     }
})





module.exports = router;