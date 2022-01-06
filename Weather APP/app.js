'use strict';


const weatherApi = {
	key:"5c6f3dcd49295867890b403e06374f6b",
	baseUrl:"https://api.openweathermap.org/data/2.5/weather"
}

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// 5c6f3dcd49295867890b403e06374f6b


// Event Listener Function on Keypress
const searchInputBox = document.getElementById('input-box');

searchInputBox.addEventListener('keypress', (event) => {

	if(event.keyCode == 13)
	{
		// console.log(searchInputBox.value);

		// here we can call the getWeatherReport function...with parameter ie. value inside the input box.
		getWeatherReport(searchInputBox.value);


		// displaying the weather report body to the webpage..
		document.querySelector('.weather-body').style.display = "block";
		// displaying the weather report body to the webpage..
	}

});



// Get Weather Report
function getWeatherReport(city)
{
	// calling the API using fetch...
	fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)// we want units in metric so we add some code in the above code...
	// after calling API we can use .then to fetch data from it....
	.then(weather =>{
		return weather.json(); // here we use weather variable and convert data to the json format...
	}).then(showWeatherReport); // redirect the json data to the next function called showWeatherReport...
}


// Show Weather Report
// here from the above code we can use weather which we returned from the above code... in the showWeatherReport() function
function showWeatherReport(weather)
{
	console.log(weather);

	// selecting city from the json data and change the text in DOM accordingly to the user inputs
	let city = document.getElementById('city');
	city.innerText = `${weather.name}, ${weather.sys.country}`;


	// selecting temp from the json data and change the text in DOM accordingly to the user inputs
	let temperature = document.getElementById('temp');
	temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;


	// selecting min/max from the json data and change the text in DOM accordingly to the user inputs
	let minMaxTemp = document.getElementById('min-max');
	minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/${Math.ceil(weather.main.temp_max)}&deg;C (max)`;


	// selecting weather type from the json data and change the text in DOM accordingly to the user inputs
	let weatherType = document.getElementById('weather');
	weatherType.innerText = `${weather.weather[0].main}`;
	
	
	// selecting feels like from the json data and change the text in DOM accordingly to the user inputs
	let feelsLike = document.getElementById('feels-like');
	feelsLike.innerHTML = `Feels Like: ${Math.floor(weather.main.feels_like)}&deg; C`;


	

	// getting access the date variable and modifying accordingly
	let date = document.getElementById('date');
	let todayDate = new Date();

	date.innerText = dateManage(todayDate);


	// Changing the background picture/Image according to the weather condition...

	if(weatherType.textContent == 'Clear')
	{
		document.body.style.backgroundImage = "url('conditions/clear.jpeg')";
	}
	else if(weatherType.textContent == 'Clouds')
	{
		document.body.style.backgroundImage = "url('conditions/cloud.jpeg')";
	}
	else if(weatherType.textContent == 'Haze')
	{
		document.body.style.backgroundImage = "url('conditions/haze.jpeg')";
	}
	else if(weatherType.textContent == 'Rain')
	{
		document.body.style.backgroundImage = "url('conditions/rain.jpeg')";
	}
	else if(weatherType.textContent == 'Snow')
	{
		document.body.style.backgroundImage = "url('conditions/snow.jpeg')";
	}
	else if(weatherType.textContent == 'Thunderstorm')
	{
		document.body.style.backgroundImage = "url('conditions/thunderstorm.jpeg')";
	}
	else if(weatherType.textContent == 'Mist')
	{
		document.body.style.backgroundImage = "url('conditions/mist.jpeg')";
	}

	// Changing the background picture/Image according to the weather condition...
}

// now we move to the event listner section of the input box and simply call the getWeatherReport function which pass the json formatted data to the showWeatherReport and simply prints it...



// Date manage
function dateManage(dateArg)
{
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


	let year = dateArg.getFullYear();

	let month = months[dateArg.getMonth()];

	let date = dateArg.getDate();

	let day = days[dateArg.getDay()];


	return `${date} ${month} (${day}), ${year}`;
}