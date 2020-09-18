const Ajv = require('ajv');
const MyError = require('../../utils/error');
const jwt = require('jsonwebtoken');
const { customerSchemas } = require('../schemas/index');






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
    const {valid, validator} = validateSchema(req.body, customerSchemas.registration);

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
    const {valid, validator} = validateSchema(req.body, customerSchemas.login);

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
* Validate edit form
**********************************************************************************/
exports.isValidEditForm = (req, res, next) => {
  
  try {

    // Check valid or not
    const {valid, validator} = validateSchema(req.body, customerSchemas.editProfile);

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
* Validate Item (for creating)
**********************************************************************************/
exports.isValidItem = (req, res, next) => {
  
  try {

    // Check valid or not
    const {valid, validator} = validateSchema(req.body, customerSchemas.item);

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
* Validate Item (for editing)
**********************************************************************************/
exports.isValidEditItem = (req, res, next) => {
  
  try {

    // Check valid or not
    const {valid, validator} = validateSchema(req.body, customerSchemas.editItem);

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
* Validate Item (for editing)
**********************************************************************************/
exports.isValidOrderShipping = (req, res, next) => {
  
  try {

    // Check valid or not
    const {valid, validator} = validateSchema(req.body, customerSchemas.orderShipping);

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