var prdctListMenuPos;
var headerTopPos;
function screenSize(){
  if($(window).width() <= 1024)
  {
      $("body").removeClass("largeScreen").addClass("smallScreen");
  }
  else if($(window).width() > 1024)
  {
      $("body").removeClass("smallScreen").addClass("largeScreen");
  }
}
function homeBannerSrc()
{
  var countr = 0;
  $('.bannerCarousel .item').each(function(countr){
    var imgSrcdesktop = $(this).find('img.bannerImage').attr('data-srcdesktop');
    var imgSrcdevice = $(this).find('img.bannerImage').attr('data-srcdevice');

    var vdoSrcdesktop = $(this).attr('data-videosrcDesk');
    var vdoSrcdevice = $(this).attr('data-videosrcDevice');
    
    if($(window).width() < 768)
    {
      $(this).attr('data-videosrc', vdoSrcdevice) 
      $(this).find('img.bannerImage').attr("src", imgSrcdevice);
    }
    else if($(window).width() >= 768)
    {
      //videosrc = vdoSrcdesktop
      $(this).attr('data-videosrc', vdoSrcdesktop)
      $(this).find('img.bannerImage').attr("src", imgSrcdesktop);
    }

    var attr = $(this).attr('data-videosrc');
    if (typeof attr !== typeof undefined && attr !== false) {
      var videosrc = $(this).attr('data-videosrc');
      $(this).find('img.bannerImage').animate({"opacity":1},10)
      $(this).find('video').remove()
      
      var ths = $(this)
      
      $(this).append('<video muted loop="loop" preload="auto"><source src="'+videosrc+'" type="video/mp4"></video>');
    }

    var ths = $(this);
    var chkreadyState = ths.find('video').prop('readyState');
    var attr = ths.attr('data-videosrc');
    
    function checkLoad() {
      if(countr < $('.bannerCarousel .item').length)
      {
        if (typeof ths.attr('data-videosrc') !== typeof undefined && ths.attr('data-videosrc') !== false) {
          if (ths.find('video').prop('readyState') === 4) {
            ths.find('img.bannerImage').animate({"opacity": 0.5},500)
            //ths.find('video').height(ths.find('img').height())
            ths.find('video')[0].play();
            countr++
          }
          else {
            ths.find('img.bannerImage').animate({"opacity":1},10)
            setTimeout(checkLoad, 100);
          }
        }
        else {
          countr++
        }
      }
      else {
        return false
      }
    }
    checkLoad();
  })
}

function formPostback(){

  /*Select code*/
  $(".selectWrapper select").each(function(){
    $(this).children("option").each(function(){
        if($(this).attr("selected"))
        {
            $(this).parent().prev(".selectedvalue").html($(this).html());	
        }
    });
    if ($(this).prop('selectedIndex') != "0") {
      $(this).parents('.selectWrapper').removeClass('defaultSel');
    } else {
        $(this).parents('.selectWrapper').addClass('defaultSel');
    }
  });	
  $(".selectWrapper select").bind('change', function(){
    $(this).prev().html($(this).find('option:selected').text());

    if ($(this).prop('selectedIndex') != "0") {
      $(this).parents('.selectWrapper').removeClass('defaultSel');
    } else {
        $(this).parents('.selectWrapper').addClass('defaultSel');
    }
  });
  /*Select code*/
}
function inputBlur(){
	$('input[type="text"], textarea').each(function(){
	  if( !$(this).val() == "" ){
		$(this).next('.placeholder').addClass('stay');
	  } else {
		$(this).next('.placeholder').removeClass('stay');
	  }
	});
	
	$('input[type="text"], textarea').blur(function(){
		//alert(123)
	  if( !$(this).val() == "" ){
		$(this).next('.placeholder').addClass('stay');
	  } else {
		$(this).next('.placeholder').removeClass('stay');
	  }
	});
	$('input[type="text"], textarea').focus(function(){
		$(this).next('.placeholder').addClass('stay');
  });
  
  $('input[type="text"] ~ .placeholder, textarea ~ .placeholder').click(function(){
    if(!$(this).hasClass('stay'))
    {
      $(this).addClass('stay').prev().focus()
    }
  });
}
function destGal(galId,sld) {
  var ths = $(galId);
  var ulWrap = '';
  var liHeight = parseInt(ths.css('height'));
  var liWidth = parseInt(ths.css('width'));
  ths.find('.rhs').remove();
  ths.find('ul').eq(0).removeClass('lhs');
  
  ths.find('ul, li, img').removeAttr('style')
  
  $(sld).slider( "destroy" );
  $(sld).find('.wrap').remove()
}

