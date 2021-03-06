"use strict";
/* 0. Initialization */
// Get height on Window resized
$(window).on('resize', function () {
    var slideHeight = $('.slick-track').innerHeight();
    return false;
});


// Smooth scroll <a> links
var $root = $('html, body');
$('a.s-scroll').on('click', function () {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top
    }, 500, function () {
        window.location.hash = href;
    });
    return false;
});

// Page Loader : hide loader when all are loaded
$(window).load(function () {
    $('#page-loader').addClass('hidden');
});


/* 1. Clock attribute */

var dateReadableText = 'Upcoming date';
if ($('.site-config').attr('data-date-readable') && ($('.site-config').attr('data-date-readable') != '')) {
    $('.timeout-day').text('');
    dateReadableText = $('.site-config').attr('data-date-readable');
    $('.timeout-day').text(dateReadableText);
}
$('.clock-countdown').downCount({
    date: $('.site-config').attr('data-date'),
    offset: +10
}, function () {
    //callback here if finished
    //alert('YES, done!');
    var zerodayText = 'An upcoming date';
    if ($('.site-config').attr('data-zeroday-text') && ($('.site-config').attr('data-zeroday-text') != '')) {
        $('.timeout-day').text('');
        zerodayText = $('.site-config').attr('data-zeroday-text');
    }
    $('.timeout-day').text(zerodayText);
});


/* 2. Background for page / section */

var background = '#ccc';
var backgroundMask = 'rgba(255,255,255,0.92)';
var backgroundVideoUrl = 'none';

/* Background image as data attribut */
var list = $('.bg-img');

for (var i = 0; i < list.length; i++) {
    var src = list[i].getAttribute('data-image-src');
    list[i].style.backgroundImage = "url('" + src + "')";
    list[i].style.backgroundRepeat = "no-repeat";
    list[i].style.backgroundPosition = "center";
    list[i].style.backgroundSize = "cover";
}

/* Background color as data attribut */
var list = $('.bg-color');
for (var i = 0; i < list.length; i++) {
    var src = list[i].getAttribute('data-bgcolor');
    list[i].style.backgroundColor = src;
}

/* Background slide show Background variables  */
var imageList = $('.slide-show .img');
var imageSlides = [];
for (var i = 0; i < imageList.length; i++) {
    var src = imageList[i].getAttribute('data-src');
    imageSlides.push({
        src: src
    });
}


/* Slide Background variables */
var isSlide = false;
var slideElem = $('.slide');
var arrowElem = $('.p-footer .arrow-d');
var pageElem = $('.page');

/* 3. Init all plugin on load */
$(document).ready(function () {


    /* var pageWidth, pageHeight;

    var basePage = {
        width: 800,
        height: 600,
        scale: 1,
        scaleX: 1,
        scaleY: 1
    };

    $(function () {
        var $page = $('.center-info');

        getPageSize();
        scalePages($page, pageWidth, pageHeight);

        //using underscore to delay resize method till finished resizing window
        $(window).resize(_.debounce(function () {
            getPageSize();
            scalePages($page, pageWidth, pageHeight);
        }, 150));


        function getPageSize() {
            pageHeight = $('#s-home').height();
            pageWidth = $('#s-home').width();
        }

        if( $(window).width() > 650){

        function scalePages(page, maxWidth, maxHeight) {
            var scaleX = 1,
                scaleY = 1;
            scaleX = maxWidth / basePage.width;
            scaleY = maxHeight / basePage.height;
            basePage.scaleX = scaleX;
            basePage.scaleY = scaleY;
            basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;

            var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth) / 2));
            var newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight) / 2));

            page.attr('style', '-webkit-transform:scale(' + basePage.scale + ');left:' + newLeftPos + 'px;top:' + newTopPos + 'px;');
        }
}
    });*/

    /* Init console to avoid error */
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }

    /* Init Slidesow background */
    $('.slide-show').vegas({
        delay: 5000,
        shuffle: true,
        slides: imageSlides,
        //transition: [ 'zoomOut', 'burn' ],
        animation: ['kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight']
    });

    /* Init video background */
    $('.video-container video, .video-container object').maximage('maxcover');

    /* Init youtube video background */
    if (backgroundVideoUrl != 'none') {

        //disable video background for smallscreen
        if ($(window).width() > 640) {
            $.okvideo({
                source: backgroundVideoUrl,
                adproof: true
            });
        }
    }

    /** Init fullpage.js */

    if ($(window).width() < 650) {
        $('#mainpage').fullpage({
            menu: '#qmenu',
            anchors: ['home', 'register', 'about-us', 'contact', 'puerto', 'faqs','calendario'],
            //        verticalCentered: false,
            //        resize : false,
            //		responsive: 900,
            scrollOverflow: false,
            touchSensitivity: 10,
            bigSectionsDestination: null,
            css3: false,
            navigation: false,
            onLeave: function (index, nextIndex, direction) {
                arrowElem.addClass('gone');
                pageElem.addClass('transition');
                //			$('.active').removeClass('transition');
                slideElem.removeClass('transition');
                isSlide = false;
            },
            afterLoad: function (anchorLink, index) {
                arrowElem.removeClass('gone');
                pageElem.removeClass('transition');
                if (isSlide) {
                    slideElem.removeClass('transition');
                }
            },
            afterRender: function () {},
            autoScrolling: false,
            fitToSection: false,
        });
    } else {
        $('#mainpage').fullpage({
            menu: '#qmenu',
            anchors: ['home', 'register', 'about-us', 'contact', 'puerto','faqs','calendario'],
            //        verticalCentered: false,
            //        resize : false,
            //		responsive: 900,
            scrollOverflow: true,

            touchSensitivity: 10,
            bigSectionsDestination: 'top',
            css3: false,
            navigation: false,
            onLeave: function (index, nextIndex, direction) {
                arrowElem.addClass('gone');
                pageElem.addClass('transition');
                //			$('.active').removeClass('transition');
                slideElem.removeClass('transition');
                isSlide = false;
            },
            afterLoad: function (anchorLink, index) {
                arrowElem.removeClass('gone');
                pageElem.removeClass('transition');
                if (isSlide) {
                    slideElem.removeClass('transition');
                }
            },
            afterRender: function () {},
            autoScrolling: true,
        });
    }

});



// Email validation text, uncomment below to use them
/*
// Email registration
var email_reg_elem = document.getElementById("reg-email");
email_reg_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This email field cannot be left blank");
	}
};
email_reg_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
// email message
var email_message_elem = document.getElementById("mes-email");
email_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This email field cannot be left blank");
	}
};
// name message
email_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
var name_message_elem = document.getElementById("mes-name");
name_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This name field cannot be left blank");
	}
};
// text message
name_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
var text_message_elem = document.getElementById("mes-text");
text_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This text field cannot be left blank");
	}
};
text_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
*/
