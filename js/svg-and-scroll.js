var isIOS;

$(function() {
    svgloader(".svgBox");
})

function svgEditorForIE(_thisParam) {
    var _this = _thisParam;
    if (_this.find("svg").length) {
        _this.find("svg").each(function() {
            $(this).removeAttr("style");
            var thisWidth = parseInt($(this).attr("width"));
            var thisHeight = parseInt($(this).attr("height"));
            var viewBox = this.getAttribute('viewBox');
            viewBox = viewBox.split(" ");
            var requiredWidth = parseInt($(this).width());
            var requiredHeight = ((requiredWidth * thisHeight) / thisWidth);
            _this.find("svg").css({
                "width": requiredWidth + "px",
                "height": requiredHeight + "px"
            });
        });
    }
}

var dataSkroller = function() {
    if ($("[data-scroll='active']").length) {
        var offTop = $("[data-scroll='active']").offset().top;
        var windowScrollTop = $(window).scrollTop();
        if ((offTop - windowScrollTop >= 0 && offTop - windowScrollTop < $(window).height() / 1.199) || windowScrollTop == 0) {
            $("[data-scroll='active']").each(function() {
                $(this).attr("data-scroll", "completed");
                $("[data-scroll='']").eq(0).attr("data-scroll", "active");


                /*if(".wpb_animate_when_almost_visible:not(.wpb_start_animation)"){
                    jQuery(this).addClass("wpb_start_animation")
                }*/


                $(this).find('.wowAnimate').each(function() {
                    $(this).css({ 'visibility': 'visible', 'animation-delay': '0.4s', 'animation-name': 'fadeInUp' })
                    $(this).addClass('animated');
                });

                /*$(this).find('.callAnim').each(function(){
                    var dataDelay = $(this).data('delay');
                    var dataAnimType = $(this).data('animtype');
                    $(this).css({'visibility':'visible','animation-delay':dataDelay, 'animation-name':dataAnimType})
                    $(this).addClass('animated');
                })*/
            });
        }
    }
}





var svgloader = function(target) {
    $(target).each(function(index) {
        var svgPath = $(this).attr("data-svg");
        var _this = this;
        if ($(this).find("svg").length == 0) {
            var l = Snap.load(svgPath, onSVGLoadedCallBack);

            function onSVGLoadedCallBack(data) {
                var svgParent = Snap(_this);
                svgParent.append(data);
                var svg = svgParent.select("svg");


            }
        }
    });

}
var isIE = false;

$(window).on("scroll", function() {
    //Do Something On each Scroll;
    dataSkroller();
    svgEditorForIE($(this));
})