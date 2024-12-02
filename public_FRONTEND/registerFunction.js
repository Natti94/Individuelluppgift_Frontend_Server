function registerUser() {
  var userNameField = document.getElementById("username");
  var passWordField = document.getElementById("password");
  var emailField = document.getElementById("email");

  if (
    userNameField.value !== "" &&
    passWordField.value !== "" &&
    emailField.value !== ""
  ) {
    if (!validator.isEmail(emailField.value)) {
      alert("Invalid email, try again (ex. natnael@jensen.se).");
      return;
    }

    userNameField.value = "";
    passWordField.value = "";
    emailField.value = "";

    return;
  } else {
    alert("Please fill out all the fields, try again.");
  }
}

