﻿var rs = require('../../misc/rs');
var request = require('request');
var APIConstants = require('../../constants/APIConstants');

function checkAuth (req, res, next) {
    console.log('checkAuth ' + req.url);
    // you should add to this list, for each and every secure url
    if (req.url === '/dashboard' && (!req.session || !req.session.authenticated)) {
        res.render('unauthorised', { status: 403 });
        return;
    }

    next();
}

module.exports = function (ctx) {
    var svc_login = ctx.api.rs_user.service.login;

    var data = {
        page: {title: 'Edushala'}
    };

    ctx.app.post('/auth', function (req, res) {
        var model = rs.data.model({
            schema: ['username','password'],
            data: req.body
        });
        svc_login.login(rs.apply({ model: model }, {
            success: function (results) {
                req.session.user = results.data;
                res.send(results);
            },
            failure: function (error) {
                req.session.user = null;
                res.json(error)
            }
        }));
    });

    ctx.app.get('/login',function(req,res){
        data.page.title = 'Edushala - Login';
        res.render('auth/login', data);
        res.render('auth/login', { message: req.flash('error') });
    });

    ctx.app.post('/loginReq',function(req,res){
        request({
            method: 'POST',
            json : true,
            url: APIConstants.login,
            body: req.body
        },
        function(error, response, body) {
            if(!error && response.statusCode === 200) {
                var data = {
                            page: {
                                title: 'Edushala - Dashboard'
                            },
                            data: body.result
                }
               // console.log(data.data);
                if(data.data.token != null){
                      req.session.authenticated = true;
                      req.session.user = data.data;
                      console.log(req.session.user.token);
                      res.render('get_token',{
                          userToken:req.session.user.token,
                          user: JSON.stringify(req.session.user)
                      });
                }
                else {
                    req.flash('error', 'Username or password did not match!')
                    res.redirect('/login');
                }
            } else {
                req.flash('error', 'Oops error occured, please try again!')
                res.redirect('/login');
            }
        });
    });

    ctx.app.post('/signupReq',function(req,res){
        request({
            method: 'POST',
            json : true,
            url: APIConstants.SIGNUP,
            body: req.body
        },
            function(error, response, body) {
            console.log(response);
                if(!error && response.statusCode === 200) {
                    console.log('aaaaaa');
                    var data = {
                        page: {
                            title: 'Edushala - Dashboard'
                        },
                        data: body.result
                    }
                    console.log(data);
                    if(data.data._id != null){
                        req.session.authenticated = true;
                        req.session.user = data.data.user;
                        res.redirect('/login');
                    }
                    else {
                        req.flash('message', 'Error message');
                        res.redirect('/signup');
                    }
                } else {
                    req.flash('message', 'Error message');
                    res.redirect('/auth/signup');
                }
            });
    });


    ctx.app.get('/signup',function(req,res){
        data.page.title = 'Edushala - Signup';
        res.render('auth/signup',data);
    });

    ctx.app.get('/verification_process',function(req,res){
        data.page.title = 'Edushala - Verifcation Process';
        res.render('verification_process',data);
    });

    ctx.app.get('/forgot', function(req, res){
        data.page.title = 'Edushala - Get Password';
        res.render('auth/forgot', data)
    });

    ctx.app.get('/forgot/reset', function(req, res){
        data.page.title = 'Edushala - Forgot Password';
        data.verify_code = '';
        res.render('auth/forgot_reset', data)
    });

    ctx.app.get('/forgot/reset/:verify_code', function(req, res){
        data.page.title = 'Edushala - Forgot Password';
        data.verify_code = req.params.verify_code;
        res.render('auth/forgot_reset', data)
    });

    ctx.app.get('/forgot/checkemail', function(req, res){
        data.page.title = 'Edushala - Check Email';
        data.message = 'An email has been sent to you with a verification code. ' +
            'Please check your email and click verification link and reset your password. <br><br>Thank you,<br>Edushala Team';
        res.render('message', data)
    });

    ctx.app.get('/forgot/thankyou', function(req, res){
        data.page.title = 'Edushala - Forgot Password';
        data.message = 'You password has been successfully reset.';
        res.render('message', data)
    });

};
