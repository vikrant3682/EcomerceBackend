const express = require('express')
require('../config/db')
const cartModel = require('../model/cartModel')
const jwtVerify = require('../middleware/jwtVerify')

const router = express.Router()


router.get('/',jwtVerify,async(req,res)=>{
     const {email} = req.user;
     try {
       const data = await cartModel.find({email});
     
       res.json(data);
     } catch (error) {
      res.send('somthing error')
     }
})


router.post('/',jwtVerify,async(req,res)=>{
   const {email} = req.user;
   const {category, name,url,price} = req.body
   try {
      const product = await cartModel.findOne({email,name,url});
      if(product){
         return res.send('already added');
      }
      const data = new cartModel({
         email,category,name,url,price
      })
      await data.save();
      return res.send('save')
   } catch (error) {
      return res.send('somthing error')
   }
})

router.put('/:id',jwtVerify,async(req,res)=>{
   
    const {id} = req.params;
    const {qty} = req.body;
    try {
      await cartModel.updateOne({_id:id},{qty});
      return res.send('updated')
    } catch (error) {
      return res.send('somthing error')
    }
})

router.delete('/:id',jwtVerify,async(req,res)=>{
      const {id} = req.params;
      try {
         await cartModel.deleteOne({_id:id});
         res.send('deleted')
      } catch (error) {
         res.send('somthing error')
      }
})


module.exports = router