$(document).on("turbolinks:load", function() {

  $(".js-header-nav-child").hover(function() {
    $(this).parent().parent().children("h3").children().addClass("active-for-header")
  }, function() {
    $(this).parent().parent().children("h3").children().removeClass("active-for-header")
  });

  $(".js-header-nav-grand-child").hover(function() {
    $(this).parent().parent().children("a").addClass("active-for-header")
  }, function() {
    $(this).parent().parent().children("a").removeClass("active-for-header")
  });

  function moveTopImage(direction){
    var itemWidth = $(".owl-item").width()
    if (direction === "next") {
      $(".owl-stage").animate({left: `-=${itemWidth}px`}, 400, "swing", editNextActiveClass(itemWidth));
    } else if (direction === "prev"){
      $(".owl-stage").animate({left: `+=${itemWidth}px`}, 400, "swing", editPrevActiveClass(itemWidth));
    }
  }

  function editNextActiveClass(itemWidth){
    var beforeImage = $(".active")
    var afterImage
    if( $(".active").next().hasClass("cloned") ){
      afterImage = $(".owl-stage > .origin:first")
      $(".owl-stage").css({
        "width": `${itemWidth * 5}px`,
        "left" : `+=${itemWidth * 3}px`
      });
    }else{
      afterImage = $(".active").next()
    }
    beforeImage.removeClass("active")
    afterImage.addClass("active")
  }

  function editPrevActiveClass(itemWidth){
    var beforeImage = $(".active")
    var afterImage
    if( $(".active").prev().hasClass("cloned") ){
      afterImage = $(".owl-stage > .origin:last")
      $(".owl-stage").css({
        "width": `${itemWidth * 5}px`,
        "left" : `-=${itemWidth * 3}px`
      });
    }else{
      afterImage = $(".active").prev()
    }
    beforeImage.removeClass("active")
    afterImage.addClass("active")
  }

  function moveNextDot(){
    var beforeDot = $(".active-for-dot")
    var afterDot
    if( beforeDot.next()[0] ){
      afterDot = beforeDot.next()
    } else {
      afterDot = $(".owl-dots > .owl-dot:first")
    }
    beforeDot.removeClass("active-for-dot")
    afterDot.addClass("active-for-dot")
  }

  function showPrevDot(){
    var beforeDot = $(".active-for-dot")
    var afterDot
    if( beforeDot.prev()[0] ){
      afterDot = beforeDot.prev()
    } else {
      afterDot = $(".owl-dots > .owl-dot:last")
    }
    beforeDot.removeClass("active-for-dot")
    afterDot.addClass("active-for-dot")
  }

  $(window).on("load", function(){
    var initialWidth = $(window).width()
    $(".owl-stage").attr("style", `left: -${initialWidth}px; width: ${initialWidth * 5}px;`);
    $(".owl-item").attr("style", `width: ${initialWidth}px;`);
  })


  $(window).on("resize", function(){
    var beforeWidth = parseInt($(".owl-item").css("width"));
    var beforePosition = parseInt($(".owl-stage").css("left"));
    var afterWidth = $(window).width()
    var afterPosition = afterWidth * ( beforePosition / beforeWidth )
    $(".owl-stage").css({
      "width": `${afterWidth * 5}px`,
      "left": `${ afterPosition }px`
    });
    $(".owl-item").css({
      "width": `${afterWidth}px`,
    });
  });

  $(".owl-next").on("click", function(){
    moveNextDot()
    moveTopImage("next")
  });

  $(".owl-prev").on("click", function(){
    showPrevDot()
    moveTopImage("prev")
  });

  autoImageSlide = function(){
    moveNextDot()
    moveTopImage("next")
  }

  if ($(".owl-carousel")[0]){
    if (window.set_timer_on == null || window.set_timer_on == false){
      window.timer = setInterval(autoImageSlide, 5000);
      window.set_timer_on = true;
    }
  }
  else{
    clearInterval(window.timer)
    window.timer = null
    window.set_timer_on = false;
  }
})
