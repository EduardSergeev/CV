  

$(function() {
  $("#content h2, #content h3").not(".nav-exclude").each(function(){
    $("nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + "'>" + $(this).text() + "</a></li>");
    $(this).attr("id",$(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
    $("nav ul li:first-child a").parent().addClass("active");
  });

  $("nav ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).position().top;
    var scroll = $("#scrollable").scrollTop();
    var scrollTop = position + scroll - 10;
    scrollTop = scrollTop < 70 ? 0 : scrollTop;
    $("#scrollable").animate({scrollTop: scrollTop}, 500);
    $("nav ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();
  });

  $("#scrollable").scrollspy({offset: 50});

  // $("#scrollable").scrollspy({target: "nav", offset: 50});

  
  // $("#scrollable").on("scroll", function ()
  // {
  //   var scroll = $("#scrollable").scrollTop();
  // });
});
