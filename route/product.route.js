const express = require('express')
const category = require('../ProductData/category');
const products = require('../ProductData/products');
const router = express.Router()


router.get('/category',(req,res)=>{

        res.json(category);

})
router.get('/:gender',(req,res)=>{
    const {gender} = req.params
    try {
        const data = products.filter((elem)=>{
            return elem.category == gender
        })
      return res.json(data)
    } catch (error) {
      return  res.json({
            message:"somthing error"
        })
    }
    
})
router.get('/:gender/:watchCategory',(req,res)=>{
    const {gender,watchCategory} = req.params
    try {
        const data = products.filter((elem)=>{
            return elem.category == gender
        })
        const watchData = data[0].watchCategory.filter((elem)=>{
            return elem.type == watchCategory
        })
      return  res.json({
            category:gender,
            watchCategory:watchData

        })
     
    } catch (error) {
        console.log(error)
      return  res.json({
            message:error
        })
    }
})
router.get('/:gender/:watchCategory/:name/:url',(req,res)=>{
    const {gender,watchCategory,name} = req.params
    try {
        const data = products.filter((elem)=>{
            return elem.category == gender
        })
        const watchData = data[0].watchCategory.filter((elem)=>{
            return elem.type.split(' ')[0] == watchCategory
        })
        const selectedWatch = watchData[0].items.filter((elem)=>{
            console.log(elem.watch_name,'==',name)
            return elem.watch_name == name
        })
      return res.json(selectedWatch)
    } catch (error) {
        console.log(error)
      return  res.json({
            message:error
        })
    }
})

module.exports = router;
