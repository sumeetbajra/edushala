const api_path = '/api/1';

var rs = require('./misc/rs');
var schema = require('./misc/schema');

var publish = rs.classy.define({
    forceInstance: true,
    init: function (ctx) {
        ctx = ctx || {};
        ctx.api_routes = ctx.api_routes || [];
        ctx.schema = rs.data.model.cleanSchema(schema, { addDefaults: true });
        this.services = require('./services')(ctx);
        ctx.service = this.services;
        this.routes = require('./routes/api')(ctx);

        this.rs_user = new rs.user({
            api_routes:ctx.api_routes,
            app: ctx.app
        });
        for (var rte in this.routes) {
            ctx.app.use(api_path + this.routes[rte].route, this.routes[rte].handler)
        }
    }
});

module.exports = publish;