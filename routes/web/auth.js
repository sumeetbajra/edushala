var rs = require('../../misc/rs');
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
        console.log(req.body);
        request({
            method: 'POST',
            json : true,
            url: APIConstants.LOGIN,
            body: req.body
        },
        function(error, response, body) {
            if(!error && response.statusCode === 200) {
                var data = {
                            page: {
                                title: 'Edushala - Dashboard'
                            },
                            userData: body.data
                }
                  req.session.authenticated = true;
                  req.session.user = data.userData;
                  res.render('get_token',{
                      userToken:req.session.user.rs_token,
                      user: JSON.stringify(req.session.user)
                  });

            } else {
                req.flash('error', 'Incorrect username or password!!')
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
                if(!error && response.statusCode === 200) {
                    var data = {
                        page: {
                            title: 'Edushala - Dashboard'
                        },
                        userData: body.data
                    }
                    if(data.userData.user_uuid != null){
                        req.session.authenticated = true;
                        req.session.user = data.userData;
                        res.render('get_token',{
                            userToken:req.session.user.rs_token,
                            user: JSON.stringify(req.session.user)
                        });
                    }
                    else {
                        req.flash('error', 'Email already exists!');
                        res.redirect('/signup');
                    }
                } else {
                    req.flash('error', 'Oops something went wrong!!!');
                    res.redirect('/signup');
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
