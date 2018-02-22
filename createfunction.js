






//Pass the apis resulting legs into function.
function makeThemLinesMove(allTravelInformation, journeyNumber) {
    var arrayOfLines = [];
    //Find intended journey number
    var currentJourney = allTravelInformation["journey" + journeyNumber]


    //Loop through legs of journey
    for (var i = 0; i < currentJourney.length; i++) {
        //loop through and source correct line from loop
        for (var key in allStationLines) {
            if (allStationLines.hasOwnProperty(key)) {

                //match legs line Id to the correct line
                if(currentJourney[i].line == key) {
                    console.log("All Stations key", key);

                    var currentLine = allStationLines[key];
                    console.log("CurrentLine", currentLine);




                    //loop through the correct Line e.g. S3, S5
                    for (var o = 0; o < currentLine.length; o++) {

                        for (var keykey in currentLine[o]) {
                            if (currentLine[o].hasOwnProperty(keykey)) {


                                //Sort out the lines with the correct direction
                                if (currentJourney[i].direction == currentLine[o].direction) {
                                    console.log("destination and name", currentJourney[i].destination, currentLine[o].name);
                                    console.log("current line o length", o);

                                    //loop through the lines with the correct direction, disregarding every object following the destination property of the currentJourney
                                    for (var m = 0; m < currentLine[o].length; m++) {
                                        if(currentJourney[i].destination == currentLine[o].name) {
                                            console.log("yay");
                                            var activeLines = currentLine[0].slice(0, o);

                                        }
                                    }
                                    console.log("log activeLines", activeLines);





                                    // var activeLines = currentLine[o].slice(0, o);
                                    // var activeLines = currentJourney[o].filter()
                                    arrayOfLines.push(currentLine[o]);
                                }

                            }
                        }
                    }
                }
            } else {
                console.log("False");
            }

        }
    }
    //loop through an array containing every line and check to see if line matches variable name??????


    //loop through that array
    // for (var i = 0; i < u1.length; i++) {
    //     //loop through all objects filtering by direction
    //     for (var key in u1) {
    //         if (u1.hasOwnProperty(key)) {
    //             //filter everything after destination and then push to array
    //             arrayOfLines.push(u1[key].direction);
    //         }
    //     }
    // }

    //access trainlines[i] equivalent array
    //loop through that array and then loop thr ough the object, filtering by direction.
}
