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
//---------------------------------------------------------------------

const sqlController = {};

sqlController.insertUser = async (req, res, next) => {
  const pwd = res.locals.encryptedPwd;
  const {username, email, first_name, last_name} = req.body

 // check if the user currently exists
 // if so, redirect to signup
 const findUserString = `SELECT * FROM users WHERE username = ${username}`
 const user = await db.query(findUserString)
 if (user) return res.redirect('/signup')

 // constructs db query for creating a new user
 const insertUserString = `INSERT INTO users(_id, username, password, email, first_name, last_name) ` +
 `values(default, ${username}, ${pwd}, ${email}, ${first_name}, ${last_name})`

  //creates new user in the database
  db.query(insertUserString)
  
  return next();
}

sqlController.findUser = (req, res, next) => {
    const {username} = req.body

    const findUserString = `SELECT * FROM users WHERE username = ${username}`

    const user = db.query(findUserString)
    res.locals.user = user
    
    return next();
}

sqlController.deleteUser = (req, res, next) => {
    const {username} = req.body

    const deleteUserString = `DELETE FROM users WHERE username = ${username}`

    db.query(deleteUserString)

    return next();
}

sqlController.logAssessment = (req, res, next) => {
  const { activities } = req.body

  // [mail, groceries] >> 'mail, groceries' >> true, true

  const activitesString = activities.join(', ')
  const activitiesValues = activities.map(activity => true).join(', ')

  // create a session 
  const createSessionString = `INSERT INTO assessments(_id, ${  activitesString 
  }) values(default, ${  activitiesValues  })`

  db.query(createSessionString)


}

sqlController.findAllAssements = (req, res, next) => {

    return next();
}

sqlController.findOneAssessment = (req, res, next) => {

    return next();
}

sqlController.getUserLocation = (req, res, next) => {

    return next();
}

sqlController.getPositiveRate = (req, res, next) => {

    return next();
}

module.exports = sqlController;