require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;


const { customerService, driverService, storeOwnerService } = require('../services/index');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET
}

passport.use('customer', new JwtStrategy(options, async (payload, done) => {
    try {
        const customer = await customerService.findById(payload._id);
        done(null, customer.id);
    } catch (err) {
        done(err, false);
    }
}));

passport.use('driver', new JwtStrategy(options, async (payload, done) => {
    try {
        const driver = await driverService.findById(payload._id);
        done(null, driver.id);
    } catch (err) {
        done(err, false);
    }
    
}));

passport.use('storeOwner', new JwtStrategy(options, async (payload, done) => {
    try {
        const storeOwner = await storeOwnerService.findById(payload._id);
        done(null, storeOwner.id);
    } catch (err) {
        done(err, false);
    }
    
}));


module.exports = passport;