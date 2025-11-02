"use strict";
(function(e){
  "use strict";
  
  // Stellar initialization removed - loaded separately via stellar-init.js to prevent React conflicts
  
  var r=function(){
    e(".js-fullheight").css("height",e(window).height());
    e(window).resize(function(){
      e(".js-fullheight").css("height",e(window).height()-90);
    });
  };
  r();
  
  var l=function(){
    setTimeout(function(){
      if(e("#ftco-loader").length>0){
        e("#ftco-loader").removeClass("show");
      }
    },1);
  };
  l();
  
  e.Scrollax();
  
  var d=function(){
    e(".carousel-testimony").owlCarousel({
      center:!0,
      loop:!0,
      items:1,
      margin:30,
      stagePadding:0,
      nav:!1,
      navText:['<span class="ion-ios-arrow-back">','<span class="ion-ios-arrow-forward">'],
      responsive:{0:{items:1},600:{items:2},1000:{items:3}}
    });
    
    e(".carousel-testimonials").owlCarousel({
      center:!0,
      loop:!0,
      items:1,
      margin:30,
      stagePadding:0,
      nav:!1,
      navText:['<span class="ion-ios-arrow-back">','<span class="ion-ios-arrow-forward">'],
      responsive:{0:{items:1},600:{items:2},1000:{items:3}}
    });
    
    e(".carousel-destination").owlCarousel({
      center:!1,
      loop:!0,
      items:1,
      margin:30,
      stagePadding:0,
      nav:!1,
      navText:['<span class="ion-ios-arrow-back">','<span class="ion-ios-arrow-forward">'],
      responsive:{0:{items:1},600:{items:2},1000:{items:4}}
    });
    
    e(".carousel-gallery").owlCarousel({
      center:!1,
      loop:!0,
      items:1,
      margin:30,
      stagePadding:0,
      nav:!1,
      navText:['<span class="ion-ios-arrow-back">','<span class="ion-ios-arrow-forward">'],
      responsive:{0:{items:1},600:{items:2},1000:{items:3}}
    });
  };
  d();
  
  e("nav .dropdown").hover(
    function(){
      var o=e(this);
      o.addClass("show");
      o.find("> a").attr("aria-expanded",!0);
      o.find(".dropdown-menu").addClass("show");
    },
    function(){
      var o=e(this);
      o.removeClass("show");
      o.find("> a").attr("aria-expanded",!1);
      o.find(".dropdown-menu").removeClass("show");
    }
  );
  
  e("#dropdown04").on("show.bs.dropdown",function(){
    console.log("show");
  });
  
  var u=function(){
    e(window).scroll(function(){
      var o=e(this);
      var s=o.scrollTop();
      var a=e(".ftco_navbar");
      var n=e(".js-scroll-wrap");
      
      if(s>150){
        if(!a.hasClass("scrolled")){
          a.addClass("scrolled");
        }
      }
      if(s<150){
        if(a.hasClass("scrolled")){
          a.removeClass("scrolled sleep");
        }
      }
      if(s>350){
        if(!a.hasClass("awake")){
          a.addClass("awake");
        }
        if(n.length>0){
          n.addClass("sleep");
        }
      }
      if(s<350){
        if(a.hasClass("awake")){
          a.removeClass("awake");
          a.addClass("sleep");
        }
        if(n.length>0){
          n.removeClass("sleep");
        }
      }
    });
  };
  u();
  
  var t={
    Android:function(){return navigator.userAgent.match(/Android/i);},
    BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i);},
    iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
    Opera:function(){return navigator.userAgent.match(/Opera Mini/i);},
    Windows:function(){return navigator.userAgent.match(/IEMobile/i);},
    any:function(){return t.Android()||t.BlackBerry()||t.iOS()||t.Opera()||t.Windows();}
  };
  
  var c=function(){
    e("#section-counter, .hero-wrap, .ftco-counter").waypoint(function(o){
      if(o==="down"&&!e(this.element).hasClass("ftco-animated")){
        var s=e.animateNumber.numberStepFactories.separator(",");
        e(".number").each(function(){
          var a=e(this);
          var n=a.data("number");
          console.log(n);
          a.animateNumber({number:n,numberStep:s},7000);
        });
      }
    },{offset:"95%"});
  };
  c();
  
  var m=function(){
    var o=0;
    e(".ftco-animate").waypoint(function(s){
      if(s==="down"&&!e(this.element).hasClass("ftco-animated")){
        o++;
        e(this.element).addClass("item-animate");
        setTimeout(function(){
          e("body .ftco-animate.item-animate").each(function(a){
            var n=e(this);
            setTimeout(function(){
              var i=n.data("animate-effect");
              if(i==="fadeIn"){
                n.addClass("fadeIn ftco-animated");
              }else if(i==="fadeInLeft"){
                n.addClass("fadeInLeft ftco-animated");
              }else if(i==="fadeInRight"){
                n.addClass("fadeInRight ftco-animated");
              }else{
                n.addClass("fadeInUp ftco-animated");
              }
              n.removeClass("item-animate");
            },a*50,"easeInOutExpo");
          });
        },100);
      }
    },{offset:"95%"});
  };
  m();
  
  e(".image-popup").magnificPopup({
    type:"image",
    closeOnContentClick:!0,
    closeBtnInside:!1,
    fixedContentPos:!0,
    mainClass:"mfp-no-margins mfp-with-zoom",
    gallery:{enabled:!0,navigateByImgClick:!0,preload:[0,1]},
    image:{verticalFit:!0},
    zoom:{enabled:!0,duration:300}
  });
  
  e(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
    disableOn:700,
    type:"iframe",
    mainClass:"mfp-fade",
    removalDelay:160,
    preloader:!1,
    fixedContentPos:!1
  });
  
  e(".checkin_date, .checkout_date").datepicker({
    format:"m/d/yyyy",
    autoclose:!0
  });
  
  e("#myModal").on("shown.bs.modal",function(){
    e("#myInput").trigger("focus");
  });
  
})(jQuery);

