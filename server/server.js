// imported modules
const express = require('express');
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcrypt'); 
const app = express();
const PORT = 3000;
const quizController = require('./quizController.js');
const authenticationController = require('./authenticationController.js'); 
const configurePassport = require('./configurePassport.js'); 
const sqlController = require('./sqlController.js'); 
const session = require('express-session');
const bodyParser = require('body-parser')
// establish connection to database 

const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    'postgres://oebljrrf:s6TaaMbtHrgeJ8sWqHmpkdd1kJjbg2N5@suleiman.db.elephantsql.com:5432/oebljrrf',
});

const db = {
  async query (text, params, callback) {
    console.log('executed query', text);
    const data = await pool.query(text, params, callback);
    return data;
  },
};

app.use(express.json());
app.use(express.urlencoded({extended: false})); 
// app.use(express.raw())

configurePassport(passport); 

app.use(session({
    secret: "cats",
    resave: false, 
    saveUninitialized: false
})); 

app.use(passport.initialize());
app.use(passport.session());



// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// route hander for registering the user and saving user's info to the database

app.post('/register', authenticationController.checkNotAuthenticated,authenticationController.encryptAndSave, sqlController.insertUser, async (req, res) => {
    try{
        
        // redirect user login after sucessful registration 

      res.redirect('/login');
    } catch {
      // if any errors occur send the user back to registration page
      res.redirect('/register');
    }
  }
);

// route handler to send risk assessment results back to client
// index.html includes react router that routes everything
app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// route handlers:
//  will receive the Submit event from the frontend when user completes the quiz
//  and send assessment result back to frontend:
app.post('/', quizController.calculateRisk, (req, res) => {
  res
    .status(200)
    // .redirect('/results');
    .send(res.locals);
});

// serve index.html on all the pages
// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

//listen
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = app;
