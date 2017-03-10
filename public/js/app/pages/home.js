$(document).ready(function() {
    api.kachha.list({
        success:function (d) {
            var c = 0;
            $.each(d, function (i, v) {
                if(c<=7){
                    $('#popular_courses').append('<div class="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeIn"><div class="video-wrapper course-catalog course-widget clearfix"><div class="post-media"><div class="entry entry-course"><a href="/learn/'+ v.class_uuid + '" style="background-image: url(\'http://files.edushala.com/course/' + v.class_uuid + '/img/sml.jpg\'); background-size: cover; background-repeat: no-repeat;"></a></div></div><!-- end media --><div class="widget-title clearfix"><h3><a href="/learn/'+ v.class_uuid + '">'+ v.class_name + '</a></h3><hr><div class="bottom-line clearfix"><div class="pull-left"><a class="readmore"><img src="" class="img-circle" alt="">'+ v.first_name +'</a></div><div class="pull-right"><a href="course-single.html" class="btn btn-sm btn-inverse"><span>Rs.</span>'+ v.price + '</a></div></div><!-- end bottom --></div><!-- end title --></div><!--widget --></div><!-- end col -->');
                    c++;
                }
                else  {
                    return;
                }
            });
        },
        error:function () {
            console.log('error');
        }
    });

});
