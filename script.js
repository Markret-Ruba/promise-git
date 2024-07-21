document.addEventListener('DOMContentLoaded', function () {
    const countryListElement = document.getElementById('countryList');
  
    // Function to fetch countries data from REST Countries API
    function fetchCountries() {
      fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
          countries.forEach(country => {
            // Create card element
            const card = document.createElement('div');
            card.classList.add('col-lg-3', 'mb-4');
            // Extract required data
            const capital = country.capital ?? 'N/A';
            const region = country.region ?? 'N/A';
            const name = country.name.common ?? 'N/A';
            const countryCode = country.cca2 ?? 'N/A';
            const flagUrl = country.flags.svg ?? '';
  
            // Create card content
            card.innerHTML = `
              <div class="card">
                
                <img src="${flagUrl}" class="card-img-top" alt="${name} Flag">
                <div class="card-body">
                  <h5 class="card-title">${name} </h5>
                  <p class="card-text"><strong>Countrycoad:</strong> (${countryCode})</p>
                  <p class="card-text"><strong>Capital:</strong> ${capital}</p>
                  <p class="card-text"><strong>Region:</strong> ${region}</p>
                  </div>
                   <div class="card2 col-lg-12 mb-4">
           <inclick 
                      <button class="btn btn-primary" onclick="getWeather('${name}')">Get Weather</button>
        <p class="card-text"><strong>Temp:</strong> ${country.latlng ? country.latlng[0] : 'N/A'}</p>
           <p class="card-text"><strong>Longitude:</strong> ${country.latlng ? country.latlng[1] : 'N/A'}</p>
     </div>
              </div>
           `;
          
            // Append card to the countryList container
            countryListElement.appendChild(card);
          });
        })
        .catch(error => console.error('Error fetching countries:', error));
    }
  
    // Function to fetch weather data from OpenWeather API
    
    function getWeather(countryName) {
      //const apiKey = 'YOUR_OPENWEATHER_API_KEY'; 
      let apiUrl = 'https://openweathermap.org/';
      
      fetch(apiUrl)
        .then(response => response.json())
        .then(weatherData => {
          // Example: Display temperature
          let temperature = weatherData.main.temp - 273.15; // Convert Kelvin to Celsius
          alert(`Current temperature in ${countryName}: ${temperature.toFixed(2)}°C`);
        })
        .catch(error => console.error('Error fetching weather:', error));
    
  }
  
    // Fetch countries data when DOM content is loaded
    fetchCountries();
  });