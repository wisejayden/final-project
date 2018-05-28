
var submit = $('#submit');
var origin = $('#origin');
var destination = $('#destination');
var originResults = $('#origin-results');
var destinationResults = $('#destination-results');
var svg = $('svg');
var originContainer = $('.origin-container');
var destinationContainer = $('.destination-container');
var singleResult = $('.singleresult');
var timetableInformation = $('.timetable-information');
var pathEls = document.querySelectorAll('path');
var hiddenPaths = $('.ind');
var lightsButton = $('#lightsonoff');
var mapOutline = $('.whitebackground');
var lightsOff = true;


clickOutOfResults(origin, originResults);
clickOutOfResults(destination, destinationResults);
incrementalSearcher(origin, originResults);
incrementalSearcher(destination, destinationResults);
highlightResults(originResults);
highlightResults(destinationResults);
resultsClick(origin, originResults);
resultsClick(destination, destinationResults);
keyDownActivity(origin, originResults);
keyDownActivity(destination, destinationResults);




//Intro animation
for (var i = 0; i < pathEls.length; i++) {
    var pathEl = pathEls[i];
    var offset = anime.setDashoffset(pathEl);
    pathEl.setAttribute('stroke-dashoffset', offset);
    var intro = anime({
        targets: pathEl,
        strokeDashoffset: [offset, 10],
        duration: anime.random(600, 10000),
        delay: anime.random(100, 3000),
        loop: false,
        direction: 'alternate',
        easing: 'easeInOutSine',
        autoplay: true
    });
}

//On map click, hide individual coloured lines
svg.on('click', function() {
    hiddenPaths.addClass('hide');
});

// 'Lights' button, swapping background and outline colours.
lightsButton.on('click', function() {
    if (lightsOff) {
        $('body, html').css('background-color', 'white');
        mapOutline.css('stroke', '#000000');
        originContainer.css('color', '#000000');
        destinationContainer.css('color', '#000000');
        hiddenPaths.removeClass('hide');

        for (var i = 0; i < pathEls.length; i++) {
            var pathEl = pathEls[i];
            var offset = anime.setDashoffset(pathEl);
            pathEl.setAttribute('stroke-dashoffset', offset);

            var intro = anime({
                targets: pathEl,
                strokeDashoffset: [offset, 0],
                duration: anime.random(1000, 2000),
                delay: anime.random(0, 1000),
                loop: false,
                direction: 'alternate',
                easing: 'easeInOutSine',
                autoplay: true
            });
        }
        lightsOff = false;

    } else {
        hiddenPaths.removeClass('hide');
        $('body, html').css('background-color', '#242426');
        mapOutline.css('stroke', '#ffffff');
        originContainer.css('color', '#ffffff');
        destinationContainer.css('color', '#ffffff');

        for (var k = 0; k < pathEls.length; k++) {

            var pathEl = pathEls[k];
            var offset = anime.setDashoffset(pathEl);
            pathEl.setAttribute('stroke-dashoffset', offset);


            var intro = anime({
                targets: pathEl,
                strokeDashoffset: [offset, 0],
                duration: anime.random(1000, 2000),
                delay: anime.random(0, 1000),
                loop: false,
                direction: 'alternate',
                easing: 'easeInOutSine',
                autoplay: true
            });
        }
        lightsOff = true;
    }
});



function incrementalSearcher (inputField, inputFieldResults) {
    inputField.on('input', function(e) {
        var val = e.target.value;
        val = val.replace(/ü/gi, 'u');
        val = val.replace(/ö/gi, 'o');
        val = val.replace(/ä/gi, 'a');
        val = val.replace(/ß/gi, 'ss');
        val = val.replace(/-/gi, ' ');

        if(!e.target.value) {
            inputFieldResults.empty();
            return;
        }
        var matches = [];
        for( var key in stations) {
            if(stations[key].name.toLowerCase().indexOf(val.toLowerCase()) == 0) {
                matches.push(key);
                if(matches.length >= 5) {
                    break;
                }
            } else {
                inputFieldResults.html('No results');
            }

        }
        var result = '';
        for (var i = 0; i < matches.length; i++) {
            result += '<div class="' + inputField.attr('name') + ' ' + 'singleresult">' + matches[i] + '</div>';
        }
        inputFieldResults.html(result).removeClass('hidden');
    });
}
//When clicking outside of input, empty fields.
function clickOutOfResults(inputField, inputFieldResults) {
    inputField.on('blur', function() {
        inputFieldResults.empty();
    });
}

