require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const dotenv = require('dotenv');
const authctrl = require('./controllers/authController');


const PORT = 4000 || 4000;

const { SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());



massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  }).then(db => {
    app.set('db', db);
    console.log('db connected');
  });
  
  app.use(
    session({
      resave: true,
      saveUninitialized: false,
      secret: SESSION_SECRET,
    })
  );

//endpoints
app.post('/auth/register', authctrl.register);
//endpoints

app.listen(PORT, ()=>console.log(`All Good on port ${PORT}`))