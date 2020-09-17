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
  

  "required": ["name", "phoneNumber", "password", "username"]
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


const editProfile = {
  "title": "User",
  "description": "Edit form validation for edit account",
  "type": "object",
  "properties": {
    "name": { "type": "string", "maxLength": 50 },
    "username": { "type": "string", "maxLength": 20 },
  },
  

  "required": ["name", "username"]
}

const item  = {
  "title": "item",
  "description": "For creating item",
  "type": "object",
  "properties": {
    "productId": { "type": "string", "maxLength": 50 },
    "quantity": { "type": "integer", "minimum": 1 }
  },
  

  "required": ["productId", "quantity"]
}


const editItem  = {
  "title": "item",
  "description": "For edit item",
  "type": "object",
  "properties": {
    "quantity": { "type": "integer", "minimum": 1 }
  },
  

  "required": ["quantity"]
}




module.exports = {
  registration,
  login,
  editProfile,
  item,
  editItem
}


