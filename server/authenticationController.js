const bcrypt = require('bcrypt');

const authenticationController = {};

// middleware function to check if user is logged in 
authenticationController.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()){
  return next();
    }
}

// middleware function to check if user is not logged in 
authenticationController.checkNotAuthenticated = async (req, res, next) => {
    // use bcrypt to hash the password provided in the body of the post request 
    console.log('inside checkNotAuthenticated');
    if ( await req.isAuthenticated()){
        // redirect to wherever a logged in user should go 
        // res.redirect('/')
    }
    return next(); 
}
authenticationController.encryptAndSave = async (req, res, next) => {
    console.log('inside encryptAndSave');
    
    
    const salt = await bcrypt.genSalt(10)

    // use bcrypt to hash the password provided in the body of the post request 
        console.log('req.body includes', req.body); 
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);

        // SQL query to insert new row into the database with user's information, including hashed password  
        res.locals.encryptedPwd = encryptedPassword 
        next();
}

module.exports = authenticationController;