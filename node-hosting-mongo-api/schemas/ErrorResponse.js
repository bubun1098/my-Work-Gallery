class ErrorResponse {
  constructor(statusCode, message, data = null) {
    statusCode = this.statusCode;
    message = this.message;
    data = this.data;
  }
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}
module.exports = {
  ErrorResponse,
};
