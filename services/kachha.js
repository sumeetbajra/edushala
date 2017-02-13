var rs = require('../misc/rs');
//Uncomment this to use proper database type
var db = null;
//var db = rs.data.mysql();
//var db = rs.data.json();
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
        db = ctx.client.db;
    },

    listByCategory:function (c) {
        return execute(c, {
            procedure: 'EZ_Class_ListByCategory',
            params: {
                category: {
                    val:c.data.category,
                    type:db.client["NVARCHAR"]
                }
            }
        })
    },

    enroll : function (c) {
        db.execute(c, {
            schema: ['class_uuid','user_uuid','coupon'],
            procedure: 'EZ_Class_Enroll'
        })
    },

    isEnrolled : function (c) {
        db.execute(c,{
            schema : ['class_uuid','user_uuid'],
            procedure:'EZ_Course_IsEnrolled'
        })
    },


    listByFlag : function (c) {
        return execute(c, {
            procedure: 'EZ_Class_ListByFlag',
            renderer: {course: 'json'},
            params: {
                flag: {
                    val:c.data.flag,
                    type:db.client["NVARCHAR"]
                }
            }
        })
    },

    getStudentsByClass : function (c) {
        return execute(c, {
            procedure: 'EZ_Class_GetStudents',
            params: {
                class_uuid: {
                    val:c.data.class_uuid,
                    type:db.client["NVARCHAR"]
                }
            }
        })
    },

    get : function (c) {
        db.get(c, {
            schema: ['class_uuid'],
            procedure: 'EZ_Class_Get',
            formatter: {course: 'json',educator : 'json'}
        })
    },

    completedCourses : function (c) {
        db.get(c, {
            schema: ['par'],
            procedure: 'EZ_Completed_Courses '
        })
    },

    listEnrolled : function (c) {
        db.list({
            schema: ['user_uuid'],
            procedure: 'EZ_Class_EnrolledList',
            formatter: {course: 'json',educator : 'json'},
            data: c.data,
            success: c.success,
            failure: c.failure
        });
    },

    listTeaching : function (c) {
        var model = rs.data.model({
           schema:  ['user_uuid'],
            data: c.data
        });
        return execute(c, {
            procedure: 'EZ_Class_TeachingList',
            model: model,
            formatter: {course: 'json',educator : 'json'}
        })
    },

    listKachha : function (c) {
        db.list(c, {
            schema: ['price','category','special_tag','ratings'],
            procedure: 'EZ_Class_ListOverview'
        })
    },

    getCoupon : function (c) {
        return execute(c, {
            procedure: 'EZ_Coupon_Get',
            params: {
                class_uuid: {
                    val:c.data.class_uuid,
                    type:db.client["uniqueidentifier"]
                },
                coupon: {
                    val:c.data.coupon,
                    type:db.client["NVARCHAR"]
                },
                SessionID: {
                    val:c.data.SessionID,
                    type:db.client["bigint"]
                }
            }
        })
    },

    subscribe : function (c) {
        db.get(c, {
            schema: ['email'],
            procedure: 'RSCRM_Email_Subscribe'
        })
    },

    searchByKey : function (c) {
        return execute(c, {
            procedure: 'EZ_Class_SearchByKey',
            params: {
               search_text : {
                    val:c.data.search_text,
                    type:db.client["NVARCHAR"]
                }
            }
        })
    }
});

module.exports = service;