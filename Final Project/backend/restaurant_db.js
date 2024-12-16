const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); // Import the cors middleware

const app = express();  

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // Replace with your MySQL password
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
          dishName VARCHAR(255) NOT null,
          ingredientList VARCHAR(255) NOT null,
          allergenesList VARCHAR(255),
          dishPrice INT NOT null,
          dishAvailable BOOLEAN DEFAULT true,
          imagePath VARCHAR(255)
      )`;

      const managerTable = `CREATE TABLE IF NOT EXISTS Manager (
          managerId INT AUTO_INCREMENT PRIMARY KEY,
          ManagerName VARCHAR(255) NOT null,
          ManagerPassword VARCHAR(255) NOT null
      )`;

      const waiterTable = `CREATE TABLE IF NOT EXISTS Waiter (
          waiterId INT AUTO_INCREMENT PRIMARY KEY,
          waiterName VARCHAR(255) NOT null,
          waiterPassword VARCHAR(255) NOT null
      )`;

      const dishListTable = `CREATE TABLE IF NOT EXISTS DishList (
          dishID INT PRIMARY KEY,
          FOREIGN KEY (dishID) REFERENCES Dish(dishID) ON DELETE CASCADE
      )`;

      /*const customerTable = `CREATE TABLE IF NOT EXISTS Customer (
          customerId INT AUTO_INCREMENT PRIMARY KEY,
          customerName VARCHAR(255) NOT null
      )`;
      */
      // Execute table creation queries
      con.query(dishTable, function (err) {
        if (err) throw err;
        console.log("Table Dish ensured!");

        // Insert dishes into the Dish table
        const dishes = [
          ['Margherita Pizza', 'Flour, Tomato Sauce, Mozzarella', 'Gluten, Dairy', 10, true, '/images/margherita_pizza.jpg'],
          ['Classic Burger', 'Bun, beef, lettuce, tomato, cheese', 'Gluten, lactose', 11, true, 'images/classic_burger.jpg'],
          ['Croque Monsieur', 'Bread, ham, cheese, béchamel', 'Gluten, lactose', 7, true, 'images/croque_monsieur.jpg'],
          ['Quiche Lorraine', 'Eggs, cream, bacon, shortcrust pastry', 'Gluten, eggs, lactose', 8, true, 'images/quiche_lorraine.jpg'],
          ['Lasagna', 'Pasta, beef, tomato sauce, béchamel', 'Gluten, lactose', 12, true, 'images/lasagna.jpg'],
          ['Spaghetti Bolognese', 'Spaghetti, Beef, Tomato Sauce', 'Gluten', 12, true, '/images/bolonese.jpg'],
          ['Spaghetti Carbonara', 'Pasta, eggs, pancetta, parmesan, pepper', 'Gluten, eggs, lactose', 12, true, 'images/carbonara.jpg'],
          ['Steak and Fries', 'Beef, potatoes, salt', null, 15, true, 'images/steak_fries.jpg'],
          ['Caesar Salad', 'Lettuce, Croutons, Parmesan, Caesar Dressing', 'Dairy, Gluten', 8, true, '/images/caesar_salad.jpg'],
          ['Ratatouille', 'Eggplant, zucchini, tomatoes, peppers, onions', null, 8, true, 'images/ratatouille.jpg'],
          ['Paella', 'Rice, chicken, seafood, saffron', 'Shellfish', 18, true, 'images/paella.jpg'],
          ['Chicken Tikka Masala', 'Chicken, Cream, Spices', 'Dairy', 15, true, '/images/chicken_tikka.jpg'],
          ['Dark Forest', 'Flour, Cocoa, Sugar, Eggs, Chocolate, Cherry', 'Gluten, Eggs, Dairy', 6, true, '/images/darkforest.jpg'],
          ['Apple Pie', 'Apples, sugar, cinnamon, butter, pastry', 'Gluten, lactose', 6, true, 'images/apple_pie.jpg'],
          ['Dame Blanche', 'Vanilla ice cream, chocolate sauce, whipped cream', 'Lactose', 7, true, 'images/dame_blanche.jpg']
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
