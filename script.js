// Create the variable for latitude
// Create the variable for longitude
let latitude, longitude;

// Set const btn to #getWeatherBtn ID
const btn = document.getElementById('getWeatherBtn');

window.onload = function() {
    //gets today's date using the builtin Date object.
    const date = new Date();

    //extract the date from date object and format into string.
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

    //set .date to date String
    document.getElementById('date').innerHTML = dateString;

    //check for location through navigator
    if ("geolocation" in navigator) {
        //if success, run success()
		navigator.geolocation.getCurrentPosition(success)

	} else {
        //Otherwise print error message
	    console.log("Geolocation is not available in your browser.");
	}
}

btn.addEventListener('click', function() {
    let forecast = [["M", 52],["Tu", 53],["W", 54],["Th", 55],["F", 56]];
    let forecastElements = document.getElementsByClassName("forecast");
    for (let i = 0; i < forecast.length; i++) {
        forecastElements[i].innerHTML = forecast[i][0] + ": " + forecast[i][1] + "\u2109";
    }
});

function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude, longitude);
    // Print out the latittude and longitude to see if it works!
}