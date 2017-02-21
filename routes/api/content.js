const express = require('express');
const  router = express.Router();
const config = require('../../config/db');
const Content = require('../../models/content');

//Add Content
router.post('/addContent',function (req,res) {
    var newContent = new Content({
        title : req.body.title,
        blogContent : req.body.blogContent
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