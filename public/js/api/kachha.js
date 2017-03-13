var ajax = function(cfg){
    if(!cfg.url){
        cfg.error({message:'Url must be sent'});
        return;
    }


    $.ajax({
        url: cfg.url,
        method: cfg.method || 'GET',
        headers: cfg.headers || {'content-type':'application/json'},
        data: JSON.stringify(cfg.data) || null,
        complete: function (res) {
            var data = res.responseJSON.data;
            if(cfg.success) {
                cfg.success(data);
            }
        },
        error: function (response) {
            if(cfg.error)
                cfg.error(response);
        }
    })
};

var api_course = '/api/1/course/';
var api_user_path = "/rs/user/1/";

var api = {
    kachha: {
        list:function (cfg) {
            cfg = cfg || {};
            cfg.url = api_course + 'list';
            ajax(cfg)
        },
        getClass:function (cfg) {
            cfg.url = api_course + 'kachha/' + class_uuid;
            ajax(cfg)
        },
        enroll:function (cfg) {
            cfg.method = 'POST';
            cfg.url = api_course + 'enroll';
            ajax(cfg)
        },
        isEnrolled:function (cfg) {
            cfg.method = 'POST';
            cfg.url = api_course + 'is_enrolled';
            ajax(cfg)
        },
        listEnrolled:function (cfg) {
            var user = sessionMgr.get('user');
            cfg.headers = {rs_token: user.rs_token, 'content-type':'application/json'};
            cfg.url = api_course + 'enrolled';
            ajax(cfg)
        },
        listTeaching:function (cfg) {
            var user = sessionMgr.get('user');
            cfg.headers = {rs_token: user.rs_token, 'content-type':'application/json'};
            cfg.url = api_course + 'teaching';
            ajax(cfg)
        },
        completedCourses:function (cfg) {
            cfg.url = api_course + 'completed';
            ajax(cfg)
        },
        listByFlag:function (cfg) {
            cfg.url = api_course + flag;
            ajax(cfg)
        }
    },
    user: {
        get_profile: function(cfg){
            var user = sessionMgr.get('user');
            cfg.headers = {rs_token: user.rs_token, 'content-type':'application/json'};
            cfg.url = api_user_path + 'me';
            ajax(cfg)
        },
        update_profile : function (cfg) {
            var user = sessionMgr.get('user');
            cfg.headers = {rs_token: user.rs_token, 'content-type':'application/json'};
            cfg.method = 'POST';
            cfg.url = api_user_path + 'me';
        },
        signup: function(cfg){
            cfg.method = 'POST',
                cfg.url = api_user_path + 'users/signup';
            ajax(cfg)
        },
        exists: function(cfg){
            cfg.method = 'POST',
                cfg.url = api_user_path + 'users/exists';
            ajax(cfg)
        },
        login: function(cfg){
            cfg.method = 'POST';
            cfg.url = api_user_path + 'auth';
            ajax(cfg)
        }
    }
};