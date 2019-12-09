var recoveryEmail, recoveryPassword;
if (process.env.NODE_ENV === "production") {
  recoveryEmail = process.env.RECOVERY_EMAIL;
  recoveryPassword = process.env.RECOVERY_PASSWORD;
} else {
  recoveryEmail = require("./config").gmail.email;
  recoveryPassword = require("./config").gmail.password;
}
module.exports = {
  gmail: {
    email: recoveryEmail,
    password: recoveryPassword
  }
};
