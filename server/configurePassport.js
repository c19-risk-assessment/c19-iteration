const LocalStrategy = require('passport-local').Strategy; 
const bcrypt = require('bcrypt'); 

// enclose all passport configuration logic inside outer function 

function configurePassport(passport){

    // function to make SQL query and compare found user's hashed password with hash password provided by user at login

    async function authenticate(username, password, done){

        // SQL query to get a single user from the database that matches the username attribute passed in as an argument under the hood by passport 

        let user;// variable to which the resuls of SQL query will be saved 

        // control flow to process resposne from SQL query 

        // if no user is found in the database 

        if (user == null){

            // do not return a user

            return done(null, false); 
        }

        // if a user is found in the database 

        try{

            // compare the the hash of the returned user's password to the hash of the password provided by the user at login 

            // if it matches return the result of the database query 

            if (await bcrypt.compare(password, user.password)) {
                return done(null, user); 
            }

            //if it does not match do not return the result of the query

            else{
                return done(null, false); 
            }
        }

        // if bycrypt returns an error

        catch(error){

            // return the error 

            return done(error); 
        }

    }

    // function with SQL query to find the user in the database from the user's id 

    function getUserByID(id){

        // SQL query to get user from the database using id 

        const user; // constant to which the result of the SQL query will be assigned 

        // return the user 
    }  

    // configure passport with the authenticate function

    passport.use(new LocalStrategy(authenticate));

    // serialize user id for cookie placed on the browers

    passport.serializeUser((user, done) => done(null, user.id));

    // deserialize user id from the cookie and use the deserialized id to find the user using the getUserById function

    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id)); 
    }); 

}