function highlightResults (inputFieldResults) {
    inputFieldResults.on('mouseover', function(e) {
        $('.highlight').removeClass('highlight');
        $(e.target).addClass('highlight');
    });
}
function resultsClick (inputField, inputFieldResults) {
    inputFieldResults.on('mousedown', function(e) {
        inputField.val($(e.target).html());
        inputFieldResults.addClass('hidden');
    });
}
//Add arrow key functionality
function keyDownActivity(inputField, inputFieldResults) {
    inputField.on('keydown', function(e) {
        singleResult = $('.singleresult');

        for (var i = 0; i < singleResult.length; i++) {
            if($(singleResult[i]).hasClass('highlight')) {
                break;
            }
        }
        singleResult.removeClass('highlight');
        if(e.which == 38) {
            if (i > 0) {
                singleResult.eq(i-1).addClass('highlight');
            }
        } else if (e.which == 40) {
            if(i < singleResult.length-1) {
                singleResult.eq(i+1).addClass('highlight');
            }
            if(i == singleResult.length) {
                singleResult.first().addClass('highlight');
            }
        }
        if(e.which == 13) {
            inputField.val(singleResult.eq(i).html());
            inputFieldResults.empty();
        }
    });
}


submit.on('click', function() {
    var searchOrigin;
    var searchDestination;
    for( var key in stations) {
        if (key == origin.val()) {
            searchOrigin = stations[key].id;
        }
        if(key == destination.val()) {
            searchDestination = stations[key].id;
        }
    }

    //Easter egg
    if(destination.val().toLowerCase() == 'the party') {
        hiddenPaths.removeClass('hide');
        for (var i = 0; i < pathEls.length; i++) {
            var randomColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
            pathEls[i].setAttribute('style', 'fill:' + randomColor);
            var pathEl = pathEls[i];
            var offset = anime.setDashoffset(pathEl);
            pathEl.setAttribute('stroke-dashoffset', offset);
            anime({
                targets: pathEl,
                strokeDashoffset: [offset, 0],
                duration: anime.random(1000, 3000),
                delay: anime.random(0, 2000),
                loop: true,
                direction: 'alternate',
                easing: 'easeInOutSine',
                autoplay: true
            });
            callSetTimeout();

        }
        function callSetTimeout() {
            setTimeout(function() {
                var randomColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
                var first = true;
                if(first) {
                    for (var i = 0; i < pathEls.length; i++) {
                        pathEls[i].setAttribute('style', 'stroke:' + randomColor);
                        first = false;
                    }
                }else {
                    for (var i = 0; i < pathEls.length; i++) {
                        pathEls[i].setAttribute('style', 'fill:' + randomColor);
                        first = true;
                    }
                }
                callSetTimeout();
            }, 200);
        }

        //Normal functionality, ajax call to retrive data
    } else {
        $.ajax({
            url: 'https://2.vbb.transport.rest/journeys?from=' + searchOrigin + '&to=' + searchDestination + '&tram=false&bus=false&express=false&regional=false',
            headers: {
            },
            success: function(data) {
                var departure = [];
                var departureHtml = '';

                //Organise data retreived from API. Departure information is available for the next 5 trains, and each train may have several different legs (or stops).
                for (var i = 0; i < data.length; i++) {
                    departure.push({departure: data[i].departure, legs: data[i].legs});
                }

                //Check if train is cancelled, otherwise make time and date more readable
                for (var d = 0; d < departure.length; d++) {
                    if(departure[d].departure == null) {
                        departure[d].departure = 'Cancelled';
                    } else {
                        departure[d].departure = new Date(departure[d].departure).toLocaleTimeString();
                        departure[d].departure = departure[d].departure.slice(0, -3);
                    }
                }

                //Create custom object containing all relevant journey information to be used for the animation function. Data pulled from API.
                var allLegInformation = {
                };

                //Loop through departure, creating html divs containing each journey, including all leg information to include as text information on the side.
                for (var q = 0; q < departure.length; q++) {
                    departureHtml +='<div class="departure-times ' + [q] + '" data-myval="' + [q] +  '">' + departure[q].departure + '</div>';
                    allLegInformation["journey" + q] = [];
                    departureHtml += '<div class="leg-times-container hidden">';
                    for (var l = 0; l < departure[q].legs.length; l++) {
                        var trainLine;
                        var oneLeg = departure[q].legs[l];
                        if(departure[q] != null) {
                            if(oneLeg.mode) {
                                trainLine = "Walking";
                            } else {
                                trainLine = oneLeg.line.name;
                            }


                            oneLeg.departure = new Date(oneLeg.departure).toLocaleTimeString();
                            oneLeg.departure = oneLeg.departure.slice(0, -3);
                            oneLeg.arrival = new Date(oneLeg.arrival).toLocaleTimeString();
                            oneLeg.arrival = oneLeg.arrival.slice(0, -3);
                            departureHtml +='<div class="leg-times">From ' + oneLeg.origin.name + ' (' + oneLeg.departure + ') on the ' + trainLine + '<br>To ' + oneLeg.destination.name + ' (' + oneLeg.arrival + ')</div>';

                            allLegInformation["journey" + q].push({origin: oneLeg.origin.name, line: trainLine, destination: oneLeg.destination.name, direction: oneLeg.direction});

                        }
                    }
                    departureHtml += '</div>';
                }
                timetableInformation.html(departureHtml);
                //Animate first departure
                    makeThemLinesMove(allLegInformation, 0);

                //When clicking on journey information on the side, show all relevant information, displayed in a random colour, and calls function to animate all legs
                var clicked = false;
                $(".departure-times").on('click', function() {
                    var randomColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
                    if($(this).next().hasClass('hidden')) {
                        $(this).next().removeClass('hidden');
                        $(this).next().css('color', randomColor);
                        clicked = false;
                        makeThemLinesMove(allLegInformation, $(this).attr('data-myval'));
                    } else {
                        $(this).next().addClass('hidden');
                        clicked = true;
                    }
                });
            }
        });
    }
});
//


