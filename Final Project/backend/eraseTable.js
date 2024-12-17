const mysql = require('mysql2');
// Connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'restaurant_db'
});
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données.');
});
// Fonction pour supprimer une table
function dropTable(tableName) {
    const sql = `DROP TABLE IF EXISTS ${tableName}`; // Supprime la table si elle existe
    db.query(sql, (err, result) => {
        if (err) {
            console.error(`Erreur lors de la suppression de la table ${tableName}:`, err);
            return;
        }
        console.log(`Table ${tableName} supprimée avec succès.`);
    });
}
// Appel de la fonction pour supprimer une table
dropTable('Waiter'); // Remplacez 'Dish' par le nom de votre table
dropTable('DishList');
dropTable('Dish');
dropTable('Manager');
dropTable('Customer');
// Fermeture de la connexion
db.end((err) => {
    if (err) {
        console.error('Erreur lors de la fermeture de la connexion:', err);
    } else {
        console.log('Connexion fermée.');
    }
});