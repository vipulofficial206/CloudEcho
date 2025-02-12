const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
let whplace = document.getElementById("wh-place");
let whtargetbox = document.getElementById("wh-target-box");
let whicon = document.querySelector(".wh-icon");

function decodeAPIKey(encodedKey) {
  return atob(encodedKey);
}

apiid = decodeAPIKey(numberi1);

async function generatewheater1() {
  if (!whplace.value.trim()) {
    alert("Please enter a city name!");
    return;
  }

  try {
    const response = await fetch(apiurl + encodeURIComponent(whplace.value) + "&appid=" + apiid);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.cod == 200) {
      document.querySelector(".whcity").innerHTML = data.name;
      document.querySelector(".whtemp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".wh-weathertype").innerHTML = data.weather[0].main;
      document.querySelector(".wh-humidty").innerHTML = data.main.humidity + "%";
      document.querySelector(".wh-windspeed").innerHTML = data.wind.speed + "km/h";
      
      whicon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      whtargetbox.classList.add("show-img");

      setTimeout(() => {
        whplace.value = "";
      }, 2000);
    } else {
      alert(`Error: ${data.message || "Invalid city name!"}`);
    }
  } catch (error) {
    alert(`"Invalid city name!". ${error.message}`);
  }
}
