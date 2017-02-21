$(document).ready(function() {
    $('#btnAddConent').on("click", function () {
        var data = CKEDITOR.instances.blog_content.getData();
        var title = $('#title').val();
        if(title == ''){
            $( "#msg" ).html( '<p class="text-danger"><strong>Please enter blog title and content.</strong></p>' );
            return;
        }
        else {
            var model = {
                title: title,
                blogContent: data
            };
            $.ajax({
                method: 'POST',
                data: model,
                url: 'cms/addContent',
                success: function (data) {
                    console.log(data);
                    if(data){
                        $( "#msg" ).html( '<p class="edu-green"><strong>Content Added Successfully.</strong></p>' );
                        clearForm();
                    }
                    else {
                        $( "#msg" ).html( '<p class="edu-green"><strong>Something went wrogn, plese try again.</strong></p>' );
                    }
                },
                error: function(err) {
                    console.log(err);
                    $( "#msg" ).html( '<p class="text-danger"><strong>Incorrect login details. Forgot Password? or Sign up for an account?</strong></p>' );
                }
            });
        }
    });
});

function clearForm() {
    $('#title').val('');
    CKEDITOR.instances.blog_content.setDate('');
}