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
});