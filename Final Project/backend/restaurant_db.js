const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maxime8696++', // Remplacez par votre mot de passe
});

con.connect(function (err) {
    if (err) {
        console.error("Error connecting:", err.message);
        return;
    }
    console.log("Connected!");

    // Création de la base de données
    con.query("CREATE DATABASE IF NOT EXISTS restaurant_db", function (err, result) {
        if (err) throw err;
        console.log("Database restaurant_db ensured!");

        // Utilisation de la base de données
        con.changeUser({ database: 'restaurant_db' }, function (err) {
            if (err) throw err;

            // Création de la table dish
            const dishTable = `CREATE TABLE IF NOT EXISTS Dish (
                dishID INT AUTO_INCREMENT PRIMARY KEY,
                dishName VARCHAR(255) NOT NULL,
                ingredientList VARCHAR(255) NOT NULL,
                allergenesList VARCHAR(255),
                dishPrice INT NOT NULL,
                dishAvailable BOOLEAN DEFAULT TRUE,
                imagePath VARCHAR(255)
            )`;
            const managerTable = `CREATE TABLE IF NOT EXISTS Manager (
                managerId INT AUTO_INCREMENT PRIMARY KEY,
                ManagerName VARCHAR(255) NOT NULL,
                ManagerPassword VARCHAR(255) NOT NULL
            )`;
            const waiterTable = `CREATE TABLE IF NOT EXISTS Waiter (
                waiterId INT AUTO_INCREMENT PRIMARY KEY,
                waiterName VARCHAR(255) NOT NULL,
                waiterPassword VARCHAR(255) NOT NULL
            )`;
            const dishListTable = `CREATE TABLE IF NOT EXISTS DishList (
                dishID INT PRIMARY KEY,
                FOREIGN KEY (dishID) REFERENCES Dish(dishID) ON DELETE CASCADE
            )`;
            const customerTable = `CREATE TABLE IF NOT EXISTS Customer (
                customerId INT AUTO_INCREMENT PRIMARY KEY,
                customerName VARCHAR(255) NOT NULL
            )`;

            con.query(dishTable, function (err, result) {
                if (err) throw err;
                console.log("Table Dish ensured!");
            });
            con.query(managerTable, function (err, result) {
            if (err) throw err;
            console.log("Table Manager ensured!");
        });
        con.query(waiterTable, function (err, result) {
            if (err) throw err;
            console.log("Table Manager ensured!");
        });
        connection.query(dishListTable, (err) => {
            if (err) throw err;
            console.log('Table DishList created.');
        });
        connection.query(customerTable, (err) => {
            if (err) throw err;
            console.log('Table Customer created.');
        });
        con.end(); // Fermer la connexion
        });   
    });
});
