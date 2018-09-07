  

$(function() {
  $("#content h2, #content h3").not(".nav-exclude").each(function(){
    $("nav ul").append("<li class='nav-item tag-" + this.nodeName.toLowerCase() + "'><a class='nav-link' href='#" + $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + "'>" + $(this).text() + "</a></li>");
    $(this).attr("id",$(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
  });

  $("nav ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).position().top;
    var scroll = $("#scrollable").scrollTop();
    var scrollTop = position + scroll - 10;
    scrollTop = scrollTop < 70 ? 0 : scrollTop;
    $("#scrollable").animate({scrollTop: scrollTop}, 500);
    $('.collapse').collapse('hide');
    event.preventDefault();
  });

});