/* Slider Gallry Starts */
function genGal(galId,sld) {
  var ths = $(galId);
  var ulWrap = '';
  var liHeight = parseInt(ths.css('height'));
  var liWidth = parseInt(ths.css('width'));
  ths.append('<ul class="rhs"></ul>');
  ths.find('ul').eq(0).addClass('lhs');
  for (var i = 0; i < ths.find('ul.lhs li').length; i++) {
      var clone = ths.find('ul.lhs li').eq(i).clone();
      ths.find('ul.rhs').prepend(clone);
  }
  ths.find('li, img').css('height', liHeight);
  ths.find('li, img').css('width', liWidth);
  ths.find('ul.rhs').css('margin-top', (parseInt(ths.find('ul.rhs').css('height')) - liHeight) * -1);

  $(sld).slider({
      slide: function(e, ui) {
          onSlideStartStop('slide', sld, galId, e, ui);
      },
      stop: function(e, ui) {
          onSlideStartStop('stop', sld, galId, e, ui);
      }
  });

  var sliderWidth = $(sld).width() / 7;
  $(sld).prepend('<div class="wrap"></div>')
  for (var i = 0; i < sliderWidth; i++) {
      $(sld).find('.wrap').prepend('<em></em>')
  }
  for (var i = 0; i < ths.find('ul.lhs li').length - 1; i++) {
    $(sld).find('.wrap').append('<span class="steps step'+i+'"></span>')
  }
  $(sld).find('.wrap .steps').css({"width": $(sld).width() / (ths.find('ul.lhs li').length - 1)})
}

function animateDots(sliderId,uiVal){
  var v = Math.floor($(sliderId).width()*uiVal/100);
  var finalA,finalB;
  for(var i=0; i<1000; i++){
      var a = i*7;
      var b = (i+1)*7;
      if( v>=a && v<=b ){
          finalA = Math.floor(a/7);
          finalB = Math.floor(b/7);
          break;
      }
  }
  var randomArray = [];
  for (var j = 0; j <6; j++) {
      randomArray.push( 'height_' + Math.floor(Math.random() * (10 - 1 + 1)) );
  }
  
  $(sliderId).find('em').removeAttr('class');
  
  if( finalA >= 2 ){ $(sliderId).find('em').eq(finalA-2).addClass(randomArray[0]); }
  if( finalA >= 1 ){ $(sliderId).find('em').eq(finalA-1).addClass(randomArray[1]); }
  $(sliderId).find('em').eq(finalA).addClass(randomArray[2]);
  $(sliderId).find('em').eq(finalB).addClass(randomArray[3]);
  $(sliderId).find('em').eq(finalB+1).addClass(randomArray[4]);
  $(sliderId).find('em').eq(finalB+2).addClass(randomArray[5]);
  $(sliderId).find('em').eq(finalB+3).removeAttr('class');
  $(sliderId).find('em').eq(finalB+4).removeAttr('class');
}

