var express = require('express');
var router = express.Router();

module.exports = function (context) {
    var kachha = context.service.kachha;
    var params;

    router.all('*', function (req, res, next) {
        params = {};
        params.success = function (results) {
            res.send(results);
        };
        params.failure = function (error) {
            res.json(error);
        };
        params.data = req.body;
        next();
    });

    router.get('/list', function (req, res) {
        params.data = {
            price: req.query.price || 0,
            category: req.query.category || 'all',
            special_tag: req.query.tag || '',
            ratings: req.query.ratings || ''
        };
        kachha.listKachha(params)
    });

    router.post('/', function (req, res) {
        kachha.get(params)
    });

    router.get('/flag/:flag', function (req, res){
        params.data = {flag:req.params.flag};
        kachha.listByFlag(params)
    });

    router.get('/category/:category', function (req, res) {
        params.data ={category:req.params.category};
        kachha.listByCategory(params);
    });

    router.get('/enrolled', function (req, res) {
        params.data = {user_uuid:context.current_user.user_uuid};
        kachha.listEnrolled(params)
    });

    router.get('/teaching', function (req, res) {
        console.log(context.current_user);
        params.data = {user_uuid:context.current_user.user_uuid};
        kachha.listTeaching(params);
    });

   router.post('/enroll', function (req, res) {
        params.data = {
            class_uuid:req.body.class_uuid,
            user_uuid:req.body.user_uuid,
            coupon:req.body.coupon
        };
        kachha.enroll(params)
    });

   router.post('/is_enrolled',function (req,res) {
       params.data = {
           class_uuid:req.body.class_uuid,
           user_uuid:req.body.user_uuid
       };
       kachha.isEnrolled(params)
   });

    router.get('/subscribe/:email', function (req, res) {
        params.data = {
            email:req.params.email
        };
        kachha.subscribe(params)
    });

    router.get('/completed', function (req, res) {
        params.data = {
           par:''
        };
        kachha.completedCourses(params)
    });

    router.post('/search', function (req, res){
        params.data = {search_text:req.params.search_text};
        kachha.searchByKey(params);
    });

    router.get('/:class_uuid', function (req, res) {
        params.data ={class_uuid:req.params.class_uuid};
        kachha.get(params)
    });

    router.get('/:class_uuid/students/', function (req, res){
        params.data ={class_uuid:req.params.class_uuid};
        kachha.getStudentsByClass(params)
    });

    router.post('/:class_uuid/coupon', function (req, res) {
        params.data = {
            class_uuid:req.params.class_uuid,
            coupon:req.params.coupon,
            SessionID:req.params.SessionID
        };
        kachha.getCoupon(params);
    });


    return router;
};

