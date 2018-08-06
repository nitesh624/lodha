$.fn.hasAttr = function(name) {  
    return this.attr(name) !== undefined;
 };

$(document).ready(function() {

    var slider1 = $('#carouselFloor').data('flexslider'); 
    var slider2 = $('#sliderFloor').data('flexslider'); 

    // The slider being synced must be initialized first
    function startSlider(){
        
        $('#carouselFloor').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 125,
            itemMargin: 15,
            asNavFor: '#sliderFloor'
        });
        
        $('#sliderFloor').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: "#carouselFloor",
            start: function(slider) {
                $('.totalSlides').text(slider.count);
                $('.currentSlide').text('1');
            },
            after: function(slider) {
                $('.currentSlide').text(slider.currentSlide + 1);
            }
        });
    }
    function amenitySlider(){
        $('.sliderAmenities').removeData("flexslider");
        $('.sliderAmenities').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            start: function(slider) {
                var pagingSection = $(slider).attr('navFor');
                $('#'+pagingSection).find('.totalSlides').text(slider.count);
                $('#'+pagingSection).find('.currentSlide').text('1');
            },
            after: function(slider) {
                var pagingSection = $(slider).attr('navFor');
                $('#'+pagingSection).find('.currentSlide').text(slider.currentSlide + 1);
            }
        });
    }
    if($('.sliderAmenities').length) {
        amenitySlider();
    }
    var tabLinks = $('.customTabs').find('li');
    var commontabs;
    var currentTab;
    function customTabs(){
        commontabs = $(this).parent().attr('commonTab');
        currentTab = $(this).attr('tabName');
        $('.'+commontabs).css({'display':'none'});
        $('#'+currentTab).fadeIn();
        tabLinks.removeClass('activeTab');
        $(this).addClass('activeTab');
        if($(this).hasAttr('checkSlider')) {
            console.log('testddd');
            startSlider();
        }
        if($(this).hasAttr('amenitySlider')) {
            amenitySlider();
            
            
        }
    }

    $(tabLinks).on('click', customTabs);

    $('.propertyNav').owlCarousel({
        items:4,
        loop:false,
        center:false,
        margin:0,
        nav:true,
        responsive:{
            0:{
                items:2
            },600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });
    $('.unitplanCarousel').owlCarousel({
        items:1,
        loop:false,
        center:false,
        margin:1,
        nav:true
    });

    $('.toggleBtn a').each(function(){
        $(this).click(function(){
            var contentToggle = $(this).attr('toggleContent');
            $('#'+contentToggle).slideToggle();
            $(this).toggleClass('open');
        });
    });

    
});
