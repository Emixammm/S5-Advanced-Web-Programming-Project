const mysql = require('mysql2');

// Création de la connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maxime8696++', // Remplacez par votre mot de passe MySQL
    database: 'restaurant_db' // Remplacez par votre base de données
});

// Fonction pour afficher les tables existantes
function displayTables() {
    db.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
            return;
        }
        console.log('Connecté à la base de données.');

        // Exécute la requête pour récupérer les tables
        const query = 'SHOW TABLES';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des tables :', err);
                return;
            }

            console.log('Tables existantes dans la base de données :');
            results.forEach((row, index) => {
                const tableName = row[Object.keys(row)[0]]; // Extrait le nom de la table
                console.log(`${index + 1}. ${tableName}`);
            });

            // Fermer la connexion après l'affichage
            db.end((err) => {
                if (err) {
                    console.error('Erreur lors de la fermeture de la connexion :', err);
                } else {
                    console.log('Connexion fermée.');
                }
            });
        });
    });
}

// Appeler la fonction pour afficher les tables
displayTables();
