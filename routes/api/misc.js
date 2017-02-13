var express = require('express');
var router = express.Router();
var rs = require('../../misc/rs');


module.exports = function (context) {

    var carriers = rs.config.has('rs.raven.carriers') ? rs.config.get('rs.raven.carriers'): null;
    var raven = new rs.raven({carriers: carriers});

    var tplMgr = require('../../public/templates/email');

    router.post('/contact', function (req, res) {
        var tpl = tplMgr.contact;
        raven.send({
            data: req.body,
            body: tpl.body,
            from: tpl.from,
            to: tpl.to,
            subject: tpl.subject
        }, {
            success: function (results) {
                res.send(results);
            },
            fail: function (error) {
                res.json(error);
            }
        });
    });

    router.post('/proposal', function (req, res) {
        var tpl = tplMgr.proposal;
        raven.send({
            data: req.body,
            body: tpl.body,
            from: tpl.from,
            to: tpl.to,
            subject: tpl.subject
        }, {
            success: function (results) {
                res.send(results);
            },
            fail: function (error) {
                res.json(error)
            }
        });
    });

    return router;
};
