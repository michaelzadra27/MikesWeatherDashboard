//Create form that grabs value of city search
//Retrieve data from API and append object elements to Container
//


var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=9b10ba0f1eb331935dd772c9d1676bf9"

var fiveDayUrl= "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=9b10ba0f1eb331935dd772c9d1676bf9"


var apiKey = "9b10ba0f1eb331935dd772c9d1676bf9"

var cityKey = "innerhtmlvalue"

//DOM Acess for Today
var currentCityEl = document.getElementById("current-city")
var currentTempE1 = document.getElementById('current-temp')
var currentHumE1 = document.getElementById('current-hum')
var currentWindE1 = document.getElementById('current-wind')
var currentUvE1 = document.getElementById('current-uv')
var weatherImage = document.createElement("img")
//Dom Acess for 5 Day
var dateEl = document.getElementById('card-title-one')






function getApi() {

    fetch(requestUrl)
        .then(function (response) {
            return response.json();

        })
        .then(function (data1) {
            updateWeather(data1)
        })
}
getApi();

//Setting Inner HTML equal to Object Properties
function updateWeather(data1) {
    console.log(data1)

    var img = document.createElement("img")
    img.src = "http://openweathermap.org/img/wn/" + data1.weather[0].icon + ".png"
    document.getElementById('weather-img').appendChild(img);
    currentCityEl.innerHTML = data1.name + " -" + " " + timeConverter(0)
    currentTempE1.innerHTML = data1.main.temp
    //console.log(currentTempE1)
    currentHumE1.innerHTML = data1.main.humidity + "%"
    currentWindE1.innerHTML = data1.wind.speed + " mph"
    UNIX_timestamp = data1.dt
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        
        var time = month + ' ' + date
        return time;
      }
      console.log(timeConverter(0));
}


function getApiFive() {

    fetch(fiveDayUrl)
        .then(function (response) {
            return response.json();

        })
        .then(function (data2) {
            updateFiveDay(data2)
        })
}
getApiFive();

function updateFiveDay(data2) {
    console.log(data2)
    //function for converting UNIX Timestamp into readable date
    UNIX_timestamp = data2.list[0].dt
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = month + ' ' + date
        return time;
      }
      console.log(timeConverter(0));

      dateEl.innerHTML = timeConverter(0)
}