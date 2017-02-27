const express = require('express');
const  router = express.Router();
const config = require('../../config/db');
const Content = require('../../models/content');
var multer  = require('multer');


var storage = multer.diskStorage({
    destination: './public/images/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})

var upload = multer({ storage: storage });

 router.post('/uploadImg', upload.single('featuredImg'), function(req, res, next) {
   // res.redirect('/add_content');
    res.json({
        error: false,
        result: req.file.filename
 });
});

//Add Content
router.post('/addContent',function (req,res) {
    console.log(req.body);
    var newContent = new Content({
        featuredImgUrl : req.body.featuredImgUrl,
        title : req.body.title,
        blogContent : req.body.blogContent,
        seoUrl : req.body.seoUrl
    });
    newContent.save(function (err,doc) {
        if(err){
            res.json({success : false, msg : 'Failed to add content!'});
        } else {
            res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.get('/list',function (req,res) {
    Content.find({}, function(err, doc) {
        if(err){
            res.json({success : false, msg : 'Failed to list content!'});
        } else {
            res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.get('/:id',function (req,res) {
    Content.findById(req.params.id, function(err, doc) {
        if(err){
            res.json({success : false, msg : 'Failed to get content!'});
        } else {
            res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.post('/:id',function (req,res) {
    Content.findById(req.params.id, function (err, doc) {
        if (err) {
            res.status(500).send(err);
        } else {
            doc.title = req.body.title || doc.title;
            doc.seoUrl = req.body.seoUrl || doc.seoUrl;
            doc.blogContent = req.body.blogContent || doc.blogContent;

            doc.save(function (err, data) {
                if (err) {
                    res.status(500).send(err)
                }
                res.json({success:true,result:data});
            })
        }
    });
});

router.delete('/:id',function (req,res) {
    console.log(req.params.id);
    Content.findById(req.params.id, function(err, doc) {
        if (err) throw err;

        // delete content
        doc.remove(function(err) {
            if (err) throw err;
            res.json({success:true,msg:'Content deleted successfully'});
        });
    });
});

module.exports = router;