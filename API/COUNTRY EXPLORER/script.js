const btn = document.querySelector("#btn");
const input = document.querySelector("#likho")
const result = document.querySelector("#result")



function fetchCountry(name){
    fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(res => res.json())
    .then((data)=>{
        showCountries(data);
    })
    .catch(()=>{
        result.textContent = "No Country Found";
    })

}

function showCountries(countries) {
    result.innerHTML = "";
  
    countries.forEach(country => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${country.name.common}</h3>
        <img src="${country.flags.svg}" width="100">
        <h2>Continent : ${country.continents}</h2>
        <p>Region :  ${country.region}</p>
        <p>Area : ${country.area}</p>

        <p>Capital : ${country.capital}</p>
        <p>Population : ${country.population}</p>

        <p> ${country.flags.alt}</p>
      `;
      result.appendChild(div);
    });
  }
  

input.addEventListener("input", () => {
    fetchCountry(input.value);
  });
  

