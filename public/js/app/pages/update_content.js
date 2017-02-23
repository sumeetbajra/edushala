$(document).ready(function() {
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    $('#btnUpdateContent').on("click", function () {
        var data = CKEDITOR.instances.editor1.getData();
        var title = $('#title').val();
        var model = {
            title: title,
            blogContent: data
        };
        $.ajax({
            method: 'POST',
            data: model,
            url: '/cms/' + id,
            success: function (data) {
                if(data.result._id != null){
                    $( "#msg" ).html( '<p class="edu-green"><strong>Content Updated Successfully.</strong></p>' );
                }
                else {
                    $( "#msg" ).html( '<p class="text-danger"><strong>Something went wrogn, plese try again.</strong></p>' );
                }
            },
            error: function(err) {
                console.log(err);
                $( "#msg" ).html( '<p class="text-danger"><strong>Something went wrogn, plese try again.</strong></p>' );
            }
        });
    });

    $('#btnDeleteContent').on("click", function () {
        var r = confirm("Attention! deleted content cant be recovered");
        if (r == true) {
            $.ajax({
                method: 'DELETE',
                url: '/cms/' + id,
                success: function (data) {
                    console.log(data);
                    if(data.msg != null){
                        $( "#msg" ).html( '<p class="edu-green"><strong>Content Deleted Successfully.</strong></p>' );
                    }
                    else {
                        $( "#msg" ).html( '<p class="text-danger"><strong>Something went wrogn, plese try again.</strong></p>' );
                    }
                },
                error: function(err) {
                    console.log(err);
                    $( "#msg" ).html( '<p class="text-danger"><strong>Something went wrogn, plese try again.</strong></p>' );
                }
            });
        } else {
            return;
        }

    });
});

function deleteContent() {
    
}

