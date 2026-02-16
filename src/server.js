const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path'); // Pfad-Modul importieren

// Pfad zur .env Datei explizit angeben (eine Ebene höher)
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(express.json());
app.use(cors());

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD geladen:", process.env.DB_PASSWORD ? "JA" : "NEIN (undefined)");

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

app.get('/api/transactions', async (req, res) => {
    try {
        const sql = `
            SELECT t.*, u.userLogin 
            FROM transaction t 
            JOIN "user" u ON t.userId = u.id 
            ORDER BY t.transactionDate DESC`;
        const result = await pool.query(sql);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/transactions', async (req, res) => {
    const { userId, sourceAmount, sourceCurrency, targetCurrency, exchangeRate } = req.body;
    try {
        const sql = 'INSERT INTO transaction (userId, sourceAmount, sourceCurrency, targetCurrency, exchangeRate) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [userId, sourceAmount, sourceCurrency, targetCurrency, exchangeRate];
        const result = await pool.query(sql, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT id, firstName, lastName, userLogin FROM "user" WHERE userLogin = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Hier ist die wichtige 'id' enthalten
        } else {
            res.status(401).send("Login fehlgeschlagen");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));