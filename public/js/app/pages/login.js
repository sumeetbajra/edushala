$(document).ready(function() {
    $('#btnLogin').on("click", function () {
        var data = {
            email: $('#username').val(),
            password: $('#password').val()
        };
        $('#btnLogin').html('Please wait...');
        $.ajax({
            method: 'POST',
            data: data,
            url: 'http://139.59.111.216:8081/users/login',
            success: function (data) {
                console.log(data.result.user.email);
                if(data.result.user.email!=null){
                    $('#btnLogin').html('Login');
                    $( "#btnUser" ).html( '<li class="dropdown normal-menu has-submenu"><a href="#" class="dropdown-toggle" id="user_dashboard" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> '+ data.result.user.email +' <span class="fa fa-angle-down"></span></a><ul class="dropdown-menu"><li><a href="/dashboard">Dashboard</a></li><li><a href="/enrolled">Enrolled</a></li><li><a href="/logout_process">Logout</a></li></ul></li>' );
                    sessionMgr.set('isLoggedIn', true);
                    sessionMgr.set('user', data);
                    sessionMgr.makeSecure(true);
                    location.replace('/dashboard');
                }
                else {
                    $( "#msg" ).html( '<p class="text-danger">Invalid username and/or password!!!</p>' );
                }
            },
            error: function(err) {
                console.log(err)
            }
        });
    });
});