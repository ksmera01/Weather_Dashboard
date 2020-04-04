$(document).ready(function () {

    // var city = $("#cityInput").val();
    var APIKey = "166a433c57516f51dfab1f7edaed8413"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        "Philadelphia" + "&appid=" + APIKey;

    $(".btn").on("click", function (event) {
        event.preventDefault()
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                console.log(queryURL);

                console.log(response);

                // console.log(city);

                var tempF = (response.main.temp - 273.15) * 1.80 + 32;

                // Transfer content to HTML
                $("#citySearched").text(response.name + " Weather Details");
                $("#temperature").text("Temperature (F) " + tempF.toFixed(2));
                $("#windSpeed").text("Wind Speed: " + response.wind.speed);
                $("#humidity").text("Humidity: " + response.main.humidity);
            })

        // Current Weather API
        // $.get({
        //         url: "https://api.openweathermap.org/data/2.5/weather?q=Philadelphia,Pennsylvania&appid=166a433c57516f51dfab1f7edaed8413",
        //         method: "GET"
        //     }).then(function (response) {
        //         var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        //         console.log(response);
        //         console.log(tempF.toFixed(2)); //Temperature
        //         console.log(response.main.humidity); //Humidity
        //         console.log(response.wind.speed); //Wind Speed
        // UV Index
    });

    // UV Index API
    // $.get({
    //     url: "http://api.openweathermap.org/data/2.5/uvi?appid=1e8304ab4f6285fc646b9e6b504aad91&lat=39.9523&lon=-75.1638",
    //     // http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    // });

    // $.get({
    //     url: "https://api.openweathermap.org/data/2.5/forecast?q=Philadelphia,Pennsylvania&appid=1e8304ab4f6285fc646b9e6b504aad91",
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    //     console.log(response.results);

    // });
});