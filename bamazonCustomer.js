const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Passw0rd",
    database: "amazonDB"
});

const userInput = process.argv[2];

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId)
    runSearch();
});

const runSearch = function {
    inquirer
        .prompt({
//ask them the ID of the product they would like to buy
            
//ask how many units of the product they would like to buy
        })
        .then(answers => {

        }
}


