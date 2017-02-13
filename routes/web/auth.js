var rs = require('../../misc/rs');

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
        res.render('auth/login',data);
    });
    ctx.app.get('/verification_process',function(req,res){
        data.page.title = 'Edushala - Verifcation Process';
        res.render('verification_process',data);
    });

    ctx.app.get('/signup',function(req,res){
        data.page.title = 'Edushala - Signup';
        res.render('auth/signup',data);
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