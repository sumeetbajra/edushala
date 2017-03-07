var rs = require('../../misc/rs');
var express = require('express');
var mung = require('express-mung');
var router = express.Router();

//Uncomment these as needed
//var jwt = require('jsonwebtoken');;

/* GET home page. */
module.exports = function (ctx) {

    //Add functions that will be executed before any route for example validating rs_token (jwt tokens).
    router.all('*', function (req, res, next) {
        var rs_token = req.headers['rs_token'];
        var tokenUtil = rs.user.util.token();
        if (rs_token) {

            var decoded_data = tokenUtil.verify(rs_token);
            ctx.current_user = decoded_data.data;
        }
        ctx.router = {
            req: req,
            res: res,
            next: next
        };
        ctx.session_id = 1;
        next();
    });

    //Use Rumsan curated response. For example it removes unnecessary braces from seriate response
    function modifyToRS(body, req, res) {
        return rs.web.response(body);
    }
    ctx.app.use(mung.json(modifyToRS));

    //Instantiate all routes passing app context
    var misc = require('./misc')(ctx);
    var kachha = require('./kachha')(ctx);
    this.user = require('./user')(ctx);


    //Create route paths
    ctx.app.use('/api/1', router);
    ctx.app.use('/api/1/misc', misc);
    ctx.app.use('/api/1/course', kachha);
    ctx.app.use('/api/1/user', kachha);
};