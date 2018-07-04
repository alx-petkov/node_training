import passport from 'passport';
import { LocalStrategy } from 'passport-local';
import Users from '../models/Users';

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'pass',
        session: false
    }, (username, password, done) => {
        const user = Users.find((user) =>
            (user.username === username && user.password === password)
        )

        console.log(user)
        if (user) {
            done(null, false, 'Incorrect username or password! Please try again!');
        } else {
            done(null, user);
        }
    }
    
))