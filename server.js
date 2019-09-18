const express = require('express'); 
const helmet = require('helmet'); 
const cors = require('cors'); 

// router imports
const userRouter = require('./routers/userRouter'); 

// creating server
const server = express(); 

server.use('/api/', userRouter); 
server.use(helmet()); 
server.use(cors()); 

module.exports = server; 