function registerUser() {

    var userNameField = document.getElementById('username')
    var passWordField = document.getElementById('password')
    var emailField = document.getElementById('email')
    let userList = document.getElementById("userList");

    if (userNameField.value !== "" && passWordField.value !== "" && emailField.value !== "") {
        let userContainer = document.createElement("div");
        let displayName = document.createElement("input");
        displayName.value = userNameField.value;
        displayName.readOnly = true;
        let displayPassword = document.createElement("input");
        displayPassword.value = passWordField.value;
        displayPassword.readOnly = true;
        let displayEmail = document.createElement("input");
        displayEmail.value = emailField.value;
        displayEmail.readOnly = true;
        userContainer.appendChild(displayName);
        userContainer.appendChild(displayPassword);
        userContainer.appendChild(displayEmail);
        userList.appendChild(userContainer);
        userNameField.value = "";
        passWordField.value = "";
        emailField.value = "";
        return;
    }
};

function removeUsers() {

    let userList = document.getElementById("userList");
    if (userList) {
        userList.innerHTML = "";
    }
}