function onSlideStartStop(evnt, sliderId, galleryId, e, ui) {
  var ths = $(galleryId);
  var uiVal = ui.value; //10
  //ths.next('p.copytext').html('')
  animateDots(sliderId,uiVal);

  if (evnt == 'stop') {
      var len = parseInt(ths.find('ul.lhs li').length)-1;
      var uiVal1 = 100 / len; //25
      var activeLiInd = Math.round(uiVal/uiVal1);
      var activeLiIndTxt = ths.find('ul.lhs li').eq(activeLiInd).attr('data-attr')
      for (var k = 0; k < len; k++) {
          var a = uiVal1 * k;
          var b = uiVal1 * (k + 1);
          if (uiVal > a && uiVal < b) {
              var c = (uiVal1 * k) + (uiVal1 / 2);
              if (uiVal > c) {
                  uiVal = (b);
              } else if (uiVal < c) {
                  uiVal = (a);
              }
              break;
          }
      }
      
      $(sliderId).slider("value", uiVal); 
      $(sliderId).find('em').removeAttr('class');
      

      var ht2 = parseInt(ths.find('ul').height()) - parseInt(ths.height());
      var val = (ht2 * uiVal) / 100;

      ths.find('.lhs').stop(false, true).animate({
          'top': val * -1
      }, uiVal * 10);
      ths.find('.rhs').stop(false, true).animate({
          'top': val
      }, uiVal * 10);
      
      //ths.next('p.copytext').html(activeLiIndTxt)
  } else {
      
      var ht2 = parseInt(ths.find('ul').height()) - parseInt(ths.height());
      var val = (ht2* uiVal) / 100;

      ths.find('.lhs').stop(false, true).animate({
          'top': val * -1
      }, uiVal);
      ths.find('.rhs').stop(false, true).animate({
          'top': val
      }, uiVal);
  }
}
/* Slider Gallery Ends */
$(function(){
  homeBannerSrc();
  screenSize();
  formPostback();
  inputBlur();
  pillars();

  //$("html, body").animate({scrollTop : 0},1000);
$(".hide").hide();
    $('.radioGroup li').click(function() {
        //alert(1)
        if ($("#bookasitevisit").is(':checked') == true) {
            $('.hide').slideDown();
        } else {
            $('.hide').slideUp();
        }
    });
  $('.locateUs .mapSec span.plusSign').click(function(){
    $(this).parents('.locateUs').find('.mapContainer').fadeIn();
  });
  $('.locateUs .mapContainer span.minusSign').click(function(){
    $(this).parents('.mapContainer').fadeOut();
  });
  $('.dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
});
$('.dropdown .dropdown-menu li').click(function () {
  var ths = $(this);
  $(this).parents('.dropdown').find('span').text($(this).text());
  //console.log($(this).index());
  ths.parents('.sliderWrap').find('.sectionOverlay').addClass('slide');
  $(this).parents('.sliderWrap').find('.galleryWrap').eq($(this).index()).addClass('currentActive').siblings('.galleryWrap').removeClass('currentActive');
  
  
  setTimeout(function(){
    ths.parents('.sliderWrap').find('.sectionOverlay').removeClass('slide');
  },1000);
  setTimeout(function(){
    ths.parent('.dropdown-menu').slideUp(300);
  },10);
    //$(this).parent('.dropdown-menu').hide();
}).eq(0).click();
/*End Dropdown Menu*/

var selectCatIcon = setInterval(function() {
  var liLength = $('.lifestyleWrap .selectCat span.icon li').length - 1;
  var activeLI = $('.lifestyleWrap .selectCat span.icon li.current').index();
  //console.log(activeLI < liLength)
  if(activeLI < liLength)
  {
    $('.lifestyleWrap .selectCat span.icon li').eq(activeLI + 1).addClass('current').siblings('li').removeClass('current');
  }
  else if (activeLI == liLength)
  {
    $('.lifestyleWrap .selectCat span.icon li').eq(0).addClass('current').siblings('li').removeClass('current');
  }    
}, 500);

  genGal('.galleryWrapper', '#slider');
  genGal('.galleryWrapper1', '#slider1');
  genGal('.galleryWrapper2', '#slider2');
  genGal('.galleryWrapper3', '#slider3');
  

  $( "#searchValslider" ).slider();
  $('.searchWrap .searchIcon').click(function(){
    $('body').addClass('noScroll');
    $('.searchLightboxWrap').fadeIn().find('.searchLightbox').addClass('active')
  });
  $('.searchLightbox .close').click(function(){
    $('.searchLightboxWrap').hide().find('.searchLightbox').removeClass('active');
    $('body').removeClass('noScroll');
  });

  
  $('.pillarsCarousel .item').mouseenter(function(){
    if($(window).width() >= 768)
    {
      $(this).parents('.pillarsCarousel').find('.item').addClass('disabled');
      $(this).removeClass('disabled').addClass('hovered');
    }
  });
  $('.pillarsCarousel .item').mouseleave(function(){
    $(this).parents('.pillarsCarousel').find('.item').removeClass('disabled');
    $(this).removeClass('hovered');
  });

  
  /*03 Jul 18*/
  var tabsCount = 0;
  $('.otherProjectsCarousel .slide').each(function(){
    tabsCount++
    $(this).find('.tabsWrap').addClass('tabsWrap'+tabsCount);
  	var tabsWrap = $(this).find('.tabsWrap').html();
    $('.letsWorkBetter .appendedTabsWrap').append('<div class="tabsWrap tabsWrap'+tabsCount+'">'+tabsWrap+'</div>')
    //console.log(tabsWrap)
  });

  $('.appendedTabsWrap').on('click', '.tabs li', function (){
	 var ind = $(this).index();
   $('.otherProjectsCarousel .owl-item.active .slide').find('.tabs li').eq(ind).click();
   //$(this).addClass('active').siblings('li').removeClass('active');
	 //console.log($(this).text() +'---'+ $('.otherProjectsCarousel .owl-item.active .slide').find('.tabs li').eq(ind).html())
  });
  
  $('.letsWorkBetter .appendedTabsWrap .tabsWrap').hide();
  $('.letsWorkBetter .appendedTabsWrap .tabsWrap.tabsWrap1').show();
  /*03 Jul 18*/
  $('.otherProjectsCarousel').on('click', '.tabs li', function (){
    $(this).addClass('active').siblings('li').removeClass('active');
    $(this).parents('.slide').find('.tabContentWrap .tabContent').eq($(this).index()).show().addClass('currenttabContent').siblings('.tabContent').hide().removeClass('currenttabContent')
    //$(this).parents('.slide').find('.tabContentWrap .tabContent.activated .imgwrap').addClass('animated bounceInLeft');
    var currentClass = $(this).parents('.tabsWrap').attr('class').split(' ')[1];
    //console.log($('.appendedTabsWrap').find('.'+currentClass).html())
    $('.appendedTabsWrap .tabsWrap.'+currentClass).find('li').eq($(this).index()).addClass('active').siblings('li').removeClass('active');
    
  }).eq(0).click();

  $('.otherProjectsCarousel .slide').each(function(){
    $(this).find('.tabs li').eq(0).click();
  });
  $('.letsWorkBetter .appendedTabsWrap .tabsWrap').each(function(){
    $(this).find('.tabs li').eq(0).addClass('active');
  });

  $('.reviewsWrap').on('click', '.profilePic', function () {
    var ind = $(this).children('.tab').attr('data-attr');
    //$(this).addClass('active').siblings('li').removeClass('active');
    $(this).parents('.reviewsWrap').find('.profileWrap .profileBox').eq(ind).fadeIn().siblings('.profileBox').hide();
    var currentClass = $(this).attr('class').split(' ')[1];
    $(this).siblings('.profilePic.profilePicMain').addClass(currentClass).removeClass('profilePicMain');
    $(this).removeClass(currentClass).addClass('profilePicMain');
    //var num = $(this).parent('.profilePic').attr('class').match(/\d+$/)[0];
    //$('.picPos-'+num).show();
  });

  $('.reviewsWrap .profilePic .tab[data-attr="0"]').click()

  $(".selectWrapper select").focus(function(){
    $(this).parent('.selectWrapper').addClass('fieldFocus')
  });
  $(".selectWrapper select").blur(function(){
    $(this).parent('.selectWrapper').removeClass('fieldFocus')
  });
  
  if($('.propertypricecarousel').length)
  {
    $('.propertypricecarousel').owlCarousel({
      // items: 2,
      // animateIn: 'slideInLeft',
      // animateOut: 'fadeOut',
      loop: true,
      nav:true,
      margin:25,
      autoplay: false,
      // navRewind:false,
      responsive:{
        1025:{
          items: 3
        },
        768: {
          items: 2
        },
        320: {
          // animateIn: 'fadeIn',
          slideTransition: 'linear',
          // animateOut: 'fadeIn',
          items: 1
        }
      }
    });
  }
	$(".accordianWrap p.heading").click(function(){
		$(this).toggleClass("active").next('.accordCont').slideToggle();
  });
  if($('.iconicProCarousel').length)
  {
    $('.iconicProCarousel').owlCarousel({
      items: 1,
      animateIn: 'slideInLeft',
      animateOut: 'fadeOut',
      loop: true,
      nav:true,
      dots: true,
      touchDrag: true,
      mouseDrag: false,
      autoplay: false,
      navRewind:false
    });
  }

  if($('.otherProjectsCarousel').length)
  {
    $('.otherProjectsCarousel').owlCarousel({
      items: 1,
      animateIn: 'slideInLeft',
      animateOut: 'fadeOut',
      loop: true,
      nav:true,
      dots: true,
      touchDrag  : true,
      mouseDrag  : false,
      autoplay: false,
      navRewind:false,
    });
  }
  $('.otherProjectsCarousel').on('changed.owl.carousel', function(e) {
    if (e.item) {
		var index = e.item.index - 1;
		var count = e.item.count;
		if (index > count) {
			index -= count;
		}
		if (index <= 0) {
			index += count;
		}
		//console.log(index);
		$('.letsWorkBetter .appendedTabsWrap .tabsWrap').hide();
	    $('.letsWorkBetter .appendedTabsWrap .tabsWrap.tabsWrap'+index).fadeIn();
	}
  }); 

  if($('.innerMainBanner .bannerCarousel').length)
  {
    $('.innerMainBanner .bannerCarousel').owlCarousel({
      items: 1,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      loop: false,
      nav:false,
      dots: true,
      touchDrag  : true,
      mouseDrag  : false,
      autoplay: false,
      navRewind:false,
    });
  }

  if($('.ourAmenities .bannerCarousel').length)
  {
    $('.ourAmenities .contentWrap').addClass('active');
    $('.ourAmenities .bannerCarousel').owlCarousel({
      rtl: true,
      items: 1,
      loop: true,
      nav:true,
      dots: true,
      touchDrag: true,
      mouseDrag: false,
      autoplay: true,
      autoplayTimeout: 3000,
      smartSpeed: 2000,
      autoplayHoverPause: true
    });
    var secTitle = $('.ourAmenities').find('.sectionTitle').html();
    var content = $('.ourAmenities .bannerCarousel').find('.owl-item.active .content').html();
    $('.ourAmenities .contentWrap').find('.sectionTitle').append(secTitle);
    $('.ourAmenities .contentWrap').find('.content').html(content);

    //$('.letsWorkBetter .appendedTabsWrap').append('<div class="tabsWrap tabsWrap'+tabsCount+'">'+tabsWrap+'</div>')
    var owl = $('.ourAmenities .bannerCarousel');
    $('.customNextBtn').click(function() {
      owl.trigger('next.owl.carousel');
    })
    var activeSlide = $('.ourAmenities .bannerCarousel .owl-controls').find('.owl-dot.active').index() + 1;
    var totalSlides = $('.ourAmenities .bannerCarousel .owl-controls').find('.owl-dot').length
    if(totalSlides < 10)
    {
      $('.ourAmenities .contentWrap .pagination .totalSlides').html(' / 0'+ totalSlides)
    }
    else if(totalSlides >= 10)
    {
      $('.ourAmenities .contentWrap .pagination .totalSlides').html(totalSlides)
    }
    if(activeSlide < 10)
    {
      $('.ourAmenities .contentWrap .pagination .activeSlide').html('0'+ activeSlide)
    }
    else if(activeSlide >= 10)
    {
      $('.ourAmenities .contentWrap .pagination .activeSlide').html(activeSlide)
    }
  }
  $('.ourAmenities .bannerCarousel').on('changed.owl.carousel', function(e) {
    var activeSlide = $('.ourAmenities .bannerCarousel .owl-controls').find('.owl-dot.active').index() + 1;
    $('.ourAmenities .contentWrap').removeClass('active');
    var current = e.item.index;
    content = $(e.target).find(".owl-item").eq(current).find('.content').html();
    $('.ourAmenities .contentWrap').find('.content').html(content);
    setTimeout(function(){
      $('.ourAmenities .contentWrap').addClass('active');
      if(activeSlide < 10)
      {
        $('.ourAmenities .contentWrap .pagination .activeSlide').html('0'+ activeSlide)
      }
      else if(activeSlide >= 10)
      {
        $('.ourAmenities .contentWrap .pagination .activeSlide').html(activeSlide)
      }
    },50)
    
  });

  var owl = $('.bannerCarousel');
  if($('.bannerCarousel').length)
  {
    $('.bannerCarousel').owlCarousel({
      items: 1,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      // slideTransition: 'linear',
      loop: false,
      nav:false,
      dots: true,
      touchDrag  : true,
      mouseDrag  : false,
      autoplay: false,
      navRewind:false,
    });
  }

  $('.bannerCarousel').on('changed.owl.carousel', function(e) {
    var current = e.item.index;
    //var src = $(e.target).find(".owl-item").eq(current).find("img").attr('src');
    $('.bannerCarousel .owl-item').each(function(){
      if($(this).find('video').length)
      {
        var allVideo = $(this).find('video')
        allVideo[0].pause();
        allVideo[0].currentTime = 0;
      }
    });
    if($(e.target).find(".owl-item").eq(current).find('video').length)
    {
      var currentVideo = $(e.target).find(".owl-item").eq(current).find('video')
      currentVideo[0].play();
    }
    
  });


});

