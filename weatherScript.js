let input = document.getElementById("searchBar");
setInterval(() => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  var time = document.getElementById("tm");
  time.innerHTML = `${hours}:${minutes}:${seconds}`;
}, 1000);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
	e.preventDefault();
    var cityName = document.getElementById("searchBar").value;
    getData(cityName);
  }
});

async function getData(city_name) {
  // featching latitude and longitute
  const placeName = `${city_name}`;
  fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      placeName
    )}&format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const { lat, lon } = data[0]; // Extract latitude and longitude from the first result
        console.log(lat);
        const apiKey = "4d71c8e644e06864558f04e86e403e7d";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        return fetch(url);
      } else {
        console.log("Location not found.");
      }
    })
    .then((fullUrl) => fullUrl.json())
    .then((data) => {
      var temper = document.getElementById("val");
      const late = document.getElementById("la");
      const long = document.getElementById("lo");
      const sunrise = document.getElementById("rise");
      const sunset = document.getElementById("set");
      const feel_like = document.getElementById("feels");
      // const hu = document.getElementById("set");
      var windSpeed = document.getElementById("wind");
      var hum = document.getElementById("hum");
      var city = document.getElementById("cty");
      var res = document.getElementById("result");

      temper.innerHTML = data.main.temp;
      windSpeed.innerHTML = data.wind.speed;
      hum.innerHTML = data.main.humidity;
      city.innerHTML = data.name;
      late.innerHTML = data.coord.lat;
      long.innerHTML = data.coord.lon;
      sunrise.innerHTML = data.sys.sunrise;
      sunset.innerHTML = data.sys.sunset;
      feel_like.innerHTML = data.main.feels_like;
      res.innerHTML = data.weather[0].description;
    })
    .catch((error) => {
      console.error("Error fetching location data:", error);
    });

  // var fullUrl = await fetch(url +`&appid=${apiKey}`);
  // var data = await fullUrl.json();

  //  console.log(data.weather.description)
}