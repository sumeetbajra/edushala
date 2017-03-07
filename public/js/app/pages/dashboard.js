$(document).ready(function() {
    if(sessionMgr.get('is_secure') != true){
        location.replace('/login');
    }
    else {
        var data = {
            user : sessionMgr.get('user'),
        };
        api.user.get_profile({
            success: function (data) {
                console.log(data);
                $('#email').val(data.email);
                $('#fname').val(data.name_parts.first_name);
                $('#lname').val(data.name_parts.last_name);
                $('#phone').val(data.phone);
                $('#user_fname').html(data.name_parts.first_name);
                $('.team-member-name > p').html(data.name_parts.first_name + ' ' + data.name_parts.last_name);
            }
        });

        $('#btnGetCode').on("click", function () {
            getCode();
        });

        $('#btnUpdate').on('click',function() {
            updateProfile();
        });
    }
});

function getCode() {
    var email = $('#email').val();
    console.log(email);
    api.user.forgot({
        data: {email: email},
        success: function (data) {
            console.log(data);
            $('#lblMsg').html('<p class="text-success"><strong>Please check your email to change password</strong></p>');
        },
        error: function (d) {
            $('#lblMsg').html('Email not found');
        }
    });
}