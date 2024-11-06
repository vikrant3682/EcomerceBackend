// routes/auth.js
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const jwtVerify = require('../middleware/jwtVerify');


router.get('/',jwtVerify,(req,res)=>{
  
  res.json({
    name:req.user.name
  })
});

router.post('/signup', async (req, res) => {
    console.log(req.body)
  const {name, email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new userModel({name, email, password });
    await user.save();

    

    // Sign JWT
    jwt.sign(
      {email},
      'ecomerce202',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({name, token });
      }
    );

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      // Validate password
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      
  
      // Sign JWT
      jwt.sign(
        {name:user.name,email},
        'ecomerce202',
        { expiresIn:'1h' },
        (err, token) => {
          if (err) throw err;
          res.json({name:user.name, token });
        }
      );
  
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  


module.exports = router;
