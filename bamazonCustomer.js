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
            console.log("userID :" + userId)
            connection.query(query
                , function (err, res) {
                    if (err) throw err;

                    if (unitAmount > res[0].quantity) {
                        console.log("Sorry, but we do not have that many in stock...");
                        connection.end();
                    } else {
                        updateQuanity(userId, unitAmount);
                    }

                });
        });
}

const updateQuanity = (userId, unitAmount) => {
    var query = `UPDATE products SET quantity=${unitAmount} WHERE id=?`;
    connection.query(query, [userId], function (err, res) {
        if (err) throw err;

    })
}





