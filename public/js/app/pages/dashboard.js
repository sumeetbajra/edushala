$(document).ready(function() {
    var data = {
        user : sessionMgr.get('user'),
       // is_secure : sessionMgr.get('is_secure')
    };
   // alert(data.user.first_name);
    api.user.get_profile({
        success: function (data) {
            $('#fname').val(data.first_name);
            $('#midname').val(data.midname);
            $('#lname').val(data.last_name);
            $('#user_fname').html(data.first_name);
            $('.team-member-name > p').html(data.first_name + ' ' + data.last_name);
        }
    });
});