function pillars(){
  if($(window).width() < 768)
  {
    $('.pillarsCarousel').addClass('active');
    setTimeout(function(){
      $('.pillarsCarousel.active').owlCarousel({
        //items: 3,
        loop: false,
        nav: true,
        touchDrag  : true,
        mouseDrag  : true,
        autoplay: false,
        navRewind:false,
        responsive:{
          0:{
              items:1
          }
        }
      });
    },400)
  }
  else if($(window).width() >= 768)
  {
    $('.pillarsCarousel').removeClass('active');
    setTimeout(function(){
      $('.pillarsCarousel').trigger('destroy.owl.carousel').removeClass('owl-loaded');
      $('.pillarsCarousel').find('.owl-stage-outer').children().unwrap(); 
      $('.pillarsCarousel').removeClass('owl-carousel');
    },100)
  }
}

$(window).on('load', function(){
  $('.fixedHeader, .homeBanner, .innerMainBanner').addClass('animate');
  setTimeout(function(){
    sectionAnimate();
  },1000)
  
});

$(window).resize(function () {
  $('.menuDropdown').hide()
  if (this.resizeTO) clearTimeout(this.resizeTO);
  this.resizeTO = setTimeout(function () {
      $(this).trigger('resizeEnd');
  }, 100);
});
var winW = $(window).width()

