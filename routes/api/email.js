var express = require('express');
var router = express.Router();
var nodemail = require('nodemailer');

function EmailConfig(req, res) {
    // Not the movie transporter!
    var transporter = nodemail.createTransport({
        service: 'Gmail',
        auth: {
            user: 'binod@rumsan.com', // Your email id
            pass: 'T$mp1234' // Your password
        }
    });
}

var text = 'Hello world';
var mailOptions = {
    from: 'example@gmail.com>', // sender address
    to: 'receiver@destination.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: text
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});