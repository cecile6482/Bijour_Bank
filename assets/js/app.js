console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});

//local storage vide ou non
let lsVal = localStorage.getItem("next");

//definition du tableau en fonction du status du local Storage
let operations=[]; 
if (lsVal !== null){
  operations = JSON.parse(localStorage.getItem("operations"));
}

//definition du solde en fonction du status du local Storage
let solde = document.querySelector("#solde").innerHTML;
if (lsVal !== null){
  solde = parseFloat(lsVal);
  document.querySelector("#solde").innerHTML = solde+"€";
  console.log(solde);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fonctionnement des onglets
const onglet_credit = document.querySelector("#onglet_credit");

onglet_credit.addEventListener("click", function(){

  let debits = document.getElementsByClassName('debit');
  for (let i = 0; i < debits.length; i++) {
        debits[i].style.display="none"}

  let credits = document.getElementsByClassName('credit');
  for (let i = 0; i < credits.length; i++) {
  credits[i].style.display="contents"}
  
  onglet_credit.setAttribute("class", "active");
  onglet_tout.removeAttribute("class");
  onglet_debit.removeAttribute("class");

})

const onglet_debit = document.querySelector("#onglet_debit");

onglet_debit.addEventListener("click", function(){

   let credits = document.getElementsByClassName('credit');
  for (let i = 0; i < credits.length; i++) {
  credits[i].style.display="none"}

  let debits = document.getElementsByClassName('debit');
  for (let i = 0; i < debits.length; i++) {
        debits[i].style.display="contents"}
 
        onglet_debit.setAttribute("class", "active");
        onglet_tout.removeAttribute("class");
        onglet_credit.removeAttribute("class");

})

const onglet_tout = document.querySelector("#onglet_tout")

onglet_tout.addEventListener("click",function(){

  let credits = document.getElementsByClassName('credit');
  for (let i = 0; i < credits.length; i++) {
  credits[i].style.display="contents"}

  let debits = document.getElementsByClassName('debit');
  for (let i = 0; i < debits.length; i++) {
        debits[i].style.display="contents"}

        onglet_tout.setAttribute("class", "active");
        onglet_credit.removeAttribute("class");
        onglet_debit.removeAttribute("class");
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////


//formulaire
const form = document.querySelector("#operationForm")
form.addEventListener("submit",function(){

const titre = document.querySelector("#titre").value;

const desc = document.querySelector("#desc").value;

const montant = document.querySelector("#montant").value;

let operator = document.querySelector("#operator").value;

let image = '<img src="./assets/images/sac-dargent.png" alt="credit" />'

if (operator == "debit") { 
  image = '<img src="./assets/images/depenses.png" alt="debit" />'
}

//calcul du pourcentage 
let pourcentage1 = parseFloat(montant)/parseFloat(solde);
let pourcentage2 = parseFloat(pourcentage1)*100;
pourcentage2 = pourcentage2.toFixed(2);

//création de l'affichage des nouvelles opération 
let afficher = document.querySelector("#afficher")
afficher.innerHTML+=`<div class="operation ${operator}">
<div class="grid-x grid-padding-x align-middle">
  <div class="cell shrink">
    <div class="picto">
      ${image}
    </div>
  </div>
  <div class="cell auto">
    <div>
      <h2>${titre}</h2>
      <small>${desc}</small>
    </div>
  </div>
  <div class="cell small-3 text-right">
    <div>
      <p class="count">${montant}€</p>
      <small>${pourcentage2}%</small>
    </div>
  </div>
</div>
</div>`

//vidage du formulaire apres chaque envoi
let form = document.querySelector("#operationForm")
form.reset();

//nouveau solde 
if (operator == "credit"){
solde = parseFloat(solde) + parseFloat(montant);
document.querySelector("#solde").innerHTML= solde+"€"
}
else {
  solde = parseFloat(solde) - parseFloat(montant);
document.querySelector("#solde").innerHTML= solde+"€"
}

//appel de la fonction qui change le message en dessous du solde
messenger();

//objet operation
const operation = {
  type : operator,
  titre : titre,
  desc : desc,
  montant : montant,
  image : image,
  pourcentage : pourcentage2
};


operations.push(operation);

localStorage.setItem("operations", JSON.stringify(operations));
localStorage.setItem("next", parseFloat(solde));

//màj graph
updateGraph();

})

//génération des opérations stockées dans le local storage
let affichageBas = document.querySelector("#Affichage_bas");
let tableauOpe = JSON.parse(localStorage.getItem("operations"));

 if (localStorage.getItem("valeurSuivante") !== null){
     for (let index = 0; index < tableauOpe.length; index++) {
  let operator =  tableauOpe[index].type;
  let image = tableauOpe[index].image;
  let titre = tableauOpe[index].titre;
  let desc = tableauOpe[index].desc;
  let montant = tableauOpe[index].montant;
  let pourcentage2 = tableauOpe[index].pourcentage

  affichageBas.innerHTML +=`<div class="operation ${operator}">
  <div class="grid-x grid-padding-x align-middle">
    <div class="cell shrink">
      <div class="picto">
        ${image}
      </div>
    </div>
    <div class="cell auto">
      <div>
        <h2>${titre}</h2>
        <small>${desc}</small>
      </div>
    </div>
    <div class="cell small-3 text-right">
      <div>
        <p class="count">${montant}€</p>
        <small>${pourcentage2}%</small>
      </div>
    </div>
  </div>
  </div>`;
       
     }
 }

//fonction qui change le message en dessous du solde
 function messenger (){
  let message = document.querySelector("#msg");
  let solde = document.addEventListener("#solde");

 if (solde >= 0 ){
  message.innerHTML = "On est bien 😀"
  message.style.color="green"
}
else {
  message.innerHTML = "On est mal 😒"
  message.style.color="red"
}}

 messenger();






