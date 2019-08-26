#!/usr/bin/env nodes
const axios = require('axios');
const{
    getCode,
    getName
} = require('country-list');
const chalk = require('chalk');


console.log( " Hello,  " );



let year = "" ;
let country = "";

process.argv.forEach((valeur, index) => {       // Récupère les paramètres après la commande
    //console.log(`${index}: ${valeur}`);
    if(index == 2){
        country = valeur ;
    }
    if(index == 3){
        year = valeur ;
    }
});

let countryCode = getCode(country); // On recupère le code du pays

if(year == ""){
    year = new Date().getFullYear();  // Prend l'année en cours si on entre pas de date
}

axios.get(`https://date.nager.at/api/v2/PublicHolidays/${year}/${countryCode}`).then(function(response){
    for (let i = 0; i < response.data.length; i++) {
        let nameElement = response.data[i].localName; 
        let yearElement = response.data[i].date;
        console.log(`${chalk.blue(yearElement)}  ${chalk.magenta(nameElement)}`);       // Récupère les noms des fêtes du tableau
    }
})
    
