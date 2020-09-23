require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;


const { customerService, driverService, storeOwnerService, adminService } = require('../services/index');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET
}

passport.use('customer', new JwtStrategy(options, async (payload, done) => {
    try {
        if (payload.role !== "customer" ){
            return done(null, false); 
        }
        console.log(payload);
        const customer = await customerService.findById(payload._id);
        done(null, customer._id);
    } catch (err) {
        done(err, false);
    }
}));

passport.use('driver', new JwtStrategy(options, async (payload, done) => {
    try {
        if (payload.role !== "driver" ){
            return done(null, false); 
        }
        const driver = await driverService.findById(payload._id);
        done(null, driver.id);
    } catch (err) {
        done(err, false);
    }
    
}));

passport.use('storeOwner', new JwtStrategy(options, async (payload, done) => {
    try {
        if (payload.role !== "storeOwner" ){
            return done(null, false); 
        }

        const storeOwner = await storeOwnerService.findById(payload._id);
        if(!storeOwner)
            return done(null, false); 
        
        done(null, storeOwner._id);
    } catch (err) {
        done(err, false);
    }
    
}));


passport.use('admin', new JwtStrategy(options, async (payload, done) => {
    try {
        if (payload.role !== "admin" ){
            return done(null, false); 
        }

        const admin = await adminService.findById(payload._id);
        done(null, admin.id);
    } catch (err) {
        done(err, false);
    }
    
}));



module.exports = passport;