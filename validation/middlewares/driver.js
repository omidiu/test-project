const Ajv = require('ajv');
const MyError = require('../../utils/error');
const jwt = require('jsonwebtoken');
const { driverSchemas } = require('../schemas/index');





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
    const {valid, validator} = validateSchema(req.body, driverSchemas.registration);

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
    const {valid, validator} = validateSchema(req.body, driverSchemas.login);

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