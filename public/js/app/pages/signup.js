$(document).ready(function() {
    $('#btnSignup').on("click", function () {
        var name = $('#full_name').val();
        var email = $('#email').val();
        var pass = $('#password').val();
        if(name == '' || email == '' || pass == '') {
            $( "#errorMsg" ).html( '<div class="alert alert-danger"><p class="text-danger">All fields are required to register.</p></div>' );
            return;
        }
        if($("#check_terms").is(':not(:checked)'))
        {
            $( "#errorMsg" ).html( '<div class="alert alert-danger"><p class="text-danger">Check terms and conditions of Edushala.</p></div>' );
            return;
        }
        var data = {
            name: name,
            email: email,
            password: pass
        };
        api.user.signup({
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
                    $( "#errorMsg" ).html( '<div class="alert alert-danger"><p class="text-danger"><stron>Email already exists, Please try new one or login.</stron></p></div>' );
                }
            },
            error :function () {
                $( "#errorMsg" ).html( '<p class="text-danger"><strong>Oops error occured. Please try again!!!</strong></p>' );
            }
        });
    });
});