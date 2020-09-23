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
  

  "required": ["name", "phoneNumber", "username", "password"]
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



const editStatus = {
  "title": "Status",
  "description": "Status validation (It's an enum)",
  "type": "object",
  "properties": {
    "status": { "enum": ['onWay', 'done', 'reject'] }
  },
  

  "required": ["status"]
}




module.exports = {
  registration,
  login,
  editStatus
}


