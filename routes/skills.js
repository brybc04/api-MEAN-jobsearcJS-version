const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Skills = require('../models/skills');
var ObjectId = require('mongoose').Types.ObjectId;

//Creation of CV
router.post('/jobs', (req, res) => {
    let newSkills = new Skills({
        title: req.body.title,
        description: req.body.description,
        salary: req.body.salary,
        type: req.body.type,
        reqSkills: req.body.reqSkills,
        companyName: req.body.companyName,
        comapanyDescription: req.body.comapanyDescription,
        salary: req.body.salary,
        creation: req.body.creation,
        end: req.body.end
        
    });
    newSkills.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in saving: ' + JSON.stringify(err, undefined, 2)); }
    });
});


//get all Skills
router.get('/jobs', (req, res) => {
    Skills.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in saving: ' + JSON.stringify(err, undefined, 2)); }
    });
});

// delete skills
router.delete('/jobs/:id', (req, res) => {
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

    Skills.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Emp update' + JSON.stringify(err, undefined, 2)); }
    });
});

//update skills
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No records with given id : ${req.params.id}');
    let newSkills = {
        title: req.body.title,
        description: req.body.description,
        salary: req.body.salary,
        type: req.body.type,
        reqSkills: req.body.reqSkills,
        companyName: req.body.companyName,
        comapanyDescription: req.body.comapanyDescription,
        salary: req.body.salary,
        creation: req.body.creation,
        end: req.body.end
    };
    Skills.findByIdAndUpdate(req.params.id, { $set: newSkills }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Emp update' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router;