$(window).bind('resizeEnd', function () {
//console.log('winW-'+ winW +'  windowWidth-'+$(window).width())
homeBannerSrc();
screenSize();
pillars();

/* Slider reset Starts */
/* $('.lifestyleWrap .sliderWrap .galleryWrap').each(function(){
  $(this).find('.rhs').remove()
}) */

 
setTimeout(function(){
  destGal('.galleryWrapper', '#slider');
  destGal('.galleryWrapper1', '#slider1');
  destGal('.galleryWrapper2', '#slider2');
  destGal('.galleryWrapper3', '#slider3');
},10)

setTimeout(function(){
  genGal('.galleryWrapper', '#slider');
  genGal('.galleryWrapper1', '#slider1');
  genGal('.galleryWrapper2', '#slider2');
  genGal('.galleryWrapper3', '#slider3');
},100)
/* Slider reset Ends */
if (winW != $(window).width()) {
    
  }
  winW = $(window).width();
});

$(window).scroll(function() {
  if($('body').hasClass('homepage'))
  {
    headerTopPos = $('.homeBanner .content').offset().top + ($('.homeBanner .content').height()/2);
  }
  //prdctListMenuPos = $('.prdctListMenu').offset().top;
	//console.log($(this).scrollTop() +'----'+prdctListMenuPos)
	if ($(this).scrollTop() > headerTopPos){  
	    $('.fixedHeader').addClass("fixed");
  }
  else{
    $('.fixedHeader').removeClass("fixed");
  }
});

