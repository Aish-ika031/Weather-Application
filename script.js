const apiKey = '26846c7091ec39bf557f392854e426ab';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// The getElementById() method of the Document interface returns an Element object representing the element whose id property matches the specified string. Since element IDs are required to be unique if specified, they're a useful way to get access to a specific element quickly.

//This line assigns a reference to the HTML element with the id attribute of 'locationInput' to the locationInput variable.
const locationInput = document.getElementById('locationInput');

//This line assigns a reference to the HTML element with the id attribute of 'searchButton' to the searchButton variable.
const searchButton = document.getElementById('searchButton');

//This line assigns a reference to the HTML element with the id attribute of 'locationElement' to the location variable.
const locationElement = document.getElementById('location');

//This line assigns a reference to the HTML element with the id attribute of 'temperatureElement' to the temperature variable.
const temperatureElement = document.getElementById('temperature');

//This line assigns a reference to the HTML element with the id attribute of 'descriptionElement' to the description variable.
const descriptionElement = document.getElementById('description');

//These all varibales are created in HTML and to access them in JS we use document.getelementById() in simple Terms//

// Implementation of Search Button

//The addEventListener() method attaches an event handler to the specified element.

//The addEventListener() method attaches an event handler to an element without overwriting existing event handlers.

//So here on searchButton variable which we have accessed above in the code over this variable we are applying a eventListner to search for locatrion which user specifes.

searchButton.addEventListener('click', () => {

    // In the below line we are creating a location varibale and storing the value which user enetered from the locationInput element above in the steps..
    const location = locationInput.value;

    //In below line we are checking if the location has a value and is not empty then simply the fetchWeather fucntion is called and the location whihc we got is passed as a argument.
    if (location) {
        fetchWeather(location);
    }
});

// in the below fucntion we are creating a fucntion named fetchWeather and passed the location as a paramnetr..

function fetchWeather(location) {

    //In the below line we are creating a constant variable url that will store the complete URL for making an API request.
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    //${apiUrl}?q : it represents the base UrLof the API which we have already attached in the start of code.

    //?q=${location} : this line means as we have to search for the current location which user has passed its weather so we are attaching this location string query in the URl.

    //&appid=${apiKey} adds another query string parameter appid (likely representing the API key used to authenticate the request) because every API has a key whch we genertae when we signup on the website to use the API.It is imp step in every API usage.

    //&units=metric : This line means as we have to search for temp so metric here menas in Celsius.

    fetch(url)

    // The fetch() function initiates an HTTP request to the provided url (in this case, the weather API URL created earlier in prebvous step).
        .then(response => response.json())

        // this line takes the response whcih we are getting form API above and parse it using .json() method into JSON format to be used later easily.
        .then(data => {

            //in this step we are using the JSON data which we got in preivous step to update all the varibales which we created for our App.
            
            locationElement.textContent = data.name;
            //In this line the location element will have the value of location which user provided.
            
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            // In this line the temperature element will have the value of temperature which we are getting as a response from API and to be more accuarte we are rounding of this temp to nearest degree celsius.
            
            descriptionElement.textContent = data.weather[0].description;
            // In this line the description element will have the value as the current location weather decription like Sunny , Cloudy humidity etc.
        })
        .catch(error => {

            //This block is used to handle the error if our API is not able to fetch weather detials for any location which user provided then simply this error message will display.
            console.error('Error fetching weather data:', error);
        });
}