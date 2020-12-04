(function($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */

    $.fn.visible = function(partial) {
        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    };

    $(window).scroll(function(event) {
        $(".testimonial-ayn .image_team .inner-testimonial .member-one, .testimonial-ayn .image_team .inner-testimonial .member-two, .testimonial-ayn .image_team .inner-testimonial .member-three,  .testimonial-ayn .image_team .inner-testimonial .member-four,  .testimonial-ayn .image_team .inner-testimonial .member-five,  .testimonial-ayn .image_team .inner-testimonial .member-six,  .testimonial-ayn .image_team .inner-testimonial .member-seven,  .testimonial-ayn .image_team .inner-testimonial .member-eight,  .testimonial-ayn .image_team .inner-testimonial .member-nine,  .testimonial-ayn .image_team .inner-testimonial .member-ten, .testimonial-ayn .image_team .inner-testimonial .member-eleven, .testimonial-ayn-two .image_team .inner-testimonial .member-one, .testimonial-ayn-two .image_team .inner-testimonial .member-two, .testimonial-ayn-two .image_team .inner-testimonial .member-three, .testimonial-ayn-two .image_team .inner-testimonial .member-four, .testimonial-ayn-two .image_team .inner-testimonial .member-five, .testimonial-ayn-two .image_team .inner-testimonial .icon").each(function(i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("qu_view");
            } else {
                el.removeClass("qu_view");
            }
        });
    });
})(jQuery);