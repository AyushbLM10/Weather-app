let currCity = "Delhi"

let city = document.querySelector(".weather__city")
let datetime = document.querySelector(".weather__datetime")
let weather__forecast = document.querySelector(".weather__forecast")
let weather__temperature = document.querySelector(".weather__temperature")
let weather__icon = document.querySelector(".weather__icon")
let weather__minmax = document.querySelector(".weather__minmax")
let weather__realfeel = document.querySelector(".weather__realfeel")
let weather__humidity = document.querySelector(".weather__humidity")
let weather__wind = document.querySelector(".weather__wind")
let weather__pressure = document.querySelector(".weather__pressure")


document.querySelector(".weather__search").addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform")
    e.preventDefault();
    currCity = search.value;
    getWeather()
    search.value = ""
})

function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(["en"], {type:"region"});
    return regionNames.of(country)
}

function convertTimeStamp(timestamp, timezone) {
    const convertTimeZone = timezone/3600
    const date = new Date(timestamp * 1000)

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timezone: `Etc/GMT${convertTimeZone >= 0?"-": "+"}${Math.abs(convertTimeZone)}`,
        hour12: true,
    }

    return date.toLocaleString("en-US", options)
}

function getWeather() {
    const API_KEY = 'f0f62a85a5be3f9ad0f89462f64d7547'
    try {
        
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=metric`)
        .then(response => response.json()).then(data => {
            city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
            datetime.innerHTML = convertTimeStamp(data.dt, data.timezone)
            weather__forecast.innerHTML = `<p>${data.weather[0].main}</p>`
            weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
            weather__icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
            weather__minmax.innerHTML = `<p>Min : ${data.main.temp_min.toFixed()}&#176</p> <p>Max : ${data.main.temp_max.toFixed()}&#176</p>`
            weather__realfeel.innerHTML = `${data.main.feels_like} &#176`
            weather__humidity.innerHTML = `${data.main.humidity.toFixed()} %`
            weather__wind.innerHTML = `${data.wind.speed} m/s`
            weather__pressure.innerHTML = `${data.main.pressure.toFixed()} hPa`
            console.log("success")
        })
    }
        catch (error) {
            alert("Enter City name correctly")
            console.log("Error")
    } 
}

document.body.addEventListener("load", getWeather())