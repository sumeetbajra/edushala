// This file is to add or override any rs (Rumsan provided) class or methods;
var path = require('path');
var rs = require('rs');
//rs.user= require('../../../../rs/user');
// rs.data = require('../../../../rs/data');
rs.user = require('rs.user');
rs.data = require('rs.data');

rs.config.rs.user.templates.email = path.resolve('public/templates/email', 'index.js')

module.exports = rs;