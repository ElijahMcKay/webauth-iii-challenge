const router = require('express').Router(); 
const bcrypt = require('bcryptjs'); 
const secrets = require('../config/secrets'); 
const restricted = require('../middleware/restricted-middleware')
// const jwt = require('jsonwebtoken'); 

const Users = require('../data/db-helpers'); 

// get requests 
router.get('/users', restricted, (req, res) => {
    Users.getUsers({ username })
        .then(user => {
            res.status(201).json(user); 
        })
        .catch(err => {
            res.status(500).json({ message: err }); 
        })
})

// post requests
router.post('/register', (req, res) => {
    const body = req.body

    let hash = bcrypt.hashSync(body.password, 12); 

    body.password = hash; 

    Users.addUser(body)
        .then(user => {
            res.status(201).json(user); 
        })
        .catch(err => {
            res.status(500).json(err); 
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;  

    Users.findBy(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateUserToken(user)
                res.status(201).json({ message: `Welcome ${user.username}!`, 
                token 
            }); 
            } else {
                res.status(501).json('Error')
            }
        })
        .catch(err => {
            res.status(500).json({ message: `${err}` }); 
        })
})

function generateUserToken(user) {
    const payload = {
        subject: user.id, 
        username: user.username
    }

    const options = { 
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router; 