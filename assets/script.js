//Create form that grabs value of city search
//Retrieve data from API and append object elements to Container
//

const api = {
    key: "9b10ba0f1eb331935dd772c9d1676bf9",
    base: "https://api.openweathermap.org/data/2.5/",
    five: "https://api.openweathermap.org/data/2.5/"
}



// var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=Boston&units=imperial&appid=9b10ba0f1eb331935dd772c9d1676bf9"

var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Sacramento&units=imperial&appid=9b10ba0f1eb331935dd772c9d1676bf9"


//var apiKey = "9b10ba0f1eb331935dd772c9d1676bf9"

var search = document.querySelector('.search')
var btn = document.querySelector('.btn')
var cityInput = document.getElementById('inputValue')

btn.addEventListener('click', getInput)
//DOM Acess for Today
var currentCityEl = document.getElementById("current-city")
var currentTempE1 = document.getElementById('current-temp')
var currentHumE1 = document.getElementById('current-hum')
var currentWindE1 = document.getElementById('current-wind')
var currentUvE1 = document.getElementById('current-uv')
var weatherImage = document.createElement("img")
const historyEl = document.getElementById("history");
var clearBtn = document.getElementById('clear')
//Dom Acess for 5 Day
//var dateEl = document.getElementById('card-title-one')
var futureCast = document.getElementById('fiveforecast')
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];



function getInput() {
    getApi(search.value)
    getApiFive(search.value)
    

}



function getApi() {

    fetch(`${api.base}weather?q=${search.value}&units=imperial&appid=${api.key}`)
        .then(function (response) {
            return response.json();

        })
        .then(function (data1) {
            updateWeather(data1)
        })
}
//getApi();

//Setting Inner HTML equal to Object Properties
function updateWeather(data1) {
console.log(data1)

    var img = document.createElement("img")
    img.src = "http://openweathermap.org/img/wn/" + data1.weather[0].icon + ".png"

    document.getElementById('weather-img').appendChild(img);
    //currentCityEl.innerHTML = data1.name + " -" + " " + dateString
    currentTempE1.innerHTML = data1.main.temp + " °"
   
    currentHumE1.innerHTML = "Humidity: " + data1.main.humidity + "%"
    currentWindE1.innerHTML = data1.wind.speed + " mph"
    // UNIX_timestamp = data1.dt
    // function timeConverter(UNIX_timestamp) {
    //     var a = new Date(UNIX_timestamp * 1000);
    //     var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //     var month = months[a.getMonth()];
    //     var date = a.getDate();

    //     var time = month + ' ' + date
    //     return time;

    var dateString = moment.unix(data1.dt).format("MM/DD/YYYY");
    console.log(dateString)
    currentCityEl.innerHTML = data1.name + " -" + " " + dateString
    
    

    function getUV() {
        let lat = data1.coord.lat;
        let lon = data1.coord.lon;
        console.log("LLLLLLL")
        console.log(lat)
        console.log(lon)
        console.log("LLLLLLL")
        let uvURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + api.key + "&cnt=1";
        console.log(uvURL)

         fetch(uvURL)
            .then(function (response) {
                 return response.json();

             })
             .then(function (data3) {
                 updateUV(data3)
             })
    }
getUV();
     function updateUV(data3) {
         var UVIndex = document.createElement("p");

    
         if (data3[0].value < 5) {
             UVIndex.setAttribute("class", "badge badge-success");
         }
         else if (data3[0].value < 7) {
             UVIndex.setAttribute("class", "badge badge-warning");
         }
         else {
             UVIndex.setAttribute("class", "badge badge-danger");
         }
         console.log(data3[0].value)
         UVIndex.innerHTML = data3[0].value;
         currentUvE1.innerHTML = "UV Index: ";
         currentUvE1.append(UVIndex);
     }

}


function getApiFive() {

    fetch(`${api.five}forecast?q=${search.value}&units=imperial&appid=${api.key}`)
        .then(function (response) {
            return response.json();

        })
        .then(function (data2) {
            updateFiveDay(data2)
        })
}
//getApiFive();

function updateFiveDay(data2) {
    console.log(data2)
    //function for converting UNIX Timestamp into readable date
    UNIX_timestamp = data2.list[0].dt
    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = month + ' ' + date
        return time;
    }
    
    //dateEl.innerHTML = timeConverter(0)



    for (var i = 0; i < 33; i += 8) {
        //remove old stuff
        // if (document.contains(document.getElementById('handle'))){
        //     //cardContainer.parentNode.removeChild(cardContainer)
        //     fiveForcast.innerHTML = ''
        //     cardContainer.innerHTML = ''
        //     cardBody.innerHTML = ''
        //     cardHeader.innerHTML = ''
        // }

        console.log(data2)
        var dateString = moment.unix(data2.list[i].dt).format("MM/DD/YYYY");
        var temp = data2.list[i].main.temp
        var city = data2.city.name
        var humidity = data2.list[i].main.humidity
        var img = document.createElement("img")
        img.src = "http://openweathermap.org/img/wn/" + data2.list[i].weather[0].icon + ".png"

        fiveForcast = document.getElementById('fiveforecast')
        cardContainer = document.createElement('div')
        cardBody = document.createElement('div')
        cardHeader = document.createElement('h5')
        cardTemp = document.createElement('h6')
        cardHumidity = document.createElement('p')
        cardImage = document.createElement('div')
        cardDate = document.createElement('p')

        cardContainer.setAttribute('id', 'handle')

        cardContainer.classList.add('card')
        cardContainer.classList.add('col-2')
        cardContainer.classList.add('forecast')

        futureCast.append(cardContainer)
        cardContainer.append(cardBody)
        cardBody.append(cardHeader)
        cardBody.append(cardTemp)
        cardBody.append(cardHumidity)
        cardBody.append(cardImage)
        cardBody.append(cardDate)
        cardImage.append(img);

        cardHeader.innerHTML = city
        cardTemp.innerHTML = temp + " °"
        cardHumidity.innerHTML = "Humidity: " + humidity + ' %'
        cardDate.innerHTML = dateString
        console.log(dateString)

    }


}

// Save items to local storage and recall

btn.addEventListener("click", function () {
    const searchTerm = search.value;
    getApi(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
})

clearBtn.addEventListener("click", function () {
    localStorage.clear();
    searchHistory = [];
    renderSearchHistory();
})

function renderSearchHistory() {
    historyEl.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        const historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function () {
            getApi(historyItem.value);
        })
        historyEl.append(historyItem);
    }
}

