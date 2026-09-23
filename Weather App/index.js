let cityinp = document.querySelector("#inpcity")
let form = document.querySelector("#form")
let search = document.querySelector("#search")
let card = document.querySelector("#info")
const weatherapi = "45ae4ff2d2f9eb02a1856fb417c7a44c"
const url = "https://api.openweathermap.org/data/2.5/weather"


form.addEventListener("submit", (e) => {
  e.preventDefault()
  let cityname = cityinp.value

  weatherdata(weatherapi, url, cityname, card)
  cityinp.value = ""
}
)


async function weatherdata(api, url, city, card) {


  try {
    let result = await fetch(`${url}?q=${city}&appid=${api}&units=metric`)
    let data = await result.json()
    let icon = data.weather[0].icon
    let iconurl = `https://openweathermap.org/img/wn/${icon}@2x.png`

    console.log(data)
    card.innerHTML = `  <div class=" flex flex-col  gap-3 items-center justify-center mt-7 ">
                        <h2 class="text-white text-2xl " >
                            ${data.weather[0].description}
                        </h2>
                        <img class="h-15 w-15"
                            src="${iconurl}"
                            alt="">
                        <h2 class="text-white text-2xl " id="temp">
                            ${data.main.temp}°C
                        </h2>
                        <h2 class="text-white text-2xl " id="city">
                            ${data.name}
                        </h2>
                    </div>
                    <div class="flex justify-center gap-5 mt-7 mb-5">
                        <p class="text-white text-xl ">Humidity: ${data.main.humidity}</p>
                        <p class="text-white text-xl ">${(data.wind.speed * 3.6).toFixed(1)} km/h
                        </p>
                    </div>`
  } catch (error) {
    card.innerHTML = ` <div class=" flex flex-col  gap-3 items-center justify-center mt-7 ">
                        <h2 class="text-white text-2xl " >
                           "${city}" is not a valid city
                        </h2>`
  }


}



weatherdata(weatherapi, url, "Delhi", card)