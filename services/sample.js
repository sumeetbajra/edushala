var rs = require('../misc/rs');
//Uncomment this to use proper database type
//var db = rs.data.mssql(options);
//var db = rs.data.mysql();
//var db = rs.data.json();

var service = rs.classy.define({
    forceInstance: true,
    init: function (ctx) {
        this.context = ctx;
    },
    get: function (c) {
        c.success(rs.util.apply({ server: "This is from the server" }, c.data));
    },
    get_sample: function (c) {
        c.success(rs.util.apply({ server: "This is sample from the server" }, c.data));
    }
});

module.exports = service;