$(document).ready(function () {

    $(".btn").on("click", function (event) {
        event.preventDefault()

        var city = $("#cityInput").val();
        var APIKey = "166a433c57516f51dfab1f7edaed8413"
        var currentWeatherqueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
            city + "&appid=" + APIKey;
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

        $.ajax({
            url: currentWeatherqueryURL,
            method: "GET"
        })
            .then(function (response) {

                console.log(city);

                console.log(currentWeatherqueryURL);

                console.log(response);

                var currentDate = moment().format('L');

                var tempF = (response.main.temp - 273.15) * 1.80 + 32;

                // Transfer content to HTML
                $("#citySearched").text(response.name + " " + "(" + currentDate + ")");
                $("#temperature").text("Temperature (F) " + tempF.toFixed(2));
                $("#humidity").text("Humidity: " + response.main.humidity + "%");
                $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
                $("#currWeatherBorder").addClass("p-4 border border-dark");

                // var myInput = document.getElementById("cityInput").value;
                // localStorage.setItem("cityInput", myInput);

                // var myInput = document.getElementById("cityInput").value;
                // var savedSearchItemsArray = [];
                // savedSearchItemsArray.push(myInput);
                // localStorage.setItem("cityInput", JSON.stringify(savedSearchItemsArray));


            })

        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        })

            .then(function (response) {

                console.log(forecastQueryURL);

                console.log(response.list);

                var forecastResults = response.list;

                console.log(forecastResults);

            });

    });

    // UV Index API
    // $.get({
    //     url: "http://api.openweathermap.org/data/2.5/uvi?appid=1e8304ab4f6285fc646b9e6b504aad91&lat=39.9523&lon=-75.1638",
    //     // http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    // });

});