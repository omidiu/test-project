function Error(status, message, stack, obj) {
  this.status = status;
  this.message = message;
  this.stack = stack;
  this.obj = obj;
}



module.exports = Error;