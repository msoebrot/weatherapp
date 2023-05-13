const express = require('express');
const request = require("request");

const app = express();

var cors = require('cors')
app.use(cors())


const API_KEY = "94c5f57589203d3184dcfa34ef26ac74";

app.get('/weather/:latitude/:longitude', (req, res) => {
  	//res.send('Hello World!');
  	//console.log("welcome to the root!");
  	let latitude = req.params['latitude'];
  	let longitude = req.params['longitude'];
  	console.log(latitude, longitude);

  	var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`
  
	request(url, (error, response, body)=>{
		
		// Printing the error if occurred
		if(error) console.log(error)
	   
		// Printing status code
		console.log(response.statusCode);
		 
		// Printing body
		//console.log(body);

		body = JSON.parse(body);
		
		//console.log(body.main.temp);
		//console.log(body.weather[0].main);
		let current = {"temperature": body.main.temp,"weatherStatus": body.weather[0].main};
		res.send(current);
		console.log(current)
	});
  
});

app.get('/5day/:latitude/:longitude', (req, res) => {
	//res.send('Hello World!');
	//console.log("welcome to the root!");
	let latitude = req.params['latitude'];
	let longitude = req.params['longitude'];
	console.log(latitude, longitude);

	let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`;
  
	request(url, (error, response, body)=>{
		
		// Printing the error if occurred
		if(error) console.log(error)
	   
		// Printing status code
		console.log(response.statusCode);
		 
		// Printing body
		//console.log(body);

		body = JSON.parse(body);
		let todaysDate = new Date().getDay();
		const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		let forecast = [];
		for(let i = 0; i < 5; i++) {
			//console.log(body.list[i].main.temp)
			let tempSum = 0; //sum of all temps fror the dat
			let count = 0; //number of datapoints for a day
			for(let dataPoint of body.list) {
				const date = new Date(dataPoint.dt * 1000) //Converts milliseconds to seconds and creates date
				if(date.getDay() === todaysDate ) { //if the currentHour data reference is equal to todays date
					count++; //Add 1 to the total number of data points
					tempSum += dataPoint.main.temp; //add the teperature to our running total
				}
			}

			const day = {"dayName": week[todaysDate], "temp": Math.round(tempSum/count)}; //create our JSON datapoint
			forecast.push(day); //Add the JSON datapoint to our forecast
			todaysDate = (todaysDate + 1) % 7 //Add 1 to the current date, if over 7 or over, goes back to 0
		}
		console.log(forecast);
		res.send(forecast)
	});
});

app.listen(3000, () => {
  	console.log('Example app listening on port 3000!'); //Go to http://localhost:3000/');
});