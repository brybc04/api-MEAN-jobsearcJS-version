const mongoose = require('mongoose');
const config = require('../config/database');


var Skills = mongoose.model('Skills', {
    title: {
        type: String
    },
    description: {
        type: String
    },
    salary: {
        type: Number
    },
    type: {
        type: String
    },
    reqSkills: {
        type: String
    },
    companyName: {
        type: String
    },
    comapanyDescription: {
        type: String
    },
    city: {
        type: String
    },
    creation: {
        type: Date,
    },
    end: {
        type: Date
    }
});

module.exports = Skills;