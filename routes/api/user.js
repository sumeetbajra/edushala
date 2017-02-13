var express = require('express');
var router = express.Router();

module.exports = function (context) {
    var user = context.service.user;

    router.get('/enrolled', function (req, res) {
        user.listEnrolled({
            data: {user_uuid:req.params.user_uuid},
            success: function (results) {
                res.send(results);
            },
            failure: function (error) {
                res.json(error)
            }
        })
    });

    router.get('/teaching', function (req, res) {
        user.listTeaching({
            data: {user_uuid:req.params.user_uuid},
            success: function (results) {
                res.send(results);
            },
            failure: function (error) {
                res.json(error)
            }
        })
    });

  return router;
};