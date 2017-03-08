var rs = require('../../misc/rs');
var request = require('request');
var APIConstants = require('../../constants/APIConstants');
const Content = require('../../models/content');
var session = require('express-session');
var service = require('../../services');

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

    var data = {
        page: {title: 'Edushala'}
    };

    ctx.app.get('/about', function(req, res){
        data.page.title = 'Edushala - About';
        res.render('about', data)
    });

    ctx.app.get('/edushala-for-enterprise', function(req, res){
        data.page.title = 'Edushala for Enterprise - Edushala';
        res.render('enterprise', data)
    });

    ctx.app.get('/enterprise/request-a-demo', function(req, res){
        data.page.title = 'Request a demo - Edushala';
        res.render('request-a-demo', data)
    });
    ctx.app.get('/feedback', function(req, res){
        data.page.title = 'feedback - Edushala';
        res.render('feedback', data)
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
        var data = {
            userData: req.session.user,
            page : {
                title: 'Edushala - Dashboard'
            }
        }
        res.render('dashboard', data);
    });

    ctx.app.get('/teach',function(req,res){
        data.page.title = 'Edushala - Teach';
        res.render('teach/teach',data);
    });

    ctx.app.get('/get-token',function(req,res){
        res.render('get_token');
    });

  /*  ctx.app.get('/learn',function(req,res){
        request.get(APIConstants.COURSE, function(error, response, body) {
            if(!error && response.statusCode === 200) {
                var data = {
                    page: {
                        title: 'Edushala - Learn'
                    },
                    courses: JSON.parse(body).result
                }
                console.log(data.courses[9].educator);
                res.render('learn', data);
            } else {
                console.log(error);
            }
        })
    });

    ctx.app.get('/learn',function(req,res){
        console.log('service:' + ctx.service.kachha.listKachha);
        ctx.service.kachha.listKachha({
            success: function (results) {
                var data = {
                    page: {title: 'Learn'},
                    kachha: results
                };
                res.render('learn',data);
            },
            failure: function (error) {
                res.json(error)
            }
        });
    }); */

    ctx.app.get('/learn',function(req,res){
        data.page.title = 'Edushala - Learn';
        res.render('learn',data);
    });

    ctx.app.get('/terms',function(req,res){
        data.page.title = 'Edushala - Terms & Conditions';
        res.render('terms',data);
    });

    ctx.app.get('/admin',function(req,res){
        data.page.title = 'Edushala - CMS Login';
        res.render('cms/admin_login',data);
    });

    ctx.app.get('/admin_dashboard',function(req,res){
        data.page.title = 'CMS - Dashboard ';
        res.render('cms/admin_dashboard',data);
    });

    ctx.app.get('/add_contents',function(req,res){
        data.page.title = 'CMS - Add Content ';
        res.render('cms/add_contents',data);
    });

    ctx.app.get('/content_list',function(req,res){
        Content.find({}).sort('-dateAdded').exec(function(err, doc) {
            if(err){
                res.json({success : false, msg : 'Failed to list content!'});
            } else {
                var data = {
                    page: {
                        title: 'Edushala - Content List'
                    },
                    blog:doc
                }
                res.render('cms/content_list', data);
            }
        });
    });

    ctx.app.get('/content_list/:id',function(req,res){
        Content.findById(req.params.id, function(err, doc) {
            if(err){
                res.json({success : false, msg : 'Failed to get content!'});
            } else {
                var data = {
                    page: {
                        title: 'Edushala - Update Content'
                    },
                    blog:doc
                }
                res.render('cms/update_content', data);
            }
        });
    });

    ctx.app.get('/blog',function(req,res){
        Content.find({}).sort('-dateAdded').exec(function(err, doc) {
            if(err){
                res.json({success : false, msg : 'Failed to list content!'});
            } else {
                var data = {
                    page: {
                        title: 'Edushala - Blog'
                    },
                    blog:doc
                }
                res.render('cms/blog', data);
            }
        });
    });

    var getLatestPosts = function() {
        return Content.find({}).sort('-dateAdded')
    }

    /* ctx.app.get('/blog/:id',function(req,res){
        Content.findById(req.params.id, function(err, doc) {
            if(err){
                res.json({success : false, msg : 'Failed to get content!'});
            } else {
                getLatestPosts().sort('-dateAdded').exec(function(err, latestArticles) {
                    if(err){
                        res.json({success : false, msg : 'Failed to list content!'});
                    } else {
                        var data = {
                            page:
                                {
                                    title:'Edushala - Blog'
                                },
                            blog: doc,
                            articles: latestArticles
                        }
                        res.render('cms/blog_single', data)
                    }
                });
            }
        });
    }); */

    ctx.app.get('/blog/:seoUrl',function(req,res){
        Content.getContentByUrl(req.params.seoUrl, function(err, doc) {
            if(err){
                res.json({success : false, msg : 'Failed to get content!'});
            } else {
                getLatestPosts().sort('-dateAdded').exec(function(err, latestArticles) {
                    if(err){
                        res.json({success : false, msg : 'Failed to list content!'});
                    } else {
                        var data = {
                            page:
                                {
                                    title:'Edushala - Blog'
                                },
                            blog: doc,
                            articles: latestArticles
                        }
                       // console.log(data.blog);
                       // console.log(data.blog[0].blogContent);
                        res.render('cms/blog_single', data)
                    }
                });
            }
        });
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

  /*  ctx.app.get('/learn/:id',function(req,res){
        request.get(APIConstants.COURSE + '/' + req.params.id, function(error, response, body) {
            if(!error && response.statusCode === 200) {
                var data = {
                    page: {
                        title: 'Edushala - Course'
                    },
                    courses: JSON.parse(body).result
                }
                console.log(data.courses[0].name);
                res.render('course_details', data);
            }
        })
    }); */

    ctx.app.get('/learn/:class_uuid',function(req,res){
        ctx.api.services.kachha.get({
            data: {class_uuid:req.params.class_uuid},
            success: function (results) {
                console.log(results);
                var data = {
                    page: {title: results.course.name},
                    kachha: results
                };
                res.render('course_details',data);
            },
            failure: function (error) {
                res.json(error)
            }
        });
    });


    ctx.app.get('/how',function(req,res){
        data.page.title = 'Edushala - How It Works';
        res.render('how',data);
    });

    ctx.app.get('/contact',function(req,res){
        data.page.title = 'Edushala - Contact Us';
        res.render('contact',data);
    });

    ctx.app.post('/contact', function(req, res) {

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
