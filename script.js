

const apiKey = "46f68fed3cd06119ed0eac0795ce97e8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const selectBtn = document.querySelector(".select-btn");
const cityList = document.getElementById('cityList');
const searchInput = document.getElementById('searchInput');

// const dropDownList = document.querySelector(".contemt");
let cities = [];



fetch('current.city.list.json')
.then(response => response.json())
.then(data => {
    // Store all city names in the array
    const citySet = new Set(data.map(city => city.name));
    cities = [...citySet]; // Convert Set back to array

//   console.log(cities);
})
.catch(error => {
    console.error('Error loading cities:', error);
    reject(error); // Reject the promise if there's an error
});




document.addEventListener('DOMContentLoaded', function() {





    // Event listener for input changes (keyup event)
    searchInput.addEventListener('keyup', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCities = cities.filter(city => city.toLowerCase().includes(searchTerm));

        // Clear previous list items
        cityList.innerHTML = '';

        // Create and append new list items for filtered cities
        filteredCities.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city;
            li.setAttribute('onclick', 'selectItem(this)');
            cityList.appendChild(li);
        });
        });
});


function loadCities(cities){

      cities.forEach(city => {
        const cityName = city;
        // console.log(cityName);
        const li = document.createElement('li');
        li.textContent = cityName;
        li.setAttribute('onclick', 'selectItem(this)');
        cityList.appendChild(li);
      });

}


async function checkWeather(city){
    // make a fetch and wait for the response
    const response = await fetch(apiUrl + `&q=` + city + `&appid=${apiKey}` );
    // wait for the response to get parsed as json
    var data = await response.json();


    // updating data

    document.querySelector(".city").innerHTML = city;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; 
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";  

    // update weather condns....
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png"
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png"
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png"
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png"
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png"
    }


    // 

    document.querySelector(".weather").style.display = "block";

    console.log(data);
}

const content = document.querySelector(".content");
function selectItem(item) {
    // Update selected item display
    // select-btn
    // document.getElementsByClassName("select-btn").textContent = item.textContent;
    document.getElementById('selectedText').textContent = item.textContent;
    // Hide dropdown
    content.style.display = "none";
    checkWeather(item.textContent);
  }

// searchBtn.addEventListener("click",()=>{
//     checkWeather(searchBox.value);
// })

selectBtn.addEventListener("click", () => {
    if (content.style.display === "none" || content.style.display === "") {
      content.style.display = "block";
      document.getElementById('searchInput').value = '';
      loadCities(cities);


    } else {
      content.style.display = "none";
    }
  });

// checkWeather("Jodhpur");