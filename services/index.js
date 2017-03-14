var rs = require('../misc/rs');
module.exports = rs.classy.define({
    forceInstance: true,
    init: function (context) {
        console.log(context.templates)

        var ctx = {
            templates: context.templates || {},
            raven : context.raven,
            client: rs.data.client({type: 'mssql'})
        };
        this.sample = require('./sample')(ctx);
        this.kachha = require('./kachha')(ctx);
        this.user = require('./user')(ctx);
    }
});