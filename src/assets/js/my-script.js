
if ($('.paroller').length) {
    $('.paroller').paroller();
}

if ($('.wow').length) {
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: true
    });
    wow.init();
}

setTimeout(function() {
    $('.preloader').fadeOut('fast');
}, 1000);
$(window).on('scroll', function() {
    header_main();
});


function header_main() {
    if ($('.cust_manage').length) {
        var windowayn = $(window).scrollTop();
        var aynHeader = $('.cust_manage');
        var scrollayn = $('.scroll_top');
        if (windowayn >= 20) {
            aynHeader.addClass('fixed-header');
            $('.nav_cust').addClass('manage_effect');
            $('.navbar-brand').addClass('manage_logo');
            scrollayn.fadeIn(300);
        } else {
            aynHeader.removeClass('fixed-header');
            $('.nav_cust').removeClass('manage_effect');
            $('.navbar-brand').removeClass('manage_logo');
            scrollayn.fadeOut(300);
        }
    }
}

if ($('.scroll_top_target').length) {
    $(".scroll_top_target").on('click', function() {
        var scroll_top = $(this).attr('data-target');

        $('html, body').animate({
            scrollTop: $(scroll_top).offset().top
        }, 1000);

    });
}


if ($('.testimonial_sec').length) {
    $('.testimonial_sec').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        smartSpeed: 700,
        autoplay: 5000,
        navText: [' ', ' '],
        items: 1,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },

            768: {
                items: 1
            },

            800: {
                items: 1
            },
            960: {
                items: 1
            },
            1024: {
                items: 1
            }

        }
    });
}


if ($('.crm_pricing .crm_pricing_option .crm_option_toggle').length) {
    $(".crm_pricing .crm_pricing_option .crm_option_toggle").on('click', function() {
        $(this).toggleClass('active');
        $('.crm_pricing .crm_pricing_container').toggleClass('default-active toggle-package');
    });
}


if ($('.client-carousel').length) {
    $('.client-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        smartSpeed: 500,
        autoplay: 4000,
        navText: [' ', ' '],
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            600: {
                items: 3
            },
            800: {
                items: 4
            },
            1024: {
                items: 5
            }
        }
    });
}


$(document).ready(function() {

    'use strict';

    var c, currentScrollTop = 0,
        navbar = $('nav');

    $(window).scroll(function() {
        var a = $(window).scrollTop();
        var b = navbar.height();

        currentScrollTop = a;
        if (c < currentScrollTop && a > b + b) {
            navbar.addClass("scrollUp");
        } else if (c > currentScrollTop && !(a <= b)) {
            navbar.removeClass("scrollUp");
        }
        c = currentScrollTop;
    });

});

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

