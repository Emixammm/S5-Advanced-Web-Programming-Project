const express = require('express');
const mysql = require('mysql2');
const app = express();

const port = 3000;

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
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

// Endpoint pour récupérer tous les plats
app.get('/dish', (req, res) => {
    const sql = `SELECT * FROM Dish`; // Table correcte : "Dish"
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
        dish_name: req.body.dish_name,
        ingredient_list: req.body.ingredient_list,
        allergenes: req.body.allergenes || null, // Optionnel
        dish_price: req.body.dish_price,
        dish_available: req.body.dish_available,
        image_path: req.body.image_path || null, // Optionnel
    };

    const sql = 'INSERT INTO Dish SET ?';
    db.query(sql, newDish, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({
            message: 'Plat ajouté avec succès',
            id: result.insertId
        });
    });
});

// Route pour supprimer un plat par ID
app.delete('/dish/:id', (req, res) => {
    const dishId = parseInt(req.params.id, 10); // Validation de l'ID

    if (isNaN(dishId)) {
        return res.status(400).send({ error: 'ID invalide' });
    }

    const sql = 'DELETE FROM Dish WHERE id = ?'; // Table correcte : "dish"
    db.query(sql, [dishId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression :', err);
            return res.status(500).send({ error: 'Erreur interne du serveur' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Plat non trouvé' });
        }

        res.status(200).send({ message: 'Plat supprimé avec succès' });
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
