var rs = require('../../misc/rs');
var request = require('request');
var APIConstants = require('../../constants/APIConstants');

module.exports = function (ctx) {

    var data = {
        page: {title: 'Edushala'}
    };

    //Create route paths
  //  ctx.app.get('/', index);
   /* ctx.app.get('/about', function(req, res){
        res.render('about', {
            name: 'binod',
            hobby: 'stamp collecting',
            school: {
                name:'Pulchowk Campus'
            }
        });
    }); */

    ctx.app.get('/about', function(req, res){
        data.page.title = 'Edushala - About';
        res.render('about', data)
    });

    ctx.app.get('/', function(req, res){
        request.get(APIConstants.COURSE, function(error, response, body) {
            if(!error && response.statusCode === 200) {
                var data = {
                    page: {
                        title: 'Edushala - Home'
                    },
                    courses: JSON.parse(body).result
                }
                res.render('index', data);
            }
        })
    });

    ctx.app.get('/dashboard', function(req, res){
        data.page.title = 'Dashboard';
        res.render('dashboard', data)
    });

    ctx.app.get('/teach',function(req,res){
        data.page.title = 'Edushala - Teach';
        res.render('teach/teach',data);
    });

    ctx.app.get('/learn',function(req,res){
        request.get(APIConstants.COURSE, function(error, response, body) {
            if(!error && response.statusCode === 200) {
                var data = {
                    page: {
                        title: 'Edushala - Learn'
                    },
                    courses: JSON.parse(body).result
                }
                res.render('learn', data);
            }
        })
    });

    ctx.app.get('/terms',function(req,res){
        data.page.title = 'Edushala - Terms & Conditions';
        res.render('terms',data);
    });

    ctx.app.get('/college',function(req,res){
        data.page.title = 'Edushala - Courses for College';
        res.render('college_courses',data);
    });

    ctx.app.get('/school',function(req,res){
        data.page.title = 'Edushala - Courses for School';
        res.render('school_courses',data);
    });

    ctx.app.get('/corporate',function(req,res){
        data.page.title = 'Edushala - Courses for Corporate';
        res.render('corporate_courses',data);
    });

    ctx.app.get('/logout_process',function(req,res){
        data.page.title = 'Edushala - Logging out';
        res.render('logout_process',data);
    });

    ctx.app.get('/learn/:id',function(req,res){
        request.get(APIConstants.COURSE, function(error, response, body) {
            if(!error && response.statusCode === 200) {
                var data = {
                    page: {
                        title: 'Edushala - Course'
                    },
                    courses: JSON.parse(body).result
                }
                res.render('learn', data);
            }
        })
        // ctx.api.services.kachha.get({
        //     data: {class_uuid:req.params.class_uuid},
        //     success: function (results) {
        //         var data = {
        //             page: {title: results.course.name},
        //             kachha: results
        //         };
        //         res.render('course_details',data);
        //     },
        //     failure: function (error) {
        //         res.json(error)
        //     }
        // });
    });


    ctx.app.get('/how',function(req,res){
        data.page.title = 'Edushala - How It Works';
        res.render('how',data);
    });

    ctx.app.get('/contact',function(req,res){
        data.page.title = 'Edushala - Contact Us';
        res.render('contact',data);
    });

    ctx.app.get('/portfolio',function(req,res){
        data.page.title = 'Edushala - Portfolio';
        res.render('portfolio',data);
    });

    ctx.app.get('/faq',function(req,res){
        data.page.title = 'Edushala - FAQs';
        res.render('faq',data);
    });

    ctx.app.get('/proposal',function(req,res){
        data.page.title = 'Edushala - Proposal';
        res.render('teach/proposal',data);
    });

    ctx.app.get('/profile',function(req,res){
        data.page.title = 'Edushala - Profile';
        res.render('member-profile',data);
    });

    ctx.app.get('/reset_password',function(req,res){
        data.page.title = 'Edushala - Reset Password';
        res.render('reset_password',data);
    });

    ctx.app.get('/enrolled',function(req,res){
        data.page.title = 'Edushala - Enrolled';
        res.render('enrolled',data);
    });

    ctx.app.get('/teaching',function(req,res){
        data.page.title = 'Edushala - Teaching';
        res.render('teaching',data);
    });

    ctx.app.get('/change_password',function(req,res){
        data.page.title = 'Edushala - Change Password';
        res.render('change_password',data);
    });


    ctx.app.get('/partners/embassy',function(req,res){
        data.page.title = 'Edushala - US Embassy';
        res.render('clients/embassy',data);
    });

    ctx.app.get('/partners/cloudfactory',function(req,res){
        data.page.title = 'Edushala - Cloudfactory';
        res.render('clients/cloudfactory',data);
    });

    ctx.app.get('/partners/ncell',function(req,res){
        data.page.title = 'Edushala - Ncell';
        res.render('clients/ncell',data);
    });

    ctx.app.get('/partners/worldbank',function(req,res){
        data.page.title = 'Edushala - World Bank';
        res.render('clients/worldbank',data);
    });

    ctx.app.get('/partners/icimod',function(req,res){
        data.page.title = 'Edushala - ICIMOD';
        res.render('clients/icimod',data);
    });

    ctx.app.get('/partners/thames',function(req,res){
        data.page.title = 'Edushala - Thames College';
        res.render('clients/thames',data);
    });

    ctx.app.get('/partners/triyog',function(req,res){
        data.page.title = 'Edushala - Triyog';
        res.render('clients/triyog',data);
    });


};