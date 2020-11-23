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

// configure passport authnetication with function imported from configurationfile 
configurePassport(passport); 

// boilerplate middleware for passport 
app.use(express.urlencoded({extended: false})); 
app.use(session({
    secret: "cats",
    resave: false, 
    saveUninitialized: false
})); 
app.use(passport.initialize());
app.use(passport.session());

// Parse json requests as json 
app.use(express.json());

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// route hander for registering the user and saving user's info to the database 

app.post('/register', authenticationController.checkNotAuthenticated, async (req, res) => {
    try{
        // use bcrypt to hash the password provided in the body of the post request 
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);

        // SQL query to insert new row into the database with user's information, including hashed password  

        // redirect user login after sucessful registration 

        res.redirect('/login'); 
    }
    // if any errors occur send the user back to registration page 
    catch {
        res.redirect('/register'); 
    }
}); 


// route handler to send risk assessment results back to client
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
