// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import User from "../models/User.js";
// import { ENV } from "./env.js";

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: ENV.GOOGLE_CLIENT_ID,
//       clientSecret: ENV.GOOGLE_CLIENT_SECRET,
//       callbackURL: (ENV.CLIENT_URL + "/auth/google/callback"),
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {

//         let existingUser = await User.findOne({ googleId: profile.id });
//         if (!existingUser) {
//           existingUser = await User.create({
//             fullName: profile.displayName,
//             email: profile.emails[0].value,
//             googleId: profile.id,
//             profilePic: profile.photos[0].value,
//           });
//         }
//         done(null, existingUser);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );