#!/usr/bin/env nodes
const axios = require('axios');
const country = require("country-list");
const chalk = require('chalk');
const figlet = require('figlet');
const ora = require('ora');
const chalkAnimation = require('chalk-animation');
const prompts = require('prompts');
const clear = require("clear"); 
const uri = "https://date.nager.at/api/v2/publicholidays/";



const questions = [
    {
    type: "text",
    name: "chooseCountry",
    message: "Choose a country ? "
    },
    {
    type: "number",
    name: "chooseYear",
    message: "Choose a year ? "
    }
];

let holiday = async () => {
    const response = await prompts(questions);

    let thisCountry = response.chooseCountry ;
    let thisYear = response.chooseYear;

    if(thisYear  == ""){
        thisYear = new Date().getFullYear();  // Prend l'année en cours si on entre pas de date
    }

    let countryCode = country.getCode(thisCountry);// On recupère le code du pays

    try {
        const result = await axios.get(`${uri}${thisYear}/${countryCode}`);

        // Texte Holidays    

            console.log(
                chalk.yellow(figlet.textSync('Holidays', {
                font: 'Standard',
                horizontalLayout: 'fitted',
                verticalLayout: 'default'
                })
                )
            )



        let holidays = Array.from(result.data);  // On récupère sous forme d'un tableau

        // Texte en arc-en-ciel
        const rainbow = chalkAnimation.rainbow(`This is a list of holidays in ${thisCountry}, ${thisYear} : `).stop();
        rainbow.render(); // Afficher le premier
        const frame = rainbow.frame(); // Afficher le deuxieme
        console.log(frame);
        

        
        holidays.forEach((el, i) => {
            const colors = [30, 31, 32, 33, 34, 35, 36, 37];
            const brightColors = [90, 91, 92, 93, 94, 95, 96, 97];

            let all = [...colors, ...brightColors];
            
                let color = `\x1B[${all[i]}m`;            
                let bgColor = `\x1B[30;${all[i] + 10}m`; 
                let reset = '\x1B[0m';                
                console.log(chalk.blue(`${color}${el.date} :  ${color}${el.name}.${reset}`));
        
        });

    } catch (err) {
        console.log(err);
        console.log(
            chalk.red(
            "Incorrect values. Please try again :  :) "
            )
        );
        holiday();
    }
};

clear();
holiday();
    
  
 
    /*


     figlet.text('Holidays', {
        font: 'Standard',
        horizontalLayout: 'fitted',
        verticalLayout: 'default'
    }, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    });
 
*/
    /*

   // console.log(`Hello, here is the list of holidays in ${answer} !`);
console.log( " Hello, here is the list of holidays" );




//'use strict';


axios.get(`https://date.nager.at/api/v2/PublicHolidays/${year}/${countryCode}`).then(function(response){
    for (let i = 0; i < response.data.length; i++) {
        let nameElement = response.data[i].localName; 
        let yearElement = response.data[i].date;


    /*    const colors = [30, 31, 32, 33, 34, 35, 36, 37];
        const bColors = [90, 91, 92, 93, 94, 95, 96, 97];

        [...colors, ...bColors].forEach(el => {
            const color = `\x1B[${el}m`;            
            //const bgColor = `\x1B[30;${el + 10}m`;  
            const reset = '\x1B[0m';      

            console.log(`${color}${yearElement}  ${color}${nameElement}${reset}`);
        });
*//*
        console.log(`${yearElement}  ${nameElement}`);       // Récupère les noms des fêtes du tableau
   


    }
})
*/


