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

                var weatherIconCurrent = response.weather[0].description;

                console.log(weatherIconCurrent);

                var clearSky = ("http://openweathermap.org/img/wn/01d.png");
                var fewClouds = ("http://openweathermap.org/img/wn/02d.png");
                var scatteredClouds = ("http://openweathermap.org/img/wn/03d.png");
                var overcastClouds = ("http://openweathermap.org/img/wn/04d.png")
                var brokenClouds = ("http://openweathermap.org/img/wn/04d.png");
                var showerRain = ("http://openweathermap.org/img/wn/09d.png");
                var rain = ("http://openweathermap.org/img/wn/10d.png");
                var thunderstorm = ("http://openweathermap.org/img/wn/11d.png");
                var snow = ("http://openweathermap.org/img/wn/13d.png");
                var mist = ("http://openweathermap.org/img/wn/50d.png");

                if (weatherIconCurrent === "scattered clouds") {
                    var createIcon = $("<img>").attr("src", scatteredClouds);
                }
                else if (weatherIconCurrent === "clear sky") {
                    var createIcon = $("<img>").attr("src", clearSky);
                }
                else if (weatherIconCurrent === "overcast clouds") {
                    var createIcon = $("<img>").attr("src", overcastClouds);
                }
                else if (weatherIconCurrent === "broken clouds") {
                    var createIcon = $("<img>").attr("src", brokenClouds);
                }
                else if (weatherIconCurrent === "few clouds") {
                    var createIcon = $("<img>").attr("src", fewClouds);
                }
                else if (weatherIconCurrent === "shower rain" || "light intensity drizzle" || "drizzle" || "heavy intensity drizzle" || "light intensity drizzle rain" || "drizzle rain" || "heavy intensity drizzle rain" || "shower rain and drizzle" || "heavy shower rain and drizzle" || "shower drizzle" || "	light intensity shower rain" || "heavy intensity shower rain" || "ragged shower rain") {
                    var createIcon = $("<img>").attr("src", showerRain);
                }
                else if (weatherIconCurrent === "rain" || "light rain" || "moderate rain" || "heavy intensity rain" || "very heavy rain" || "extreme rain") {
                    var createIcon = $("<img>").attr("src", rain);
                }
                else if (weatherIconCurrent === "thunderstorm" || "thunderstorm with light rain" || "thunderstorm with rain" || "thunderstorm with heavy rain" || "light thunderstorm" || "heavy thunderstorm" || "ragged thunderstorm" || "thunderstorm with light drizzle" || "thunderstorm with drizzle" || "thunderstorm with heavy drizzle") {
                    var createIcon = $("<img>").attr("src", thunderstorm);
                }
                else if (weatherIconCurrent === "snow" || "freezing rain" || "light snow" || "Heavy snow" || "Sleet" || "Light shower sleet" || "Shower sleet" || "Light rain and snow" || "Rain and snow" || "Light shower snow" || "Shower snow" || "Heavy shower snow") {
                    var createIcon = $("<img>").attr("src", snow);
                }
                else if (weatherIconCurrent === "mist" || "Smoke" || "Haze" || "sand/ dust whirls" || "fog" || "sand" || "dust" || "volcanic ash" || "squalls" || "tornado") {
                    var createIcon = $("<img>").attr("src", mist);
                }

                // Transfer content to HTML
                $("#citySearched").text(response.name + " " + "(" + currentDate + ")");
                $("#temperature").text("Temperature (F) " + tempF.toFixed(2));
                $("#humidity").text("Humidity: " + response.main.humidity + "%");
                $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
                $("#currWeatherBorder").addClass("p-4 border border-dark");
                $("#citySearched").append(createIcon);

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

                //For loop for forecast results:
                for (var i = 0; i < forecastResults.length; i += 8) {

                    var forecastDate = forecastResults[i].dt_txt;
                    var forecastTemperature = forecastResults[i].main.temp;
                    var forecastTempF = (forecastTemperature - 273.15) * 1.80 + 32;
                    var forecastHumidity = forecastResults[i].main.humidity;
                    var getDate = forecastDate.substr(0, 10);

                    // Creating html elements to append to each other:
                    var forecastDiv = $("<div>");
                    var createForecastDate = $("<h4>").text(getDate);
                    var createForecastTemp = $("<p>").text("Temp F " + forecastTempF.toFixed(2));
                    var createForecastHumidity = $("<p>").text("Humidity: " + forecastHumidity + "%");

                    var weatherIconForecast = forecastResults[i].weather[0].description;

                    console.log(weatherIconForecast);

                    var forecastClearSky = ("http://openweathermap.org/img/wn/01d.png");
                    var forecastFewClouds = ("http://openweathermap.org/img/wn/02d.png");
                    var forecastScatteredClouds = ("http://openweathermap.org/img/wn/03d.png");
                    var forecastOvercastClouds = ("http://openweathermap.org/img/wn/04d.png")
                    var forecastBrokenClouds = ("http://openweathermap.org/img/wn/04d.png");
                    var forecastShowerRain = ("http://openweathermap.org/img/wn/09d.png");
                    var forecastRain = ("http://openweathermap.org/img/wn/10d.png");
                    var forecastThunderstorm = ("http://openweathermap.org/img/wn/11d.png");
                    var forecastSnow = ("http://openweathermap.org/img/wn/13d.png");
                    var forecastMist = ("http://openweathermap.org/img/wn/50d.png");

                    if (weatherIconForecast === "scattered clouds") {
                        var createForecastIcon = $("<img>").attr("src", forecastScatteredClouds);
                    }
                    else if (weatherIconForecast === "clear sky") {
                        var createForecastIcon = $("<img>").attr("src", forecastClearSky);
                    }
                    else if (weatherIconForecast === "overcast clouds") {
                        var createForecastIcon = $("<img>").attr("src", forecastOvercastClouds);
                    }
                    else if (weatherIconForecast === "broken clouds") {
                        var createForecastIcon = $("<img>").attr("src", forecastBrokenClouds);
                    }
                    else if (weatherIconForecast === "few clouds") {
                        var createForecastIcon = $("<img>").attr("src", forecastFewClouds);
                    }
                    else if (weatherIconForecast === "shower rain" || "light intensity drizzle" || "drizzle" || "heavy intensity drizzle" || "light intensity drizzle rain" || "drizzle rain" || "heavy intensity drizzle rain" || "shower rain and drizzle" || "heavy shower rain and drizzle" || "shower drizzle" || "	light intensity shower rain" || "heavy intensity shower rain" || "ragged shower rain") {
                        var createForecastIcon = $("<img>").attr("src", forecastShowerRain);
                    }
                    else if (weatherIconForecast === "rain" || "light rain" || "moderate rain" || "heavy intensity rain" || "very heavy rain" || "extreme rain") {
                        var createForecastIcon = $("<img>").attr("src", forecastRain);
                    }
                    else if (weatherIconForecast === "thunderstorm" || "thunderstorm with light rain" || "thunderstorm with rain" || "thunderstorm with heavy rain" || "light thunderstorm" || "heavy thunderstorm" || "ragged thunderstorm" || "thunderstorm with light drizzle" || "thunderstorm with drizzle" || "thunderstorm with heavy drizzle") {
                        var createForecastIcon = $("<img>").attr("src", forecastThunderstorm);
                    }
                    else if (weatherIconForecast === "snow" || "freezing rain" || "light snow" || "Heavy snow" || "Sleet" || "Light shower sleet" || "Shower sleet" || "Light rain and snow" || "Rain and snow" || "Light shower snow" || "Shower snow" || "Heavy shower snow") {
                        var createForecastIcon = $("<img>").attr("src", forecastSnow);
                    }
                    else if (weatherIconForecast === "mist" || "Smoke" || "Haze" || "sand/ dust whirls" || "fog" || "sand" || "dust" || "volcanic ash" || "squalls" || "tornado") {
                        var createForecastIcon = $("<img>").attr("src", forecastMist);
                    }

                    $("#5DayHeader").text("5-Day Forecast")
                    forecastDiv.addClass("p-1 border border-dark");
                    forecastDiv.append(createForecastDate);
                    forecastDiv.append(createForecastIcon);
                    forecastDiv.append(createForecastTemp);
                    forecastDiv.append(createForecastHumidity);
                    $("#fiveDayForecast").append(forecastDiv);


                }

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