const bcrypt = require('bcrypt');
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
//---------------------------------------------------------------------

const sqlController = {};

sqlController.insertUser = async (req, res, next) => {
  console.log('inside insertUser!');
  const pwd = res.locals.encryptedPwd;
  const { username, email, first_name, last_name } = req.body;

  // check if the user currently exists
  // if so, redirect to signup
  //  const findUserString = `SELECT * FROM users WHERE username = ${username}`
  //  const user = await db.query(findUserString)
  //  if (user) return res.redirect('/signup')

  // constructs db query for creating a new user
  const insertUserString = `INSERT INTO users(_id, username, password, email, first_name, last_name) Values(default, '${username}', '${pwd}', '${email}', '${first_name}', '${last_name}')`;

  //creates new user in the database
  db.query(insertUserString).catch(() => res.redirect('/register'));
};

// sqlController.findUser = (req, res, next) => {
//   const { username, password } = req.body;

//   const findUserString = `SELECT username, password FROM users WHERE username = ${username}`;

//   const user = db.query(findUserString);
//   if (bcrypt.compare(password, user.password)) {
//     return next();
//   }
//   return res.redirect('/logIn');

//   // res.locals.user = user;
// };

sqlController.deleteUser = (req, res, next) => {
  const { username } = req.body;

  const deleteUserString = `DELETE FROM users WHERE username = ${username}`;

  db.query(deleteUserString);

  return next();
};

sqlController.logAssessment = (req, res, next) => {
  // remember to acct for: location, positive rates, user_id
  const { activities, zipcode } = req.body;
  const today = new Date().toLocaleDateString();
  // [mail, groceries] >> 'mail, groceries' >> true, true

  const activitesString = activities.join(', ');
  const activitiesValues = activities.map((activity) => true).join(', ');

  // create a session
  const createSessionString = `INSERT INTO assessments(_id, ${activitesString}, ${today}, ${zipcode}, ${user_id}) values(default, ${activitiesValues}, date, zipcode, user_id)`; // remember to change pos_rate and loc_id

  db.query(createSessionString);
};

sqlController.findAllAssements = (req, res, next) => {
  const user_id = req.body; // unsure if this data will actually be in req.body

  const findAllString = `SELECT * FROM assessments WHERE user_id = ${user_id}`;

  const assessments = db.query(findAllString);

  res.locals.assessments = assessments;

  return next();
};

// middleware below is used to find the assessment of a guest user (meaning they are not signed in)
// does the guest assessment data even need to be in the database?
// or can we display the data we receive from their assessment directly after they click submit? (use prev functionality?)
// sqlController.findOneAssessment = (req, res, next) => {
//   const user_id = req.body // unsure if this data will actually be in req.body

//   const findOneString = `SELECT * FROM assessments WHERE user_id = guest ORDER BY date DESC LIMIT 1`

//   const assessment = db.query(findOneString)

//   res.locals.assessment = assessment

//   return next();
// }

// no need to record user location. user will input zipcode on assessment page
// sqlController.recordUserLocation = (req, res, next) => {

//     return next();
// }

// not needed bc the user can view the positive rate on the covid map
// sqlController.getPositiveRate = (req, res, next) => {

//     return next();
// }

module.exports = sqlController;
