const LocalStrategy = require('passport-local').Strategy; 
const bcrypt = require('bcrypt'); 
const sqlController = require('./sqlController.js');

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

// enclose all passport configuration logic inside outer function

function configurePassport(passport) {
  // function to make SQL query and compare found user's hashed password with hash password provided by user at login

  async function authenticate(username, password, done) {
    // SQL query to get a single user from the database that matches the username attribute passed in as an argument under the hood by passport

    let user; // variable to which the resuls of SQL query will be saved

    // control flow to process resposne from SQL query

        const findUserString = `SELECT * FROM users WHERE username = ${username}`

        const user = db.query(findUserString);// variable to which the resuls of SQL query will be saved 

    if (user == null) {
      // do not return a user

      return done(null, false);
    }

    // if a user is found in the database

    try {
      // compare the the hash of the returned user's password to the hash of the password provided by the user at login

      // if it matches return the result of the database query

      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }

      //if it does not match do not return the result of the query
      else {
        return done(null, false);
      }
    } catch (error) {
      // if bycrypt returns an error

      // return the error

      return done(error);
    }
  }

  // function with SQL query to find the user in the database from the user's id

  function getUserByID(id) {
    // SQL query to get user from the database using id

        // SQL query to get user from the database using id 
        const getUserString = `SELECT * FROM users WHERE ${id} = _id`

        const user = db.query(getUserString); // constant to which the result of the SQL query will be assigned 

        // return the user 
        return user
    }  

  passport.use(new LocalStrategy(authenticate));

  // serialize user id for cookie placed on the browers

  passport.serializeUser((user, done) => done(null, user.id));

  // deserialize user id from the cookie and use the deserialized id to find the user using the getUserById function

  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = configurePassport;
