// import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import Users from '../models/Users';

 const passportConfig = (passport) => {
    
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            session: false
        }, 
        (username, password, done) => {
            const user = Users.find((user) => user.username === username);

            if(!user) {
                console.log('Inncorect username'); 
                return done(null, false); 
            }

            if(user.password !== password){
                console.log('Inncorect password');
                return done(null, false);
            }
        
            done(null, user);
        
        }  
    ))
}

export default passportConfig;