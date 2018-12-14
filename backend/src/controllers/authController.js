const express = require('express');
var cors = require('cors')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const config = require('../config/config');

const router = express();

router.post('/register' ,(req, res) => {

    var encryptedPassword = bcrypt.hashSync(req.body.userInfo.password, 10);

    User.create({
        Name: req.body.userInfo.name,
        Email: req.body.userInfo.email,
        Password: encryptedPassword,
        Ocupation: req.body.userInfo.ocupation,
        Team: req.body.userInfo.team
    },
    (err, User) => {
        if(err){
            return res.status(500).send("Problem while registering the user.");
        }       

        res.status(200).send({ user: User });
    });
});



router.get('/getUsers', (req, res) => {
    User.find({}, (err, users) => {
        if(!err){
            res.status(200).send({ Users: users });
        }
        else{
            throw err;
        }
    })
})

router.delete('/deleteUsers', (req, res) => {
    User.deleteMany({}, (err, users) => {
        if(!err){
            res.status(200).send({ Users: users });
        }
        else{
            throw err;
        }
    })
})

router.get('/tokenAuth', (req, res, next) => {

    var token  = req.body.token || req.query.token;
    if(!token){
        return res.status.send('Must pass Token!');
    }

    jwt.verify(token, config.secret, (err, user) => {
        if(err) throw err;

        User.findById({
            id: user._id
        }, (err, user) => {
            if(err) throw err;

            return res.status(200).send({
                user: user,
                token: token
            })
        })
    })
    
});
 
router.post('/login', (req, res) => {    

    User.findOne({
        Email: req.body.email        
    }).exec((err, user) => {
        if(err) {
            throw err;
        }

        if(!user){
            return res.status(404).json({                
                error: true, 
                message: 'User not found'
            });
        } 
        
        if(!bcrypt.compareSync(req.body.password, user.Password)){
            return res.status(404).json({
                error: true,
                message: 'Password or email does not match'   
            })
        }

        var token = jwt.sign({ id: User._id}, config.secret, { expiresIn: 432000 });

        res.status(200).send({ auth: true, token: token, user: User });
        
    })
})

router.get('/protected', () => {
    
})



module.exports = router