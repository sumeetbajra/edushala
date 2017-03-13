$(document).ready(function(){
    //---carousel slider----//
    $('.carousel[data-type="multi"] .item').each(function(){
        var next = $(this).next(); // grabs the next sibling of the carouselGrid
        if (!next.length) { // if ther isn't a next
            next = $(this).siblings(':first'); // this is the first
        }
        next.children(':first-child').clone().appendTo($(this)); // put the next ones on the array



        for (var i=0;i<3;i++) { // THIS LOOP SPITS OUT EXTRA ITEMS TO THE CAROUSEL
            next=next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
        }


    });
    /* footer (back to top scroll) js */
    $(document).ready(function(){

        $(function(){

            $(document).on( 'scroll', function(){

                if ($(window).scrollTop() > 100) {
                    $('.scroll-top-wrapper').addClass('show');
                } else {
                    $('.scroll-top-wrapper').removeClass('show');
                }
            });

            $('.scroll-top-wrapper').on('click', scrollToTop);
        });

        function scrollToTop() {
            verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
            element = $('body');
            offset = element.offset();
            offsetTop = offset.top;
            $('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
        }

    });
    /** video-about-about-blended**/
    jQuery('.read-more').click(function(e){
        e.preventDefault();
        var current = jQuery(this);
        var target = current.attr('href');
        if(current.hasClass('open')){
            current.removeClass('open').text('Read More...');
        }else{
            current.addClass('open').text('Read Less...');
        }
        jQuery(target).slideToggle('slow');
    });
});
