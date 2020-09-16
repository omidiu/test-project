const Ajv = require('ajv');
const MyError = require('../../lib/error');
const jwt = require('jsonwebtoken');
const { generalSchemas } = require('../schemas/index');





const validateSchema = (data, schema) => {
  // Get instance of ajv
  const ajv = new Ajv({ allErrors: true });

  // Create validator (use schema also )
  const validator = ajv.compile(schema);

  // Check is valid or not
  const valid = validator(data);

  return {valid, validator};
}


/*********************************************************************************
* Validate register form
**********************************************************************************/
exports.isValidRegisterForm = (req, res, next) => {

  try {

    // Check valid or not
    const {valid, validator} = validateSchema(req.body, generalSchemas.registration);

    if (!valid) {
      throw new MyError(400, "Bad request", new Error().stack, {
        error: validator.errors
      });
    }

    // validation form is valid
    next();

  } catch (err) {
    next(err);
  } 
    
}

/*********************************************************************************
* Validate login form
**********************************************************************************/
exports.isValidloginForm = (req, res, next) => {
  
  try {

    // Check valid or not
    const {valid, validator} = validateSchema(req.body, generalSchemas.login);

    if (!valid) {
      throw new MyError(400, "Bad request", new Error().stack, {
        error: validator.errors
      });
    }

    // validation form is valid
    next();

  } catch (err) {
    next(err);
  } 
    
}

/*********************************************************************************
* Validate token
**********************************************************************************/
exports.authenticateToken = async (req, res, next) => {

  try {
      // Get token
    const token = decodeURIComponent(req.headers.authorization).replace(/^Bearer /, '');


    // If token not set
    if (!token)
      throw new MyError(400, "Bad request", new Error().stack, {
        message: 'Token is not set'
      });


    // Check token is valid
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        throw new MyError(400, "Bad request", new Error().stack, {
          message: 'Token has exiperd or not valid'
        });
      }

      // Token has no problem
      // Set req.user
      req.user = user;
      // Give controll to next middleware
      next();
    });
  } catch (err) {
    next(err);
  }
  
}