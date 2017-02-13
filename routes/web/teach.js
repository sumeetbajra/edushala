var rs = require('../../misc/rs');
var prefix = 'teach';

module.exports = function (ctx) {

    var data = {
        page: {title: 'Edushala'}
    };

    ctx.app.get('/' + prefix, function(req, res){
        data.page.title = 'Edushala - Teach';
        res.render(prefix, data)
    });

    ctx.app.get('/' + prefix + '/proposal',function(req,res){
        data.page.title = 'Edushala - Proposal';
        res.render(prefix + '/proposal',data);
    });
};