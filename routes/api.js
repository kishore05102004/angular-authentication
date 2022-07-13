// const express = require('express')
// const jwt = require('jsonwebtoken')

// const router = express.Router()
// const User = require('../models/user')
// const mongoose =require('mongoose')
// const db ="mongodb+srv://kishore:user123@cluster0.jxktw.mongodb.net/test"

// mongoose.connect(db,err => {
//     if(err){
//         console.error("error"+ err)
//     }
//     else{
//         console.log('connect to mongoDB')
//     }
// })

// router.get('/',(req,res)=>{
//     res.send("from api route")
// })

// router.post('/register',(req,res)=>{
//     let UserData = req.body
//     let user = new User(UserData)
//     user.save((error,registeredUser)=>{
//         if (error){
//             console.log(error)
//         }
//         else
//         {
//             let payload ={ subject : registeredUser._id }
//             let token = jwt.sign(payload,'secretkey')
//             // res.status(200).send(registeredUser)
//             res.status(200).send({token})

//         }
//     })

// })

// router.post('/login',(req,res)=>{
//     let userData = req.body

//     User.findOne({email: userData.email }, (err, user)=>{ 
//         if (err){
//             console.log(err)
//         }
//         else{
//             if(!user){
//                 res.status(401).send('invalid email')
//             }
//             else if(user.password !==userData.password){
//                 res.status(401).send('invalid pass')
//             }
//             else
//             {
//                 let payload = { subject : user._id }
//                 let token = jwt.sign(payload,'secretkey')
//                 res.status(200).send({token})
//             }
//         }
//     })
// } )

// router.get('/events',(req,res)=>{
//     let events =[
//         {"id":"1","name":"flashma","date":"01-08-2022"},
//         {"id":"1","name":"sport","date":"02-08-2022"},
//         {"id":"1","name":"pub","date":"03-08-2022"},
//         {"id":"1","name":"dance","date":"04-08-2022"},

//     ]

//     res.json(events)
// })


// router.get('/special',(req,res)=>{
//     let events =[
//         {"id":"1","name":"drinks","date":"07-08-2022"},
//         {"id":"1","name":"casio","date":"09-08-2022"},
//         {"id":"1","name":"cricket","date":"11-08-2022"},
//         {"id":"1","name":"race","date":"14-08-2022"},


//     ]

//     res.json(events)
// })

// module.exports = router 


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const db = "mongodb://testuser:testpw@ds123136.mlab.com:23136/eventsdb";
// mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/events', (req,res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(specialEvents)
})

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)      
    } else {
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({email: userData.email}, (err, user) => {
    if (err) {
      console.log(err)    
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else 
      if ( user.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
})

module.exports = router;