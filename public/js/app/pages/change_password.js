$(document).ready(function() {
    $('#btnChangePass').on("click", function () {
        var data = {
            user_uuid : sessionStorage.getItem('user_uuid'),
            old_password: $('#old_password').val(),
            new_password: $('#new_password').val(),
            confirm_password: $('#cnf_password').val()
        };
        if(data.new_password != data.confirm_password){
            $( "#msg" ).append( '<p class="text-danger">Confirm password did not match.</p>' );
            return;
        }
        api.user.change_password({
            data: data,
            success: function (data) {
                if(data.json.user_uuid!=null){
                    sessionStorage.setItem('user_uuid', data.user_uuid);
                    console.log(data.user_uuid);
                }
                else {
                    $( "#msg" ).append( '<p class="text-danger">Incorrect old password.</p>' );
                }
            }
        });
    });
});