function sectionAnimate(){
  var sections = $('section');
  $(window).scroll(function() {
    var cur_pos = $(this).scrollTop();
    sections.each(function() {
      var top = $(this).offset().top - 300;
      var bottom = top + $(this).outerHeight();
      if (cur_pos >= top && cur_pos <= bottom) {
        $(this).addClass('animate');      
      }
    });
  });
}

// ------------Aspi Page Starts------------
$(document).ready(function() {

  // Section residential Starts
  if($('.resdient-slider').length) {
    $('.resdient-slider').owlCarousel({
      items: 3,
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

  // $('.resdient-slider').on('changed.owl.carousel', function(event) {
  //   $('.owl-item.active:nth-child(2)').addClass('center');
  // });

  $('.resdient-slider').on('initialized.owl.carousel', function(event){ 
    if($('.resdient-slider .owl-item:first-child').hasClass('active')) {
      $('.resdient-slider > .owl-nav .owl-prev').addClass('deactive');
    }
  });

  
  $('.resdient-slider > .owl-nav .owl-next').on('click', function() {
    $('.resdient-slider > .owl-nav .owl-prev').removeClass('deactive');
    
    if($('.resdient-slider .owl-item:last-child').hasClass('active')) {
      $(this).addClass('deactive');
    }
  });
  
  $('.resdient-slider > .owl-nav .owl-prev').on('click', function() {
    $('.resdient-slider > .owl-nav .owl-next').removeClass('deactive');
    
    if($('.resdient-slider .owl-item:first-child').hasClass('active')) {
      $(this).addClass('deactive');
    }
  });
  
  $('.inner-slider').owlCarousel({
    items: 1,
    nav: true
  });
  // Section residential Ends

if($('.innerMainBanner').length) {
  var header_height =  $('.fixedHeader').outerHeight();
  var banner_height = $('.innerMainBanner').offset().top + $('.innerMainBanner').outerHeight();
  var form_height = $('.getInTouchLightBox').outerHeight();
  $('.getInTouchLightBox').css({'top': banner_height - form_height});
}


// Code to be resumed -- sky will fall on u
  //Header nav Starts
  $('.subHeader .topNav ul').show();
  if($(window).width > 768) {
    if($('.subHeader .topNav ul').length) {
      setTimeout(function() {
        $('.subHeader .topNav ul').owlCarousel({
          items: 6,
          // autoWidth:true,
          nav:false,
          dots: false,
          // slideTransition: false,
          autoplay: false,
          responsive: {
            767: {
              autoWidth:true
            },
            481: {
              items: 6
            },
            361: {
              items: 4 
            },
            320: {
              items: 3
            }
          }
        });
      }, 400);  
    }
  }
  //Header nav Ends 

  // propertyPrice Section-title Starts
  // var title_height = $('.propertyPrice .sectionTitle').outerHeight();
  // $('.propertyPrice .sectionTitle.active .before-block').css({'height': title_height});
  // propertyPrice Section-title Ends


  //subHeader fix Starts
  var window_width = $(window).width();
  var fixed_header = $('.fixedHeader').outerHeight();
  var subheader_height = $('.subHeader').outerHeight();

  var breadcrumb_height = $('.subHeader .breadcrumb').outerHeight();
  var topNav_height = $('.subHeader .topNav').outerHeight()/2;
  var navTotalHeight = breadcrumb_height + topNav_height;
  

  $('.subHeader').css({'top': fixed_header});

  if($('.getInTouchLightBox').length) {
  var form_offset = $('.getInTouchLightBox').offset().top;
  var form_offsetLeft = $('.getInTouchLightBox').offset().left;
  var formTopFixed = form_offset - navTotalHeight;

  $(document).scroll(function() {
    var y = $(document).scrollTop();

    if( y > fixed_header) {
      $('.subHeader .breadcrumb').fadeIn();
      $('.subHeader').addClass('active');
      // if(window_width > 767) {
      //   $('.subHeader.active .owl-stage').css({'width': '100%'});
      // }
      $('.innerMainBanner').css({'margin-top': subheader_height});
    } else {

      // if(window_width > 767) {
      //   $('.subHeader.active .owl-stage').css({'width': ''});
      // }
      $('.subHeader .breadcrumb').hide();
      $('.subHeader').removeClass('active');
      $('.innerMainBanner').css({'margin-top': ''});
    }
    if (y > formTopFixed) {
      // $('.getInTouchLightBox .formWrapper').hide();
      // $('.getInTouchLightBox').addClass('active').css({'top': navTotalHeight});


      $('.getInTouchLightBox').fadeOut();
      $('.subHeader .topNav .enquire-block').fadeIn().css({'left': form_offsetLeft});
    } else {
      // $('.getInTouchLightBox .formWrapper').fadeIn();
      // $('.getInTouchLightBox').removeClass('active').css({'top': banner_height - form_height});

      $('.getInTouchLightBox').fadeIn();
      $('.subHeader .topNav .enquire-block').fadeOut();
    }
  });
  }
  
  //subHeader fix Ends

  // our Service Section Starts
  // $('.pillar-services')
  // our Service Section Ends
  // ------------Aspi Page Ends------------


  // ------------locate-us Page Starts------------
  $(document).on('click', '.modalOpen', function() {
    var modalOp = $(this).attr('data-modal-id');
    openPopup(modalOp);
    console.log(14);
}).on('click', '.modalBody .close', function() {
    closePopup();
}).on('click','.mapTabs a',function(){
    $(this).addClass('active').parents('.owl-item').siblings().find('a').removeClass('active');
    var searchtype = $(this).attr('data-change-map');
    initMap(searchtype);
    $('#map').removeClass('propMap');
    $('#map').removeClass('pointerOpen');
});


function openPopup(id) {
    var popId = $('#' + id);
    popId.fadeIn(500);
    $('body').css({ overflow: 'hidden', position: 'relative' });
}

function closePopup() {
    $('.modal').fadeOut(500);
    $('body').css({ overflow: 'visible', position: 'relative' });
}

  // ------------locate-us Page Ends------------

  
});