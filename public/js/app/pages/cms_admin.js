$(document).ready(function() {
    $('#btnAdmin').on("click", function () {
       var  username = $('#username').val();
       var  password = $('#password').val();
      if(username == 'edu_admin' && password == 'T$mp1234'){
          location.replace('/blog');
      }else {
          $('#msg').html('<p class="text-danger"><strong>Username or password did not match</strong></p>');
      }
    });
});