
$(document).ready(function() {
    api.kachha.list({
        success:function (d) {
            $.each(d, function (i, v) {
                if(!(i % 4)) {
                    $('#course_catalog').append('<div class="row course_catalog_row"></div>')
                }
                $('.course_catalog_row:last').append('<div class="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeIn"><div class="video-wrapper course-catalog course-widget clearfix"><div class="post-media"><div class="entry"><a href="/learn/'+ v.class_uuid + '"><img src="http://files.edushala.com/course/'+ v.class_uuid +'/img/sml.jpg" alt="" class="img-responsive"></a></div></div><!-- end media --><div class="widget-title clearfix"><h3><a href="/learn/'+ v.class_uuid + '">'+ v.class_name + '</a></h3><hr><div class="bottom-line clearfix"><div class="pull-left"><a class="readmore"><img src="" class="img-circle" alt="">'+ v.first_name +'</a></div><div class="pull-right"><a href="course-single.html" class="btn btn-sm btn-inverse"><span>Rs.</span>'+ v.price + '</a></div></div><!-- end bottom --></div><!-- end title --></div><!--widget --></div><!-- end col -->');
            });
        },
        error:function () {
            console.log('error');
        }
    });
});