require('dotenv').config();
console.log(process.env);

const express = require('express')
const mysql = require('mysql2');
const app = express()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database');
});

app.get('/', (req, res) => {
  res.send('Welcome to the Hospital API!');
});
  
  // Question 1
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error retrieving patients:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
  });
});

// Question 2
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_speciality FROM providers';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error retrieving providers:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
  });
});

// Question 3
app.get('/patients/filter', (req, res) => {
  const { first_name } = req.query;
  const query = 'SELECT * FROM patients WHERE first_name = ?';
  db.query(query, [first_name], (err, results) => {
      if (err) {
          console.error('Error retrieving patients:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
  });
});

// Question 4
app.get('/providers/filter', (req, res) => {
  const { specialty } = req.query;
  const query = 'SELECT * FROM providers WHERE provider_speciality = ?';
  db.query(query, [specialty], (err, results) => {
      if (err) {
          console.error('Error retrieving providers:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
  });
});


const PORT = 3000
app.listen(PORT, () => {
    console.log(`server is runnig on http://localhost:${PORT}`)
})