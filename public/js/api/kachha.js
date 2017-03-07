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
        listEnrolled:function (cfg) {
            cfg.url = api_course + 'enrolled/' + sessionMgr.get('user').user_uuid;
            ajax(cfg)
        },
        listTeaching:function (cfg) {
            cfg.url = api_course + 'teaching/' + sessionMgr.get('user').user_uuid;
            ajax(cfg)
        },
        listByFlag:function (cfg) {
            cfg.url = api_course + flag;
            ajax(cfg)
        }
    }
};