async function registerUser(event) {
  event.preventDefault();

  const userNameField = document.getElementById("username");
  const passWordField = document.getElementById("password");
  const emailField = document.getElementById("email");

  if (
    userNameField.value !== "" &&
    passWordField.value !== "" &&
    emailField.value !== ""
  ) {
    if (!validator.isEmail(emailField.value)) {
      alert("Invalid email, try register again (e.g., hej@jensen.se).");
      return;
    }

    const userData = {
      userNameField: userNameField.value,
      passWordField: passWordField.value,
      emailField: emailField.value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        alert("User registered successfully!");
        userNameField.value = "";
        passWordField.value = "";
        emailField.value = "";
      } else {
        const errorResult = await response.json();
        console.error(errorResult.message);
        alert("Error: " + errorResult.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register user, try again.");
    }
  } else {
    alert("Fill out all the fields, try register again.");
  }
}
