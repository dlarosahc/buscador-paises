
const searchInput = document.querySelector('#search');
const container = document.querySelector('.container');
const body = document.querySelector('.main');
const loader = document.querySelector('.loader');
const formContainer = document.querySelector('.form-container');
const title = document.querySelector('.title');

//const filtro = document.querySelector('.filtro');
//const list = document.querySelector('#list');
// Los paises descargados desde la api se guardan en el array de countries
// La api deberia pedirse solo una vez
// Usar este array para crear el filtrado
let countries = [];

// Funcion que pide todos los paises
const getCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all',)
    if (response){
      countries = await response.json()
    }
  } catch (error) {
    console.error(error.message)
  }
}
getCountries();

//APIkey 5bfd03d1d3d1b5f235d015a080b6f976
// Funcion para el clima
const getWeather = async (lat,lon) => {
  
  try {
    const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5bfd03d1d3d1b5f235d015a080b6f976&units=metric
`)
  if (response){
      const weather = await response.json()
      return weather;
    }
  } catch (error) {
    console.error(error.message)
  }

}


searchInput.addEventListener('input', async e => {
  container.innerHTML=`
    <div class="loading"></div>
    `;
  const filtered = countries.filter(country => {
    return country.name.common
      .toLowerCase()
      .startsWith(searchInput.value.toLowerCase())
  });

  if (searchInput.value === '') {
    container.innerHTML='';
  } else if (filtered.length >= 10) {
    container.innerHTML= `<h3>Demasiados paises, especifica tu busqueda</h3>`

  } else if (filtered.length <=10 && filtered.length!=1){
    container.innerHTML='';
    filtered.forEach(country => {
      const div = document.createElement('div');
      div.classList.add('country-container');
      div.id = `country-${country.name.common}`;
      div.innerHTML = `

        <p>${country.name.common}</p>
        <img src="${country.flags.svg}" class="flag-image" alt="">
      `;
      container.append(div);
    });

  } else if (filtered.length === 1){
    const p = filtered[0];
    console.log(p);
    const clima = await getWeather(p.latlng[0],p.latlng[1])

    container.innerHTML = `
    <div class="flag-box">
    <img id="flag" src="${p.flags.png}" alt="" width="300" height="200">
    </div>
    <div class="info-country">
    <h3>${p.name.common}</h3>
     <p>Capital: ${p.capital}</p>
     <p>Continente: ${p.continents}</p>
     <p>Habitantes: ${p.population.toLocaleString()}</p>
     <p>Temperatura: ${clima.main.temp}°C</p>
     <p>Zona Horaria: ${p.timezones}</p>
     <p class="clima">Clima:<img src="https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png" 
     class="weatherIcon" alt=""> ${clima.weather[0].main}</p>
     </div>
    `
    };

});



