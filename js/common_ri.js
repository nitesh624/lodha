
$(document).ready(function(){
  if (screen.width > 767) {
    $('#menu-icon').click(function(){
      
       
        $('.leftMenuBox').addClass('slideInLeft').removeClass('slideOutLeft');
        $('.rightMenuBox').addClass('slideInRight').removeClass('slideOutRight');
        $('body, html').css('overflow','hidden');
        $('.menuOverlay').addClass('is-opening');
    });
    $('.closeBtn').click(function(){
      $('.leftMenuBox').removeClass('slideInLeft').addClass('slideOutLeft');
      $('.rightMenuBox').removeClass('slideInRight').addClass('slideOutRight');
      $('body, html').css('overflow','visible');
      setTimeout(function(){
        $(".menuOverlay").removeClass("is-opening");
    }, 500);
    });  
  }
/*for mobile screen*/
  if (screen.width < 767) {
    $('#menu-icon').click(function(){
        $('body, html').css('overflow','hidden');
        $('.menuOverlay').addClass('mobile-is-opening');
        $('.menuWrap').addClass('animated slideInLeft').removeClass('slideOutLeft');
       
    });
    $('.closeBtn').click(function(){
      $('body, html').css('overflow','visible');
      setTimeout(function(){
        $(".menuOverlay").removeClass("mobile-is-opening");
    }, 500);
    $('.menuWrap').removeClass('slideInLeft').addClass('slideOutLeft');
    });  
  }


  $('.mainMenu >  li').click(function(){
    $('.mainMenu >  li').removeClass("menuActive");
    $(this).addClass("menuActive");
    
});

$('.countryLanguage').click(function(){
$('.contryDropdown').slideToggle();
});
$('.mainMenu > li').click(function(e) {
  e.stopPropagation();
  var $el = $('ul',this);
  $('.mainMenu > li > ul').not($el).slideUp();
  $el.stop(true, true).slideToggle(400);
});
  $('.mainMenu > li > ul > li').click(function(e) {
  e.stopImmediatePropagation();  
});

/* for Show more Js*/
$('.showMore > a').click(function(){
  $('.showMoreContent').slideDown();
  $(this).slideUp();
});
$('.showMoreContent a').click(function(){
  $('.showMoreContent').slideUp();
  $('.showMore a').slideDown();
});
/*for tabmenu slider js*/
var scrollDuration = 300;
// paddles
var leftPaddle = document.getElementsByClassName('left-paddle');
var rightPaddle = document.getElementsByClassName('right-paddle');
// get items dimensions
var itemsLength = $('.item').length;
var itemSize = $('.item').outerWidth(true);
// get some relevant size for the paddle triggering point
var paddleMargin = 20;

// get wrapper width
var getMenuWrapperSize = function() {
	return $('.tabMenu').outerWidth();
}
var menuWrapperSize = getMenuWrapperSize();
// the wrapper is responsive
$(window).on('resize', function() {
	menuWrapperSize = getMenuWrapperSize();
});
// size of the visible part of the menu is equal as the wrapper size 
var menuVisibleSize = menuWrapperSize;

// get total width of all menu items
var getMenuSize = function() {
	return itemsLength * itemSize;
};
var menuSize = getMenuSize();
// get how much of menu is invisible
var menuInvisibleSize = menuSize - menuWrapperSize;

// get how much have we scrolled to the left
var getMenuPosition = function() {
	return $('.menuList').scrollLeft();
};

// finally, what happens when we are actually scrolling the menu
$('.menuList').on('scroll', function() {

	// get how much of menu is invisible
	menuInvisibleSize = menuSize - menuWrapperSize;
	// get how much have we scrolled so far
	var menuPosition = getMenuPosition();

	var menuEndOffset = menuInvisibleSize - paddleMargin;

	// show & hide the paddles 
	// depending on scroll position
	if (menuPosition <= paddleMargin) {
		$(leftPaddle).addClass('hidden');
		$(rightPaddle).removeClass('hidden');
	} else if (menuPosition < menuEndOffset) {
		// show both paddles in the middle
		$(leftPaddle).removeClass('hidden');
		$(rightPaddle).addClass('hidden');
	} else if (menuPosition >= menuEndOffset) {
		$(leftPaddle).removeClass('hidden');
		$(rightPaddle).addClass('hidden');
}

});

// scroll to left
$(rightPaddle).on('click', function() {
	$('.menuList').animate( { scrollLeft: menuInvisibleSize}, scrollDuration);
});

// scroll to right
$(leftPaddle).on('click', function() {
	$('.menuList').animate( { scrollLeft: '0' }, scrollDuration);
});

$('.menuList >  li').click(function(){
  $('.menuList >  li').removeClass("active");
  $(this).addClass("active");
  
});

/*fixed tab*/
var tabheader = $("body");
$(window).scroll(function() {    
  var scroll = $(window).scrollTop();
     if (scroll >= window.innerHeight) {
      tabheader.addClass("tabFixed");
      } else {
        tabheader.removeClass("tabFixed");
      }
});



  // Section residential Starts
  if($('.videoContent').length) {
    $('.videoContent').owlCarousel({
      items:1,
      // loop: true,
      nav: true,
      center:true,
      touchDrag  : false,
      mouseDrag  : false,
      autoplay: false,
      // margin: 35,
      startPosition: 1,
      responsive: {
        1025: {
          margin: 35
        },
        768: {
          // center: false,
          margin: 10
        },
        481: {
          startPosition: 0,
          center: false,
          margin: 20,
          stagePadding: 70,
          items: 1
        },
        320: {
          items: 1
        }
      }
    });
  }



});

