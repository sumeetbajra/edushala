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

var api_user_path = "/rs/user/1/";
var serverUrl = 'http://139.59.111.216:8081/';

var api = {
    user: {
        signup: function(cfg){
            cfg.method = 'POST',
            cfg.url = api_user_path + 'users/signup';
            ajax(cfg)
        },
        login: function(cfg){
            cfg.method = 'POST';
            cfg.url = serverUrl + 'users/login';
            console.log(cfg.url);
            ajax(cfg)
        },
        change_password: function(cfg){
            cfg.method = 'POST';
            cfg.url = api_user_path + 'me/password/change';
            ajax(cfg)
        },
        get_profile: function(cfg){
            cfg.url = api_user_path + 'users/' + sessionMgr.get('user').user_uuid;
            ajax(cfg)
        }
    }
};