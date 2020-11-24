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
const sqlController = require('./sqlController.js')


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

// app.use(
//   db.query('',(err) => {
//         if (err) {
//             console.log(err);
//         }
//     });
// );

// CREATE TABLE assessments(_id INT, mail VARCHAR(20), takeout VARCHAR(20), gas VARCHAR(20), tennis VARCHAR(20), camp VARCHAR(20), grocery VARCHAR(20), walk VARCHAR(20), restaurantOut VARCHAR(20), doctor VARCHAR(20), downtown VARCHAR(20), house VARCHAR(20), bbq VARCHAR(20), mall VARCHAR(20), kids VARCHAR(20), elderly VARCHAR(20), hair VARCHAR(20), restaurantIn VARCHAR(20), plane VARCHAR(20), wedding VARCHAR(20), hug VARCHAR(20), gym VARCHAR(20), movie VARCHAR(20), music VARCHAR(20), religious VARCHAR(20), bar VARCHAR(20), location_id INT, user_id INT, pos_rate FLOAT)



app.use(express.json());

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// route hander for registering the user and saving user's info to the database 

app.post('/register', authenticationController.checkNotAuthenticated,authenticationController.encryptAndSave, sqlController.insertUser, async (req, res) => {
    try{
        
        // redirect user login after sucessful registration 

        res.redirect('/login'); 
    }
    // if any errors occur send the user back to registration page 
    catch {
        res.redirect('/register'); 
    }
}); 

//m d  y
//11022020 date (varchar)
//5 score  (int)



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
