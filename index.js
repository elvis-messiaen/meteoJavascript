/**
 * @author Messiaen ELVIS
 */
// récupération du noeud DOM pour le bouton
let button = document.querySelector("#button");

// récupération des noeud DOM
let inputValue = document.querySelector("#inpuValue");
let ville = document.querySelector("#ville");
let longLat = document.querySelector("#longLat");
let affich = document.querySelector(".affich");

// Ajout d'un écouteur de type addEventListener
/***
 * mise en place du fetch
 * pour recuperer depuis l'api les élémnts voulu
 * on mets en place le principe de promesse then
 * on crée un schéma pour la récuperation de l'ensemble des cartes toutes les 3 heures
 * on fait un for afin de parcourir l'ensemble des données
 * on affecte cela avec a la div prévu dans l'HTML
 */
button.addEventListener("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      inputValue.value +
      "&appid=83432ce74739adb988f7d452bc47b52b&units=metric"
  )
    .then((response) => response.json())
    .then((data) => {
      ville.innerHTML = data.city.name;
      const c = data.city.coord;
      longLat.innerHTML = `lattitude : ${c.lat} et longitude : ${c.lon}`;

      let modele = "";
      for (let valeur of data.list) {
        modele += `
        <div class="direct">
        <p> temperature : ${valeur.main.temp} °C</p>
        <p>${valeur.dt_txt}</p>
        <p id="logo">
             <img src="https://openweathermap.org/img/w/${valeur.weather[0].icon}.png"/>
        </p>
       <hr/>
    <ul>
        <li class="puce">minimum : ${valeur.main.temp_min}</li>
        <li class="puce">maximum : ${valeur.main.temp_max}</li>
    </ul>
    </div> `;
      }
      affich.innerHTML = modele;
    });
});
