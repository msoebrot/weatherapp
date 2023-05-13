// Create the variable for latitude
// Create the variable for longitude
let latitude = 0;
let longitude = 0;

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

function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude, longitude);
    // Print out the latittude and longitude to see if it works!
}

// Set const btn to #getWeatherBtn ID
const btn = document.getElementById('getWeatherBtn');

btn.addEventListener('click', function() {
    console.log('btn click');
    console.log(latitude, longitude);

    //Current forecast data
    const xhr = new XMLHttpRequest(); //Defines xmlhttp objject
    xhr.open("GET", `http://localhost:3000/weather/${latitude}/${longitude}`); // request to the website
    xhr.send(); //sends the request

    xhr.onload = function(){ //After reponse
        const body = JSON.parse(xhr.responseText); //Set body to responseText and transforms it from a string to an actual JSON object
        let temperature = body.temperature; //parse the temperature from the response
        let weatherStatus = body.weatherStatus; // Parse the weather status from the response
        console.log(temperature, weatherStatus)
        document.getElementById("temperature").innerHTML = `Temperature: ${temperature}\u00B0F`; //set temperature on document
        document.getElementById("weatherstatus").innerHTML = `Weather Status: ${weatherStatus}`; //set weatherStatus on document
    }

    //5 Day Forecast data
    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", `http://localhost:3000/5day/${latitude}/${longitude}`); //ioebs a fer request to the website
    xhr2.send(); //sends the request

    xhr2.onload = function(){ //After reponse
        const body  = JSON.parse(xhr2.responseText); //Set body to responseText and transforms it from a string to an actual JSON object
        let forecast = body; //parse the forecast list from the response
        console.log(xhr2.responseText)
        console.log(body[0])
        let forecastElements = document.getElementsByClassName("forecast");
        for(let i = 0; i < forecast.length; i++) {
            forecastElements[i].innerHTML = `${forecast[i].dayName}: ${forecast[i].temp}\u00B0F`
        }

    }
/*
    let forecast = [["M", 52],["Tu", 53],["W", 54],["Th", 55],["F", 56]];
    let forecastElements = document.getElementsByClassName("forecast");
    for (let i = 0; i < forecast.length; i++) {
        forecastElements[i].innerHTML = forecast[i][0] + ": " + forecast[i][1] + "\u00B0F";
    }
*/
});
