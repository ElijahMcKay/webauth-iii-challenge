// helper imports
const Users = require('../data/db-helpers'); 

const router = require('express').Router(); 
const bcrypt = require('bcryptjs'); 
const secrets = require('../config/secrets'); 

// get requests 
router.get('/users', protected, (req, res) => {
    Users.getUsers({ username })
        .then(user => {

        })
        .catch(err => {
            res.status(500).json({ message: err }); 
        })
})

// post requests
router.post('/register', (req, res) => {
    const body = req.body; 

    let hash = bcrypt.hashSync(body.password, 12); 

    body.password = hash; 

    Users.addUser(body)
        .then(user => {
            res.json(201).json(user); 
        })
        .catch(err => {
            res.status(500).json({ message: err }); 
        })
})

router.post('/login', (req, res) => {
    const body = req.body; 

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password) {
                const token = generateUserToken(user)
                res.status(201).json({ message: `Welcome ${user.username}!`, token }); 
            } else {
                res.status(500).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err }); 
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