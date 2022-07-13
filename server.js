const express =require('express')

const bodyParser = require('body-parser')

const cors=require('cors')

const api = require('./routes/api')

const PORT = 3000

const app=express()

app.use(cors())

app.use(bodyParser.json())

app.use('/api',api)

app.get('/',function(req,res){
    res.send("hello from the server")
})

app.listen(PORT, function() {
    console.log('server running on localhost:' +PORT)
    
})