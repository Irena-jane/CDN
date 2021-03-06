$(function(){
  if($('#main-onepage').length){
    $('#main-onepage').onepage_scroll();


  }
  $('.js-onepage-links a').on('click', onLinksClick);
  function onLinksClick(){
        $(this).moveTo($(this).data('index'));
      };

  var heroHeight = $('#main-hero').outerHeight();
  if ($(window).width() > 992){
      $("#main-hero").vide("video/video_2", {});
      var instance = $("#main-hero").data("vide");

     $(window).scroll(function(e){

       if(!instance && $(window).scrollTop() < heroHeight) {
        setTimeout(function(){$("#main-hero").vide("video/video_2", {})}, 1000);
       }
       if(instance && $(window).scrollTop()< heroHeight) return;
       if(instance && $(window).scrollTop()> heroHeight) instance.destroy();

     });

     if($('#map_canvas').length){

      var address = new google.maps.LatLng(60.007100,30.368356);
      var center = new google.maps.LatLng(60.007424,30.364282);
      var MY_MAPTYPE_ID = 'mystyle';
      initializeMap();

      function initializeMap() {

            //     var stylez =   [
            //   {
            //     "stylers": [
            //       { "gamma": 0.25 },
            //       { "hue": "#1100ff" },
            //       { "visibility": "on" },
            //       { "invert_lightness": true },
            //       { "saturation": 33 },
            //       { "lightness": -81 }
            //     ]
            //   }
            // ];

            /*
            Стили для geo:
            [{"featureType":"water","elementType":"geometry.fill","stylers":[{"invert_lightness":true},{"color":"#46647f"},{"saturation":-10}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#101010"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#1e1e1e"}]}]*/


                var stylez =   [
              {
                  "stylers": [
                    { "weight": 1.3 },
                    { "invert_lightness": true },
                    { "visibility": "on" },
                    { "lightness": -56 },
                    { "hue": "#2c3e50" },
                    { "gamma": 1.45 }
                  ]
                }
            ];

                var mapOptions = {
                  zoom: 17,
                  center: center,
                  mapTypeControl: false,
                  scrollwheel:false,
                  disableDefaultUI: true,
                  mapTypeId: MY_MAPTYPE_ID
                };



                map = new google.maps.Map(document.getElementById("map_canvas"),
                    mapOptions);

                var styledMapOptions = {
                  name: "Мой стиль"
                };

                var jayzMapType = new google.maps.StyledMapType(stylez, styledMapOptions);

                map.mapTypes.set(MY_MAPTYPE_ID, jayzMapType);

               var img = './img/marker.png';
                var myMarker = new google.maps.Marker({
                  position:address,
                  map: map,
                  title: "Мы здесь!",
                  icon: img
                });
              }
     }

  }

});
