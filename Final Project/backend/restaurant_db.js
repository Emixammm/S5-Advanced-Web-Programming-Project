const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); // Import the cors middleware

const app = express();  

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maxime8696++', // Replace with your MySQL password
  });

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST","DELETE","PUT"],       
  credentials: true,              
}));

con.connect(function (err) {
  if (err) {
    console.error("Error connecting:", err.message);
    return;
  }
  console.log("Connected!");

  // Create the database
  con.query("CREATE DATABASE IF NOT EXISTS restaurant_db", function (err, result) {
    if (err) throw err;
    console.log("Database restaurant_db ensured!");

    // Switch to the newly created database
    con.changeUser({ database: 'restaurant_db' }, function (err) {
      if (err) throw err;

      // Create tables
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

      // Execute table creation queries
      con.query(dishTable, function (err) {
        if (err) throw err;
        console.log("Table Dish ensured!");

        // Insert dishes into the Dish table
        const dishes = [
          ['Spaghetti Bolognese', 'Spaghetti, Beef, Tomato Sauce', 'Gluten', 12, true, '/images/spaghetti.jpg'],
          ['Caesar Salad', 'Lettuce, Croutons, Parmesan, Caesar Dressing', 'Dairy, Gluten', 8, true, '/images/caesar_salad.jpg'],
          ['Margherita Pizza', 'Flour, Tomato Sauce, Mozzarella', 'Gluten, Dairy', 10, true, '/images/margherita_pizza.jpg'],
          ['Chicken Tikka Masala', 'Chicken, Cream, Spices', 'Dairy', 15, true, '/images/chicken_tikka.jpg'],
          ['Chocolate Cake', 'Flour, Cocoa, Sugar, Eggs', 'Gluten, Eggs, Dairy', 6, true, '/images/chocolate_cake.jpg'],
        ];

        const insertDish = `INSERT INTO Dish (dishName, ingredientList, allergenesList, dishPrice, dishAvailable, imagePath) 
          VALUES (?, ?, ?, ?, ?, ?)`;

        const managers = [
          ['MaximeTang', 'Tang'],
          ['TiphaineFournier', 'Fournier'],
          ['AlexandreGobe','Gobe']
        ];

        const insertManager = `INSERT INTO Manager (ManagerName, ManagerPassword) 
          VALUES (?, ?)`;

        const waiters = [
          ['SamuelDoyen', 'Doyen'],
          ['ThibaultBial', 'Bial'],
          ['JonathanAyeto', 'Ayeto'],
          ['MathisBeurotte','Beurotte']
        ]

        const insertWaiter = `INSERT INTO Waiter (waiterName, waiterPassword) 
          VALUES (?, ?)`;


          Promise.all(
            dishes.map(dish =>
                new Promise((resolve, reject) => {
                    con.query(insertDish, dish, (err, result) => {
                        if (err) {
                            console.error("Erreur lors de l'insertion du dish :", err.message);
                            reject(err);
                        } else {
                            console.log(`Dish inséré : ${dish[0]}`);
                            resolve(result);
                        }
                    });
                })
            )
        ).then(() => {
            console.log("Tous les dishes ont été insérés.");

            // Création et insertion des managers
            con.query(managerTable, err => {
                if (err) throw err;
                console.log("Table Manager créée.");

                Promise.all(
                    managers.map(manager =>
                        new Promise((resolve, reject) => {
                            con.query(insertManager, manager, (err, result) => {
                                if (err) {
                                    console.error("Erreur lors de l'insertion du manager :", err.message);
                                    reject(err);
                                } else {
                                    console.log(`Manager inséré : ${manager[0]}`);
                                    resolve(result);
                                }
                            });
                        })
                    )
                ).then(() => {
                    console.log("Tous les managers ont été insérés.");

                    // Création et insertion des waiters
                    con.query(waiterTable, err => {
                        if (err) throw err;
                        console.log("Table Waiter créée.");

                        Promise.all(
                            waiters.map(waiter =>
                                new Promise((resolve, reject) => {
                                    con.query(insertWaiter, waiter, (err, result) => {
                                        if (err) {
                                            console.error("Erreur lors de l'insertion du waiter :", err.message);
                                            reject(err);
                                        } else {
                                            console.log(`Waiter inséré : ${waiter[0]}`);
                                            resolve(result);
                                        }
                                    });
                                })
                            )
                        ).then(() => {
                            console.log("Tous les waiters ont été insérés.");
                            closeConnection();
                        }).catch(err => {
                            console.error("Erreur lors de l'insertion des waiters :", err);
                            closeConnection();
                        });
                    });
                }).catch(err => {
                    console.error("Erreur lors de l'insertion des managers :", err);
                    closeConnection();
                });
            });
        }).catch(err => {
            console.error("Erreur lors de l'insertion des dishes :", err);
            closeConnection();
        });
    });
});

// Fonction pour fermer la connexion à la base de données
function closeConnection() {
    con.end(err => {
        if (err) {
            console.error("Erreur lors de la fermeture de la connexion :", err.message);
        } else {
            console.log("Connexion fermée.");
        }
    });
}});})
