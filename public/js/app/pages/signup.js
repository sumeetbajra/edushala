$(document).ready(function() {
    $('#signup_form').on('submit', function (e) {
        var submitBtn = $('#btnSignup')
        submitBtn.html('Please wait..').prop('disabled', true);
        var data = {
            name: $('#full_name').val(),
            email : $('#email').val(),
            password: $('#password').val()
        };
        if($("#check_terms").is(':not(:checked)') || data.name.length || data.email.length || data.password.length) {
            api.user.signup({
                data: data,
                success: function (data) {
                    if(data.user_uuid!=null){
                        $( "#btnUser" ).html( '<li class="dropdown normal-menu has-submenu"><a href="#" class="dropdown-toggle" id="user_dashboard" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> '+ data.username +' <span class="fa fa-angle-down"></span></a><ul class="dropdown-menu"><li><a href="/dashboard">Dashboard</a></li><li><a href="/enrolled">Enrolled</a></li><li><a href="/logout_process">Logout</a></li></ul></li>' );
                        sessionMgr.set('isLoggedIn', true);
                        sessionMgr.set('user', data);
                        sessionMgr.makeSecure(true);
                        location.replace('/dashboard');
                    }
                    else {
                        $( "#errorMsg" ).html( '<div class="alert alert-danger"><p class="text-danger"><strong>Email already exists, Please try new one or login.</strong></p></div>' );
                        submitBtn.html('Signup').prop('disabled', false);
                    }
                },
                error :function () {
                    $( "#errorMsg" ).html( '<p class="text-danger"><strong>Something went wrong. Please try again later!!</strong></p>' );
                    submitBtn.html('Signup').prop('disabled', false);
                }
            });
        } else {
            $( "#errorMsg" ).html( '<div class="alert alert-danger"><p class="text-danger"><stron>Please check all the fields and try again.</strong></p></div>' );
            submitBtn.html('Signup').prop('disabled', false);
        }
        return false
    });
});