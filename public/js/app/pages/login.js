$(document).ready(function() {
    $('#btnLogin').on("click", function () {
        var data = {
            username: $('#username').val(),
            password: $('#password').val()
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
                  // location.replace('/dashboard/'+ data.user_uuid);
                   location.replace('/dashboard');
               }
               else {
                   $( "#msg" ).html( '<p class="text-danger">Invalid username and/or password!!!</p>' );
               }
           }
       });
    });
});