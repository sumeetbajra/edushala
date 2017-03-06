$(document).ready(function() {
    $('#btnLogin').on("click", function () {
        var data = {
            username: $('#username').val(),
            password: $('#password').val()
        };
        api.user.login({
            data: data,
            success: function (data) {
                console.log(data);
                if(data.user_uuid!=null){
                    $( "#btnUser" ).html( '<li class="dropdown normal-menu has-submenu"><a href="#" class="dropdown-toggle" id="user_dashboard" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> '+ data.username +' <span class="fa fa-angle-down"></span></a><ul class="dropdown-menu"><li><a href="/dashboard">Dashboard</a></li><li><a href="/enrolled">Enrolled</a></li><li><a href="/logout_process">Logout</a></li></ul></li>' );
                    sessionMgr.set('isLoggedIn', true);
                    sessionMgr.set('user', data);
                    sessionMgr.makeSecure(true);
                    location.replace('/dashboard');
                }
                else {
                    $( "#errorMsg" ).html( '<div class="alert alert-danger"><p class="text-danger"><stron>Wrong email or password. Please try again!</stron></p></div>' );
                }
            },
            error :function () {
                $( "#errorMsg" ).html( '<p class="text-danger"><strong>Wrong email or password. Please try again!</strong></p>' );
            }
        });
    });
});