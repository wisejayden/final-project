
var overlay = $('#overlay');
var canvas = document.getElementById('canvas');
var submit = $('#submit');
var origin = $('#origin');
var destination = $('#destination');



submit.on('click', function() {
    var searchOrigin = origin.val();
    var searchDestination = destination.val();

    console.log(origin, destination.value);




    $.ajax({
        url: 'https://2.vbb.transport.rest/stations/900000013102/departures?when=tomorrow%206pm',
        headers: {
            // X-Identifier: "Jayden's transportation map"
        },
        success: function(data) {
            console.log(data);
        }
    });
});

// $(document).on('mousemove', function(e) {
//     var offsetX = e.offsetX - 174;
//     var offsetY = e.offsetY - 79;
//     console.log(offsetX, offsetY);
// });
//

var pathEls = document.getElementsByClassName('path1');

//

// var pathEls = document.querySelectorAll('path');
//
//
// for (var i = 0; i < pathEls.length; i++) {
//   var pathEl = pathEls[i];
//   var offset = anime.setDashoffset(pathEl);
//   pathEl.setAttribute('stroke-dashoffset', offset);
//   anime({
//     targets: pathEl,
//     strokeDashoffset: [offset, 0],
//     duration: anime.random(1000, 3000),
//     delay: anime.random(0, 2000),
//     loop: true,
//     direction: 'alternate',
//     easing: 'easeInOutSine',
//     autoplay: true
//   });
// }
