import passport from "passport";
import jwt from "passport-jwt";
import GithubStrategy from "passport-github2";
import { userModel } from "../dao/models/user.js";

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use(
        "jwt",
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
                secretOrKey: "userKey",
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload);
                } catch (error) {
                    return done(err);
                }
            }
        )
    );

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.05da471c6caa2bca',
        clientSecret: 'a259654276321c7afe9de96c3704114b86f7e5d6',
        callbackURL: 'http://localhost:5000/api/session/githubcallback'
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log(profile)
        try {
            let user = await userModel.findOne({email: profile._json.email})
            console.log(profile._json.email);
            if (!user) {
                let newUser = {
                    first_name: profile.username,
                    last_name: profile.username,
                    roll: 'user',
                    email: profile._json.email,
                    password: ''
                }
                let result= await userModel.create(newUser)
                return done(null, result)
            }
            
            return done(null, newUser)
        } catch (error) {
            return done(`Error ${err.message}`)
        }
    }))

};

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["tokenCookie"];
    }
    return token;
};

export default initializePassport;