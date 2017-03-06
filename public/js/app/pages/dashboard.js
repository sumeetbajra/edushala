$(document).ready(function() {
    $('#btnUpdate').on("click", function () {
        var data = {
            firstName: $('#fname').val(),
            lastName: $('#lname').val(),
            phone: $('#phone').val()
        };
        $.ajax({
            method: 'PUT',
            data: data,
           // headers: {"Authorization": localStorage.getItem('token')},
            url: 'http://139.59.111.216:8081/users/' + '',
            success: function (data) {
                console.log(data);
                return;
                if(data.result.user.email!=null){

                }
                else {
                    $( "#msg" ).html( '<p class="text-danger"><strong>Incorrect login details. Forgot Password? or Sign up for an account?</strong></p>' );
                }
            },
            error: function(err) {
                $( "#msg" ).html( '<p class="text-danger"><strong>Incorrect login details. Forgot Password? or Sign up for an account?</strong></p>' );
            }
        });
    });

    $('#btnGetCode').on("click", function () {
        getCode();
    });
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