$(document).ready(function() {
    var data = {
        is_secure : sessionMgr.get('is_secure'),
    };
    if(data.is_secure == true){
        var user = sessionMgr.get('user');
        $( "#btnUser" ).html( '<li class="dropdown normal-menu has-submenu"><a href="#" class="dropdown-toggle" id="user_dashboard" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'+ user.username +' <span class="fa fa-angle-down"></span></a><ul class="dropdown-menu"><li><a href="/dashboard">Dashboard</a></li><li><a href="/enrolled">Enrolled</a></li><li><a href="/logout_process">Logout</a></li></ul></li>' );
        clearSession();
    }
});

var sessionMgr = {
    set: function(name, val){
        if(typeof(val)==='object')
            val = JSON.stringify(val);
        // sessionStorage.setItem(name, val);
        localStorage.setItem(name,val);
    },
    get : function(name) {
        try {
            var str = localStorage.getItem(name);
            return JSON.parse(str);
        } catch (e){
            return localStorage.getItem(name);
        }
    },
    makeSecure: function (val) {
        localStorage.setItem('is_secure', val)
    },
    isSecure: function () {
        var d = localStorage.getItem('is_secure')
        if(d==='true')
            return true;
        else
            return false;
    }
};

function validEmail(v) {
    var r = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (v.match(r) == null) ? false : true;
}

function clearSession() {
    var hours = 24; // Reset when storage is more than 24hours
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if(now-setupTime > hours*60*60*1000) {
            sessionMgr.set('is_secure', false);
            localStorage.clear();
            localStorage.setItem('setupTime', now);
        }
    }
}

function loadingBtn (btn, text) {
    btn.html(text).attr('disabled', true)
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}