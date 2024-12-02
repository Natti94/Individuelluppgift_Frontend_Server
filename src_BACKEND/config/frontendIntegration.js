const validator = require('validator')

async function registerUser() {
  var userNameField = document.getElementById("username");
  var passWordField = document.getElementById("password");
  var emailField = document.getElementById("email");

  if (
    userNameField.value !== "" &&
    passWordField.value !== "" &&
    emailField.value !== ""
  ) {
    let userData = {
      userNameField: userNameField.value,
      passWordField: passWordField.value,
      emailField: emailField.value,
    };

    try {
      let response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        let result = await response.json();
        console.log(result.message);
        alert("User registered successfully!");

        userNameField.value = "";
        passWordField.value = "";
        emailField.value = "";
      } else {
        let errorResult = await response.json();
        console.error(errorResult.message);
        alert("Error: " + errorResult.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register user, try again.");
    }
  }
}
