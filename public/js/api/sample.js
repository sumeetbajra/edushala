var ajax = function(cfg){
    if(!cfg.url){
        cfg.error({message:'Url must be sent'});
        return;
    }

    $.ajax({
        url: cfg.url,
        method: cfg.method || 'GET',
        headers: cfg.headers || {'content-type':'application/json'},
        data: cfg.data || null,
        complete: function (res) {
            var data = res.responseJSON.data;
            if(cfg.success)
                cfg.success(data);
        },
        error: function (response) {
            if(cfg.error)
                cfg.error(response);
        }
    })
};

var api = {
    sample: {
        get:function (cfg) {
            cfg.url = '/api/1/sample';
            ajax(cfg)
        },
        get_class: function (cfg) {
            cfg.url = '/api/1/sample/' + cfg.url_data.class_uuid;
            ajax(cfg);
        },
        enroll: function(cfg){
            //cfg.url = '/api/1/sample/' + cfg.url_data.class_uuid;
            //ajax(cfg)
            cfg.success({
                msg: 'Enroll successfull',
                confirmation_id:'22hiuh234234324'
            });
        },
        get_sample: function(cfg){
            cfg.url = '/api/1/sample/my_sample';
            ajax(cfg)
            cfg.success({
                msg: 'Sample is clean',
                confirmation_id:'23432dsfjk444'
            });
        }
    }
};