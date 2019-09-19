const express = require('express'); 
const helmet = require('helmet'); 
const cors = require('cors'); 


// router imports
const userRouter = require('./routers/userRouter'); 

// creating server
const server = express(); 
server.use(helmet()); 
server.use(cors()); 
server.use(express.json()); 

server.use('/api/', userRouter); 


module.exports = server; 