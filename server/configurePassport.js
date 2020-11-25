const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const sqlController = require('./sqlController.js');

const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    'postgres://oebljrrf:s6TaaMbtHrgeJ8sWqHmpkdd1kJjbg2N5@suleiman.db.elephantsql.com:5432/oebljrrf',
});

const db = {
  async query(text, params, callback) {
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

    // control flow to process resposne from SQL query

    const findUserString = `SELECT username, password, _id FROM users WHERE username = '${username}'`;

    const queryResult = await db.query(findUserString); // variable to which the resuls of SQL query will be saved
    const user = queryResult.rows[0];

    console.log('inside authenticate, user is', user);
    const usrName = queryResult.rows[0].username;
    const pswd = queryResult.rows[0].password;
    const usrId = queryResult.rows[0]._id;

    console.log(
      'username is:',
      usrName,
      'password is: ',
      password,
      'id is: ',
      usrId
    );

    if (user == null) {
      // do not return a user

      return done(null, false);
    }
    //
    // if a user is found in the database
    //
    try {
      //       // compare the the hash of the returned user's password to the hash of the password provided by the user at login
      //
      //       // if it matches return the result of the database query
      //
      if (await bcrypt.compare(password, pswd)) {
        return done(null, user); // does passport expect a "user" here to use it later on?
      }
      //
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

  async function getUserByID(id) {
    // SQL query to get user from the database using id
    console.log('you have entered getUserByID');
    // SQL query to get user from the database using id
    const getUserString = `SELECT username, password, _id FROM users WHERE '${id}' = _id`;

    const queryResult = await db.query(getUserString); // constant to which the result of the SQL query will be assigned
    const user = queryResult.rows[0];
    // user.rows[0]._id
    // return the user
    console.log('leaving get user by id, user is ', user);
    return user;
  }

  passport.use(new LocalStrategy(authenticate));

  // serialize user id for cookie placed on the browers

  passport.serializeUser((user, done) => done(null, user._id));

  // deserialize user id from the cookie and use the deserialized id to find the user using the getUserById function

  passport.deserializeUser((id, done) => {
    console.log('inside deserialize');
    return done(null, getUserByID(id));
  });
}

module.exports = configurePassport;
