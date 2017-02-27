$(document).ready(function() {
    var featuredImgName;
    $('#uploadForm').submit(function() {
        $("#status").empty().text("File is uploading...");
        $(this).ajaxSubmit({
            error: function(xhr) {
                status('Error: ' + xhr.status);
            },
            success: function(response) {
                $("#status").empty().text('File Uploaded Successfully.');
                featuredImgName = response.result;
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });

    $('#btnAddConent').on("click", function () {
        var featuredImgUrl = featuredImgName;
        var data = CKEDITOR.instances.editor1.getData();
        var title = $('#title').val();
        var titleId = $('#titleId').val();
        console.log(titleId);
        if(title == '' || titleId == ''){
            $( "#msg" ).html( '<p class="text-danger"><strong>Please enter blog title and title ID.</strong></p>' );
            return;
        }
        else {
            var model = {
                featuredImgUrl : featuredImgUrl,
                title: title,
                blogContent: data,
                seoUrl : titleId
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
                    $( "#msg" ).html( '<p class="edu-green"><strong>Something went wrogn, plese try again.</strong></p>' );
                }
            });
        }
    });
});

function clearForm() {
    $('#title').val('');
    CKEDITOR.instances.blog_content.setDate('');
}