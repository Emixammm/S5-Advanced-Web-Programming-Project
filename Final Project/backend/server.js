const express = require('express');
const mysql = require('mysql2');
const app = express();

const port = 3000;

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maxime8696++',
    database: 'restaurant_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to database');
});

// Middleware pour parser les données JSON
app.use(express.json());

// Endpoint to get all the dishes
app.get('/dish', (req, res) => {
    const sql = `SELECT * FROM Dish`; // Table correcte : "Dish"
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
// Endpoint to get all the managers
app.get('/manager', (req, res) => {
    const sql = `SELECT * FROM Manager`; // Table correcte : "Manager"
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
// Endpoint to get all the waiters
app.get('/waiter', (req, res) => {
    const sql = `SELECT * FROM Waiter`; // Table correcte : "Waiter"
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Route pour ajouter un nouveau plat
app.post('/dish', (req, res) => {
    const newDish = {
        dishName: req.body.dishName, // Correction du nom
        ingredientList: req.body.ingredientList,
        allergenesList: req.body.allergenesList || null, // Nom correct pour la colonne
        dishPrice: req.body.dishPrice,
        dishAvailable: req.body.dishAvailable,
        imagePath: req.body.imagePath || null,
    };

    const sql = 'INSERT INTO Dish SET ?';  
    db.query(sql, newDish, (err, result) => {
        if (err) {
            console.error('Error inserting dish:', err);
            return res.status(500).send(err); // Répond avec l'erreur
        }
        res.json({
            message: 'Dish added successfully',
            id: result.insertId
        });
    });
});


// Route pour supprimer un plat par ID
app.delete('/dish/:dishId', (req, res) => {
    const dishId = parseInt(req.params.dishId, 10); // Correction : utilise dishId

    if (isNaN(dishId)) {
        return res.status(400).send({ error: 'Invalid ID' });
    }

    const sql = 'DELETE FROM Dish WHERE dishID = ?'; // Utilise dishID
    db.query(sql, [dishId], (err, result) => {
        if (err) {
            console.error('Error occurred during deletion:', err);
            return res.status(500).send({ error: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Dish not found' });
        }

        res.status(200).send({ message: 'Dish deleted successfully' });
    });
});



// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
