const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const port = 3000;

app.use(cors());

//CORS Header otherwise my browser block it
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next();
  });


//MySQL server connexion
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'restaurant_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to database');
});

//Middleware for JSON
app.use(express.json());

// Endpoint to load the dishes
app.get('/dishes', (req, res) => {
    const sql = `SELECT * FROM dish`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

//router to add a new dish
app.post('/dish', (req, res) => {
    const newDish = {
        dish_name: req.body.dish_name,
        ingredient_list: req.body.ingredient_list,
        allergenes: req.body.allergenes || null,
        dish_price: req.body.dish_price,
        dish_available: req.body.dish_available,
        image_path: req.body.image_path || null,
    };

    const sql = 'INSERT INTO dish SET ?';
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

//router to delete a dish by id
app.delete('/dish/:id', (req, res) => {
    const dishId = parseInt(req.params.id, 10); //validate the dish

    if (isNaN(dishId)) {
        return res.status(400).send({ error: 'ID invalide' });
    }

    const sql = 'DELETE FROM dish WHERE id = ?';
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

//Begin the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});