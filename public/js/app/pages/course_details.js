$(document).ready(function() {

    calculatePrice();
    var url = window.location.pathname;
    var class_uid = url.substring(url.lastIndexOf('/') + 1);
    if(sessionMgr.get('is_secure') == true){
        userDetails();
        isEnrolled();
        $( "#btnEnroll" ).click(function() {
            var phone  = $('#phone').val();
            if(phone.length == 0){
                $( "#msg_info" ).html( '<div class="text-danger"><strong>Phone number is required.</strong></div>' );
                return false;
            }
            var data = {
                class_uuid:class_uid,
                user_uuid: sessionMgr.get('user').user_uuid,
                coupon: ''
            };
            api.kachha.enroll({
                data: data,
                success: function (data) {
                  //  $("#enroll_popup").replaceWith('<a href="#" class="btn btn-edushala btn-block">Start Session</a>');
                    $('#enrollModal').modal('toggle');
                    $("#enroll_popup").replaceWith('<a href="#" class="btn btn-edushala btn-block">Start Session</a>');
                },
                error : function () {
                    console.log('Error occured');
                }
            })
        });
    }
    else  {
        if($('#email').val() == '') {
            $('#enroll_footer').html(' <button type="button" id="btnEnroll" class="btn btn-edushala">Signup & Enroll</button>');
        }
        $( "#msg_info" ).html( '<div class="text-info"><strong>Fill the form below to Enroll</strong></div>' );
        $( "#btnEnroll" ).click(function() {
            var name=$('#full_name').val();
            var email=$('#email').val();
            var phone  = $('#phone').val();
            if(email.length == 0 || phone.length == 0 || name.length == 0){
                $( "#msg_info" ).html( '<div class="text-danger"><strong>All fields are required. please enter valid data.</strong></div>' );
                return false;
            }
            else {
                var data = {
                    email: $('#email').val()
                };
                api.user.exists({
                    data: data,
                    success: function (data) {
                        if(data == false){
                            signup();
                        }
                        else {
                            $('#logRegModal').modal('show');
                            $('#btnLogReg').on('click',function () {
                                if($('#pwd').val() == ''){
                                    $( "#check-pass" ).html( '<div class="text-danger"><strong>Password is required.</strong></div>' );
                                    return false;
                                }
                                else {
                                    login();
                                }
                            })
                        }
                    }
                });

            }
        });
    }
    function isEnrolled() {
        var serverUrl = 'http://139.59.111.216:9000/'

        var sessionUrl = serverUrl + 'demo/'

        var courseSessionMapList = {
           '14EB3C67-62D6-4E72-B540-EA2665206826' : sessionUrl + '58abfdec74111836429a83bd'
        }

        var data = {
            class_uuid:class_uid,
            user_uuid: sessionMgr.get('user').user_uuid
        };
        api.kachha.isEnrolled({
            data: data,
            success: function (data) {
                if(data[0].user_uuid !=  null){
                    $("#enroll_popup").replaceWith('<a target="_blank" href="' + courseSessionMapList[class_uid] + '" class="btn btn-edushala btn-block">Start Session</a>');
                }
            },
            error : function () {
                console.log('Not enrolled');
            }
        })
    }
});

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

