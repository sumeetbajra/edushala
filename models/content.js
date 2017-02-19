const mongoose = require('mongoose');
const config = require('../config/db');

//Content Schema
var objectId = mongoose.Schema.ObjectId;
const contentSchema = mongoose.Schema({
    objectId : objectId,
    title : {
        type: String
    },
    blogContent : {
        type : String
    },
    isActive : {
        type : Boolean,
        default : true
    },
    dateAdded : {
        type : Date,
        default: Date.now
    }
});

const Content = module.exports = mongoose.model('Content',contentSchema);

