import User from '../models/user.js';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'arbaz',
};

passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        console.log("JWT Payload:", jwt_payload); // Log the payload
        User.findById(jwt_payload._id) // Make sure the ID field is correct in the payload
            .then((user) => {
                if (user) {
                    console.log("User found:", user); // Log the found user
                    return done(null, user);
                }
                console.log("User not found"); // Log if the user is not found
                return done(null, false);
            })
            .catch((err) => {
                console.error("Error:", err); // Log any error
                return done(err, false);
            });
    })
);

export default passport;
