import axios from "axios";
import "./styles.css";
function getdata(response) {
  let data = response.data;
  let temperature = data.temperature.current;
  let humidity = data.temperature.humidity;
  let wind = data.wind.speed;
  let condition = data.condition.description;
  let icon_url = data.condition.icon_url;

  let temp = document.querySelector(".temp");
  temp.innerHTML = temperature;

  let humid_wind = document.querySelector(".info-Humid-wind");
  humid_wind.innerHTML = `Humidity: <small class="colored-red">${humidity}%</small>, Wind: <small class="colored-red">${wind}km/h</small>`;

  let icon = document.querySelector(".icon-today");
  icon.setAttribute("src", icon_url);

  let location = document.querySelector(".info-name");
  location.innerHTML = data.city;
  // -------------------------------------
  let now = new Date();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let time_condition = document.querySelector(".info-time-condition");
  // example: Sunday 09:55, few clouds
  time_condition.innerHTML = `${
    weekdays[now.getDay()]
  } ${now.getHours()}:${now.getMinutes()}, ${condition}`;

  // console.log();
}

function getForcast(response) {
  let data = response.data;
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let now = new Date();
  let today_index = now.getDay();
  let daily = data.daily.slice(0, 5);
  let container = document.querySelector(".data-forcast");
  // remove previous forcast
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  for (let i = 0; i < daily.length; i++) {
    //  const element = array[index];
    // 1
    const day = document.createElement("p");
    day.setAttribute("class", "day-name");
    if (today_index + 1 + i === weekdays.length) {
      today_index = 0;
    }
    const node = document.createTextNode(weekdays[today_index + i + 1]);
    day.appendChild(node);
    // 2
    const icon = document.createElement("img");
    icon.setAttribute("class", "forcast-icon");
    icon.setAttribute("src", daily[i]["condition"]["icon_url"]);
    // console.log(daily[i]["icon_url"]);
    // 3
    const temp = document.createElement("p");
    temp.setAttribute("class", "forcast-temp");
    const min = document.createElement("small");
    min.setAttribute("class", "min");
    const max = document.createElement("small");
    max.setAttribute("class", "max");
    const min_value = document.createTextNode(
      `${daily[i].temperature.minimum}° `
    );
    min.appendChild(min_value);

    temp.appendChild(min);
    max.appendChild(
      document.createTextNode(`${daily[i].temperature.maximum}°`)
    );

    temp.appendChild(max);
    // -----------------
    // append three elements to a div and add the div to the container
    const week_day = document.createElement("div");
    week_day.setAttribute("class", "week-day");
    week_day.appendChild(day);
    week_day.appendChild(icon);
    week_day.appendChild(temp);

    container.appendChild(week_day);
  }
}
function search(event) {
  event.preventDefault();
  // -------- reset the buttons -----------
  let cel_elm = document.querySelector(".c");
  let f_elm = document.querySelector(".f");
  f_elm.addEventListener("click", convert_far);
  cel_elm.removeEventListener("click", convert_celsius);
  // ---- color ---------
  f_elm.style.color = "blue";
  cel_elm.style.color = "black";
  // ----- cursor -----
  f_elm.addEventListener("mouseenter", (event) => {
    f_elm.style.cursor = "pointer";
  });
  cel_elm.addEventListener("mouseenter", (event) => {
    cel_elm.style.cursor = "default";
  });
  let cityname = document.querySelector(".search-bar");
  let apikey = "2t180dd415c79905b39740o428430fae";
  let url = `https://api.shecodes.io/weather/v1/current?query=${cityname.value}&key=${apikey}`;
  axios.get(url).then(getdata);

  // =============== Forcast =====================
  let url_forcast = `https://api.shecodes.io/weather/v1/forecast?query=${cityname.value}&key=${apikey}`;
  axios.get(url_forcast).then(getForcast);
}
let form1 = document.querySelector(".form1");
form1.addEventListener("submit", search);
// ---------------------------------------
// let convert_c = document.querySelector(".c");
// convert_c.addEventListener("click", convert_celsius);
function convert_celsius(event) {
  let cel_elm = document.querySelector(".c");
  let f_elm = document.querySelector(".f");
  let temp = document.querySelector(".temp");
  let mins = document.querySelectorAll(".min");
  let maxs = document.querySelectorAll(".max");

  // -------- convert values ---------
  let far = parseFloat(temp.innerHTML);
  temp.innerHTML = `${(((far - 32) * 5) / 9).toFixed(2)}`;
  for (let i = 0; i < mins.length; i++) {
    let far = parseFloat(mins[i].innerHTML);
    mins[i].innerHTML = `${(((far - 32) * 5) / 9).toFixed(2)}° `;
  }
  for (let i = 0; i < maxs.length; i++) {
    let far = parseFloat(maxs[i].innerHTML);
    maxs[i].innerHTML = `${(((far - 32) * 5) / 9).toFixed(2)}°`;
  }
  // ---------------------------------
  cel_elm.removeEventListener("click", convert_celsius);
  f_elm.addEventListener("click", convert_far);

  // ------ cursor: pointer -------
  cel_elm.addEventListener("mouseenter", (event) => {
    cel_elm.style.cursor = "default";
  });
  f_elm.addEventListener("mouseenter", (event) => {
    f_elm.style.cursor = "pointer";
  });

  // -------- blue/black color -------
  f_elm.style.color = "blue";
  cel_elm.style.color = "black";
}
// ---------------------------------------
let convert_f = document.querySelector(".f");
convert_f.addEventListener("click", convert_far);
convert_f.style.color = "blue";
convert_f.addEventListener("mouseenter", (event) => {
  convert_f.style.cursor = "pointer";
});
function convert_far(event) {
  let cel_elm = document.querySelector(".c");
  let f_elm = document.querySelector(".f");
  let temp = document.querySelector(".temp");
  let mins = document.querySelectorAll(".min");
  let maxs = document.querySelectorAll(".max");
  // -------- convert values -----------
  let c = parseFloat(temp.innerHTML);
  temp.innerHTML = `${((c * 9) / 5 + 32).toFixed(2)}`;

  for (let i = 0; i < mins.length; i++) {
    let c = parseFloat(mins[i].innerHTML);
    mins[i].innerHTML = `${((c * 9) / 5 + 32).toFixed(2)}° `;
  }
  for (let i = 0; i < maxs.length; i++) {
    let c = parseFloat(maxs[i].innerHTML);
    maxs[i].innerHTML = `${((c * 9) / 5 + 32).toFixed(2)}°`;
  }
  // -----------------------------------
  f_elm.removeEventListener("click", convert_far);
  cel_elm.addEventListener("click", convert_celsius);

  // ------ cursor: pointer -------
  f_elm.addEventListener("mouseenter", (event) => {
    f_elm.style.cursor = "default";
  });
  cel_elm.addEventListener("mouseenter", (event) => {
    cel_elm.style.cursor = "pointer";
  });

  // -------- blue/black color -------
  f_elm.style.color = "black";
  cel_elm.style.color = "blue";
}
// ---------------------------
// show data from San Francisco at the startup.
// --------- today ----------
let apikey = "2t180dd415c79905b39740o428430fae";
let url = `https://api.shecodes.io/weather/v1/current?query=san fransisco&key=${apikey}`;
axios.get(url).then(getdata);
// --------- forcast --------
let url_forcast = `https://api.shecodes.io/weather/v1/forecast?query=san fransisco&key=${apikey}`;
axios.get(url_forcast).then(getForcast);
