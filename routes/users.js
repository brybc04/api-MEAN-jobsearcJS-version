const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/users');
var ObjectId = require('mongoose').Types.ObjectId;

//Register
router.post('/register', (req, res, next)=> {
   let newUser = new User ({
       name: req.body.name,
       email: req.body.email,
       username: req.body.username,
       password: req.body.password,
       address: req.body.address,
       mainSkills: req.body.mainSkills,
       workExperience: req.body.workExperience,
       education: req.body.education
   });

   User.addUser(newUser, (err,user) => {
       if(err){
           res.json({success: false, msg:'Failed to register user'})
       }else {
           res.json({success: true, msg: 'User registered'});
       }
   });
});


//Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
    return false;
});

//get all registered user
router.get('/register', (req, res) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in saving: ' + JSON.stringify(err, undefined, 2)); }
    });
});



//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err,user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                     success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password' });
            }
        });
    });
});

//get specific user
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No records with given id : ${req.params.id}');

        User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Emp update' + JSON.stringify(err, undefined, 2)); }
    });
});

// delete user
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No records with given id : ${req.params.id}');

    User.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Emp delete' + JSON.stringify(err, undefined, 2)); }
    });
});




//update user
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No records with given id : ${req.params.id}');
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        mainSkills: req.body.mainSkills,
        workExperience: req.body.workExperience,
        education: req.body.education
 
    };
    User.findByIdAndUpdate(req.params.id, { $set: newUser }, {new: true}, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Emp update'  + JSON.stringify(err, undefined, 2)); }
    });
});






// CVV

//Creation of CV
router.post('/skills', (req, res) => {
    let newSkills = new User ({
        mainSkills: req.body.mainSkills,
        workExperience: req.body.workExperience,
        education: req.body.education
    });
    newSkills.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in saving: ' + JSON.stringify(err, undefined, 2)); }
    });
});


//get all Skills
router.get('/skills', (req, res) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in saving: ' + JSON.stringify(err, undefined, 2)); }
    });
});

// delete skills
router.delete('/skills/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No records with given id : ${req.params.id}');

    User.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Emp delete' + JSON.stringify(err, undefined, 2)); }
    });
});

//get specific skill
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No records with given id : ${req.params.id}');

    User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Emp update' + JSON.stringify(err, undefined, 2)); }
    });
});

//update skills
router.put('/skills/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No records with given id : ${req.params.id}');
    let newSkills = {
        mainSkills: req.body.mainSkills,
        workExperience: req.body.workExperience,
        education: req.body.education
    };
    User.findByIdAndUpdate(req.params.id, { $set: newSkills }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Emp update' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', function (req, res, next) {
    Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;