/*
 - Take custom made travel information object and current journey number.(this is adjustable by clicking on different times).
  - Match the Train Line (e.g. S41) against the 'allStationLines' object found in ('/js/stationlines.js'). Do this for every leg of the journey to find a complete trip.
  ///
   - Loop through matching array of objects to identify the correct direction.
   - Find origin and destination in new array. ANIMATE!.
*/




//Animation function
function makeThemLinesMove(allTravelInformation, journeyNumber) {
    console.log("allTravelInformation", allTravelInformation);
    console.log("journeyNumber", journeyNumber);
    //hide all coloured line to begin with
    for (var h = 0; h < hiddenPaths.length; h++) {
        hiddenPaths[h].classList.add('hide');
    }
    //Find current information to be passed to first function.
    var currentJourney = allTravelInformation["journey" + journeyNumber];


    //Retrives results from the set of functions and animates the returned lines.
    var allMatchingLines = findMatchingTrainLines(currentJourney);

    for (var i = 0; i < allMatchingLines.length; i++) {
        var animateLine = allMatchingLines[i].path[0];
        animateLine.classList.remove('hide');
        var offset = anime.setDashoffset(animateLine);
        animateLine.setAttribute('stroke-dashoffset', offset);
        anime({
            targets: animateLine,
            strokeDashoffset: [offset, 0],
            duration: anime.random(3000, 5000),
            delay: anime.random(0, 1000),
            loop: false,
            direction: 'alternate',
            easing: 'easeInOutSine',
            autoplay: true
        });
    }
}

function findMatchingTrainLines(currentJourney) {
    var allMatchingLines = [];
    //Try to match the current journeys train lines against object containing all station lines found in '/public/js/stationlines.js'
    for (var i = 0; i < currentJourney.length; i++) {
        for (var key in allStationLines) {
            if (allStationLines.hasOwnProperty(key)) {

                //If the lines are a match, pass the current leg and the line to the next function. This will be repeated for all legs of the current journey.
                if(currentJourney[i].line == key) {
                    var activeLines = allStationLines[key];
                    var matchingLines = organiseByDirection(currentJourney[i], activeLines);
                    //As this is being done for each leg of the journey, results will need to be looped through and then returned as an array of results.
                    for (var k = 0; k < matchingLines.length; k++) {
                        allMatchingLines.push(matchingLines[k]);
                    }
                }
            }
        }
    }
    return allMatchingLines;
}

//Loop through active lines, sorting out only the correct lines WITH the correct direction and then pass them onto next function.
function organiseByDirection(currentJourney, activeLines) {
    var matchingLinesWithCorrectDirection = [];
    for (var keykey in activeLines) {
        if (activeLines.hasOwnProperty(keykey)) {
            if (currentJourney.direction == activeLines[keykey].direction) {
                matchingLinesWithCorrectDirection.push(activeLines[keykey]);
            }
        }
    }
    var allMatchingLines = findDepartureStops(currentJourney, matchingLinesWithCorrectDirection);
    return allMatchingLines;
}


function findDepartureStops(currentJourney, activeLines) {
    //Find origin index point inside array and then remove all stations that precede it.
    var idx = activeLines.findIndex(function(item) {
        return item.name == currentJourney.origin;
    });
    var findStartStation = activeLines.slice(idx);

    //Do the same for the destination.
    var index = findStartStation.findIndex(function(item) {
        return item.name == currentJourney.destination;

    });
    var allMatchingLines = findStartStation.slice(0, index);
    //Return all matchingLines, ready for animation!
    return allMatchingLines;
}
