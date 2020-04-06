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

                var clearSky = ("https://openweathermap.org/img/wn/01d.png");
                var fewClouds = ("https://openweathermap.org/img/wn/02d.png");
                var scatteredClouds = ("https://openweathermap.org/img/wn/03d.png");
                var overcastClouds = ("https://openweathermap.org/img/wn/04d.png")
                var brokenClouds = ("https://openweathermap.org/img/wn/04d.png");
                var showerRain = ("https://openweathermap.org/img/wn/09d.png");
                var rain = ("https://openweathermap.org/img/wn/10d.png");
                var thunderstorm = ("https://openweathermap.org/img/wn/11d.png");
                var snow = ("https://openweathermap.org/img/wn/13d.png");
                var mist = ("https://openweathermap.org/img/wn/50d.png");

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

                var uvLatitude = response.coord.lat;
                var uvLongitude = response.coord.lon;
                var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + uvLatitude + "&lon=" + uvLongitude;

                $.ajax({
                    url: uvQueryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response.value);
                    var uvIndex = response.value;
                    $("#uvIndex").text("UV Index: " + uvIndex);

                    if (uvIndex <= 2) {
                        $("#uvIndex").addClass("goodUV");
                    }
                    else if (uvIndex > 2 && uvIndex <= 5) {
                        $("#uvIndex").addClass("mediumUV");
                    }
                    else if (uvIndex > 5) {
                        $("#uvIndex").addClass("badUV");
                    }

                });

                function saveLocalStorage() {
                    var savedSearchItemsArray = [];
                    savedSearchItemsArray.push(city);
                    localStorage.setItem("cityInput", JSON.stringify(savedSearchItemsArray));
                }

                saveLocalStorage();

                var getSearchTerm = JSON.parse(localstorage.getItem("cityInput"));
                var buttonDiv = $("<div>");
                var createButton = $("<button>").text(getSearchTerm);
                $("#searchTerms").append(buttondiv);
                buttonDiv.prepend(createButton);


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

                    var forecastClearSky = ("https://openweathermap.org/img/wn/01d.png");
                    var forecastFewClouds = ("https://openweathermap.org/img/wn/02d.png");
                    var forecastScatteredClouds = ("https://openweathermap.org/img/wn/03d.png");
                    var forecastOvercastClouds = ("https://openweathermap.org/img/wn/04d.png")
                    var forecastBrokenClouds = ("https://openweathermap.org/img/wn/04d.png");
                    var forecastShowerRain = ("https://openweathermap.org/img/wn/09d.png");
                    var forecastRain = ("https://openweathermap.org/img/wn/10d.png");
                    var forecastThunderstorm = ("https://openweathermap.org/img/wn/11d.png");
                    var forecastSnow = ("https://openweathermap.org/img/wn/13d.png");
                    var forecastMist = ("https://openweathermap.org/img/wn/50d.png");

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
                    forecastDiv.addClass("p-4 border border-dark");
                    forecastDiv.append(createForecastDate);
                    forecastDiv.append(createForecastIcon);
                    forecastDiv.append(createForecastTemp);
                    forecastDiv.append(createForecastHumidity);
                    $("#fiveDayForecast").append(forecastDiv);


                }

            });

    });


});