const authenticationController = {};

// middleware function to check if user is logged in 
authenticationController.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()){
  return next();
    }
}
// middleware function to check if user is not logged in 
authenticationController.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        // redirect to wherever a logged in user should go 
        // res.redirect('/')
    }
    return next(); 
}

module.exports = authenticationController;