const express = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const config = require('../config/config');

const router = express();

router.post('/register', (req, res) => {

    var encryptedPassword = bcrypt.hashSync(req.body.password);

    User.create({
        Name: req.body.name,
        Email: req.body.email,
        Password: encryptedPassword,
        Ocupation: req.body.ocupation,
        Permission: req.body.permission,
        Team: req.body.team,
    },
    (err, User) => {
        if(err){
            return res.status(500).send("Problem while registering the user.");
        }

        var token = jwt.sign({ id: User._id}, config.secret, { expiresIn: 432000 });

        res.status(200).send({ auth: true, token: token, user: User });
    });
});

router.get('/', (req, res) => {

    var token  = req.headers['x-access-token'];

    if(!token){
        return res.status(401).send('Token not provided!')
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token!'});
        }

        res.status(200).send(decoded);
     
    });
});

module.exports = router