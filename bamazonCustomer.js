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
const displayItems = () => {
    var query = "SELECT * FROM products";
    connection.query(query, (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`
=============================
ID:       ${res[i].id}
Name:     ${res[i].title}
Price:    ${res[i].price}
Quantity: ${res[i].quantity}
=============================
        `)
        }

    })
}
const runSearch = () => {
    displayItems();
    inquirer
        .prompt({
            //ask them the ID of the product they would like to buy
            name: "action",
            type: "list",
            message: "What is the id of the item you would like to buy?",
            choices: [
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
            ]
        })
        .then(function (answer) {
            const userId = answer.action
            console.log(userId);
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { id: userId }, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log(`
Item selected:   ${res[i].title}
Quantity:        ${res[i].quantity} `)
                }
                unitAmount(userId);
            });
        });
}



const unitAmount = (userId) => {
    //ask how many units of the product they would like to buy
    inquirer
        .prompt({
            name: "amount",
            type: "input",
            message: "How many units would you like?(ENTER A NUMBER)",

        })
        .then(function (answer) {
            var unitAmount = answer.amount
            var query = `SELECT quantity FROM products WHERE id="${userId}"`;
            connection.query(query
                , function (err, res) {
                    let tableAmount = res[0].quantity;
                    if (err) throw err;

                    if (unitAmount > res[0].quantity) {
                        console.log("Sorry, but we do not have that many in stock...");
                        connection.end();
                    } else {
                        updateQuanity(userId, unitAmount, tableAmount);
                    }

                });
        });
}


const updateQuanity = (userId, unitAmount, tableAmount) => {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                quantity: tableAmount - unitAmount
            },
            {
                id: userId
            }
        ],
        (err) => {
            if (err) throw err;
            console.log("Thanks for your purchase!");
            showUpdate(userId, unitAmount);
            connection.end()
        }
    )
}
const showUpdate = (userId, unitAmount) => {
    var query = connection.query(
        "SELECT * FROM products WHERE ?",
        [
            {
                id: userId
            }
        ],
        (err, res) => {
            if (err) throw err;
            var priceOutcome = res[0].price * unitAmount;
            console.log(`
That was ${priceOutcome} for each unit!!
There are ${res[0].quantity} left in stock...` )
        }
    )
}



