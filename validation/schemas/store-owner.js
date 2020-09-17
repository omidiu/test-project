const registration = {
  "title": "User",
  "description": "Registration form validation for creating account",
  "type": "object",
  "properties": {
    "name": { "type": "string", "maxLength": 50 },
    "phoneNumber": { "type": "string", "pattern": "^[0-9()\-\.\s]+$", "maxLength": 20 },
    "username": { "type": "string", "maxLength": 20 },
    // Atleast 1 letter, 1 number, 1 special character min 8 characters, max 20 characters for password
    // "pattern": "/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}/"    inside password section
    "password": { "type": "string", "maxLength": 40 }
  },
  

  "required": ["name", "phoneNumber", "password"]
}


const login = {
  "title": "User",
  "description": "login form validation for login",
  "type": "object",
  "properties": {
    "username": { "type": "string", "maxLength": 20 },
    // Atleast 1 letter, 1 number, 1 special character min 8 characters, max 20 characters for password
    // "pattern": "/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}/"    inside password section
    "password": { "type": "string", "maxLength": 40 }
  },
  

  "required": ["username", "password"]
}


const store = {
  "title": "store",
  "description": "create store form validation",
  "type": "object",
  "properties": {
    "name": { "type": "string", "maxLength": 50 },
    "address": { "type": "string", "maxLength": 100 },
    "lat": { "type": "integer", "minimum": -90,  "maximum": 90},
    "long": { "type": "integer", "minimum": -180, "maximum": 180 }
  },
  

  "required": ["name", "address", "lat", "long"]
}



const product = {
  "title": "product",
  "description": "Product information",
  "type": "object",
  "properties": {
    "name": { "type": "string", "maxLength": 50 },
    "price": { "type": "integer", "minimum": 0},
    "quantity": { "type": "integer", "minimum": 0 }
  },
  

  "required": ["name", "price", "quantity"]
}




module.exports = {
  registration,
  login,
  store,
  product
}


