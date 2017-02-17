$(document).ready(function() {
    calculatePrice();
    $( "#btnEnroll" ).click(function() {
       alert('Enroll');
    });
});

function userDetails() {
    var data = {
        is_secure : sessionMgr.get('is_secure')
    };
    api.user.get_profile({
        success: function (data) {
            $('#email').val(data.username);
            $('#full_name').val(data.first_name + ' ' + data.last_name);
            $('#phone').val('9843756482');
        }
    });
}

function calculatePrice() {
    var total = $('#price').text() - $('#discount').text();
    $( "#total" ).html( total );

    $( "#apply_code" ).click(function() {
        $( "#error_msg" ).html( '<div class="alert alert-danger alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Error!</strong>  Invalid group or coupon code</div>' );
    });
}

