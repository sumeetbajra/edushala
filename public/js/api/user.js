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

var api_user_path = "rs/user/1/";
var serverUrl = 'http://localhost:4232/';

var api = {
    user: {
        signup: function(cfg){
            cfg.method = 'POST',
                cfg.url = api_user_path + 'users/signup';
            ajax(cfg)
        },
        login: function(cfg){
            cfg.method = 'POST';
            cfg.url = api_user_path + 'auth';
            ajax(cfg)
        },
        forgot: function(cfg){
            cfg.method = 'POST';
            cfg.url = api_user_path + 'auth/password/forgot';
            ajax(cfg)
        },
        change_password: function(cfg){
            cfg.method = 'POST';
            cfg.url = serverUrl + api_user_path + 'auth/password/change';
            ajax(cfg)
        },
        get_profile: function(cfg){
            var user = sessionMgr.get('user');
            cfg.headers = {rs_token: user.rs_token, 'content-type':'application/json'};
            cfg.url = api_user_path + 'me';
            ajax(cfg)
        }
    }
};