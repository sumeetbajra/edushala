$(document).ready(function() {
    $('#btnAddConent').on("click", function () {
        var data = CKEDITOR.instances.blog_content.getData();
        alert(data);
    });
});