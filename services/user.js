var rs = require('../misc/rs');
var db = null;

var execute = function (c, d) {
    var a = rs.apply({
        success: c.success,
        failure: c.failure
    }, d);
    return db.execute(a);
};

var service = rs.classy.define({
    forceInstance: true,
    init: function (ctx) {
        this.context = ctx;
        db = ctx.db;
    },

    listEnrolled : function (c) {
        return execute(c, {
            procedure: 'EZ_Class_EnrolledList',
            renderer: {course: 'json',educator : 'json'},
            params: {
                user_uuid: {
                    val:c.data.user_uuid,
                    type:db.client["NVARCHAR"]
                }
            }
        })
    },

    listTeaching : function (c) {
        return execute(c, {
            procedure: 'EZ_Class_TeachingList',
            renderer: {course: 'json',educator : 'json'},
            params: {
                user_uuid: {
                    val:c.data.user_uuid,
                    type:db.client["NVARCHAR"]
                }
            }
        })
    }
});

module.exports = service;