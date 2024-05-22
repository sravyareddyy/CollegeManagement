const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'studentinfo'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

db.on('error', (err) => {
  console.error('MySQL database error:', err);
});
app.post('/signup',(req,res)=>{

  const sql="INSERT INTO users(`username`,`password`,`emailid`,`phoneno`,`isactive`,`salary`,`roleid`) VALUES (?)";
  const values = [req.body.username, req.body.password, req.body.emailid, req.body.phoneno, req.body.isactive, req.body.salary, req.body.roleid];
  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error inserting users data:', err);
      return res.status(500).json({ error: 'An error occurred while inserting users data into the database' });
    }
    console.log('User data inserted successfully');
    res.status(201).json(result);
  });
});
app.post('/', (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  const values = [username, password];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'An error occurred while logging in' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }
    res.status(200).json({ message: 'Login successful' });
  });
});
app.post('/forgot', (req, res) => {
  const { username, newpassword } = req.body;
  const checkUserQuery = `SELECT * FROM users WHERE username = ?`;
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      res.status(500).send('Internal server error');
    } else {
      if (results.length > 0) {
        // Update the password for the user
        const updatePasswordQuery = `UPDATE users SET password = ? WHERE username = ?`;
        db.query(updatePasswordQuery, [newpassword, username], (err, updateResults) => {
          if (err) {
            console.error('Error updating password:', err);
            res.status(500).send('Internal server error');
          } else {
            console.log(`Password updated successfully for username: ${username}`);
            res.status(200).send('Password updated successfully');
          }
        });
      } else {
        res.status(404).send('Username not found');
      }
    }
  });
});

app.get('/student', (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data from the database' });
      return;
    }
    res.json(data);
  });
});

app.post('/create', (req, res) => {
  const sql = "INSERT INTO students(`studname`, `email`) VALUES (?, ?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting student data:', err);
      return res.status(500).json({ error: 'An error occurred while inserting student data into the database' });
    }
    console.log('Student data inserted successfully');
    res.status(201).json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});