$(document).ready(function() {
    var data = {
        is_secure : sessionMgr.get('is_secure'),
    };
    if(data.is_secure == true){
        $( "#user_dashboard" ).html( '<a href="/dashboard">Dashboard</a>' );
    }
  });

var sessionMgr = {
    set: function(name, val){
        if(typeof(val)==='object')
            val = JSON.stringify(val);
        sessionStorage.setItem(name, val);
    },
    get : function(name) {
        try {
            var str = sessionStorage.getItem(name);
            return JSON.parse(str);
        } catch (e){
            return sessionStorage.getItem(name);
        }
    },
    makeSecure: function (val) {
        sessionStorage.setItem('is_secure', val)
    },
    isSecure: function () {
        var d = sessionStorage.getItem('is_secure')
        if(d==='true')
            return true;
        else
            return false;
    }
};
