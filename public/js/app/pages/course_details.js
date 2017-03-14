$(document).ready(function() {
    calculatePrice();
    var url = window.location.pathname;
    var class_uid = url.substring(url.lastIndexOf('/') + 1);
    var serverUrl = 'http://139.59.111.216:9000/'

    var sessionUrl = serverUrl + 'demo/'

    var courseSessionMapList = {
       '14EB3C67-62D6-4E72-B540-EA2665206826': sessionUrl + '58abfdec74111836429a83bd',
       'C33B2C56-2173-4C0B-A852-7D3797BA2BB4': sessionUrl + '58abfdec74111836429a83bd',
    }

    $('#enroll_popup').on('click', function(e) {
        if(sessionMgr.get('user')) {
            $('#enrollModal').modal('show')
        } else {
            $('#loginModal').modal('show')
        }
    })

    $('#login-form').on('submit', function (e) {
        var submitBtn = $('#btnLogin')
        submitBtn.html('Please wait..').prop('disabled', true);
        var data = {
            username: $('#username').val(),
            password: $('#password').val()
        };
        if(data.username.length && data.password.length) {
            api.user.login({
                data: data,
                success: function (data) {
                    console.log(data);
                    if(data.user_uuid!=null){
                        $( "#btnUser" ).html( '<li class="dropdown normal-menu has-submenu"><a href="#" class="dropdown-toggle" id="user_dashboard" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> '+ data.username +' <span class="fa fa-angle-down"></span></a><ul class="dropdown-menu"><li><a href="/dashboard">Dashboard</a></li><li><a href="/enrolled">Enrolled</a></li><li><a href="/logout_process">Logout</a></li></ul></li>' );
                        sessionMgr.set('isLoggedIn', true);
                        sessionMgr.set('user', data);
                        sessionMgr.makeSecure(true);
                        userDetails();
                        $('#loginModal').modal('hide')
                        isEnrolled(function(res) {
                            if(!!res.length){
                                replaceEnrollWithStartSession(res)
                            }else {
                                $('#enrollModal').modal('show')
                                setTimeout(function() {
                                    $('body').addClass('modal-open')
                                }, 500)
                            }
                        }, handleError)
                    }
                    else {
                        $( "#errorMsg" ).html( '<div class="alert alert-danger"><p class="text-danger"><stron>Wrong email or password. Please try again!</stron></p></div>' );
                        submitBtn.html('Login').prop('disabled', false);
                    }
                },
                error :function () {
                    $( "#errorMsg" ).html( '<p class="text-danger"><strong>Something went wrong. Please try again later!!</strong></p>' );
                    submitBtn.html('Login').prop('disabled', false);
                }
            });
        } else {
            $( "#errorMsg" ).html( '<div class="alert alert-danger"><p class="text-danger"><stron>Username or password cannot be blank!!</strong></p></div>' );
            submitBtn.html('Login').prop('disabled', false);
        }
        return false
    });

    if(sessionMgr.get('is_secure') == true){
        userDetails();
        isEnrolled(replaceEnrollWithStartSession, handleError);
    }

    $('body').on('click', '#btnEnroll', function() {
        // var phone  = $('#phone').val();
        // if(phone.length == 0){
        //     $( "#msg_info" ).html( '<div class="text-danger"><strong>Phone number is required.</strong></div>' );
        //     return false;
        // }
        var data = {
            class_uuid:class_uid,
            user_uuid: sessionMgr.get('user').user_uuid,
            coupon: ''
        };
        api.kachha.enroll({
            data: data,
            success: function (data) {
                $('#enrollModal').modal('toggle');
                $("#enroll_popup").replaceWith('<a href="' + courseSessionMapList[class_uid] + '" class="btn btn-edushala btn-block">Start Session</a>');
            },
            error : function () {
                console.log('Error occured');
            }
        })
    });

    function isEnrolled(success, error) {
        var data = {
            class_uuid:class_uid,
            user_uuid: sessionMgr.get('user').user_uuid
        };
        api.kachha.isEnrolled({
            data: data,
            success: success,
            error: error
        })
    }

    function replaceEnrollWithStartSession(data) {
        if(!!data.length){
            $("#enroll_popup").replaceWith('<a target="_blank" href="' + courseSessionMapList[class_uid] + '" class="btn btn-edushala btn-block">Start Session</a>');
        }
    }

    function handleError() {
        console.log('Not enrolled');
    }

    function userDetails() {
        api.user.get_profile({
            success: function (data) {
                $('#email').val(data.username);
                $('#full_name').val(data.name_parts.first_name + ' ' + data.name_parts.last_name);
                $('#phone').val(data.phone);
            }
        });
    }

    function calculatePrice() {
        var total = $('#price').text() - $('#discount').text();
        $( "#total" ).html( total );

        $( "#apply_code" ).click(function() {
            $( "#msg" ).html( '<div class="text-danger"><strong>Error! Invalid group or coupon code</strong></div>' );
        });
    }

    function login() {
        var data = {
            username: $('#email').val(),
            password: $('#pwd').val()
        };
        api.user.login({
            data: data,
            success: function (data) {
                console.log(data.user_uuid);
                if(data.user_uuid!=null){
                    $( "#btnUser" ).html( '<a href="/dashboard">Dashboard</a>' );
                    sessionMgr.set('isLoggedIn', true);
                    sessionMgr.set('user', data);
                    sessionMgr.makeSecure(true);
                    var url = window.location.pathname;
                    var class_uid = url.substring(url.lastIndexOf('/') + 1);
                    location.replace('/learn/' + class_uid);
                }
                else {
                    $( "#check-pass" ).html( '<p class="text-danger"><strong>Password you entered is wrong.</strong></p>' );
                }
            },
            error : function () {
                $( "#check-pass" ).html( '<p class="text-danger"><strong>Password you entered is wrong.</strong></p>' );
            }
        });
    }

    function signup() {
      //  var password = randomText();
        var fullname = $('#full_name').val();
        // var fname =  fullname.split(' ').slice(0, -1).join(' ');
        //  var lname = fullname.split(' ').slice(-1).join(' ');
        var data = {
            name: fullname,
            email: $('#email').val()
        };
        api.user.signup({
            data: data,
            success: function (data) {
                if(data.user_uuid!=null){
                    $( "#btnUser" ).html( '<a href="/dashboard">Dashboard</a>' );
                    sessionMgr.set('isLoggedIn', true);
                    sessionMgr.set('user', data);
                    sessionMgr.makeSecure(true);
                    var url = window.location.pathname;
                    var class_uid = url.substring(url.lastIndexOf('/') + 1);
                    location.replace('/learn/' + class_uid);
                }
                else {
                    $( "#msg_info" ).html( '<p class="text-danger"><strong>Oops error occured!!! Please try agian</strong></p>' );
                }
            }
        });
    }

    function  randomText() {
        var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
        var pass = "";
        for (var x = 0; x < 10; x++) {
            var i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    }
});

