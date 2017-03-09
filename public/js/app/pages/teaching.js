$(document).ready(function() {
    if(sessionMgr.get('is_secure') != true){
        location.replace('/login');
    }
    else {
        var data = {
            user : sessionMgr.get('user')
        };
        api.kachha.listTeaching({
            data:data.user.user_uuid,
            success: function (data) {
                $.each(data, function (i, v) {
                    if((v.class_uuid) != null){
                        $('#empty-teaching').html('');
                        $('#teaching_courses').append('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 wow fadeIn"><div class="video-wrapper course-catalog course-widget clearfix"><div class="post-media"><div class="entry"><img src="http://files.edushala.com/course/'+ v.class_uuid +'/img/sml.jpg" alt="" class="img-responsive"><div></div></div></div><!-- end media --><div class="widget-title edu-box clearfix"><h3><a href="/learn/'+ v.class_uuid + '">'+ v.course.name + '</a></h3><hr><div class="bottom-line clearfix"><div class="pull-left"><a href="/learn/'+ v.class_uuid + '" class="readmore">View Course</a></div></div><!-- end bottom --></div><!-- end title --></div><!--widget --></div><!-- end col -->');
                    }
                });
            }
        });
    }
});