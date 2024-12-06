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
      console.log("Invalid email, try register again (e.g., hej@jensen.se).");
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
        userNameField.value = "";
        passWordField.value = "";
        emailField.value = "";
        getAllUsers();
      } else {
        const errorResult = await response.json();
        console.error(errorResult.message);
        alert("Error: " + errorResult.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    console.log("Fill out all the fields, try register again.");
  }
}

async function getAllUsers() {
  try {
    const response = await fetch("http://localhost:5000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const users = await response.json();
      console.log(users);

      const userListContainer = document.getElementById("userList");
      userListContainer.innerHTML = ""; 
      if (users.length === 0) {
        userListContainer.innerHTML = "<p>No users found.</p>";
        return;
      }

      const userList = document.createElement("ul");
      users.forEach((user) => {
        const userItem = document.createElement("li");
        userItem.textContent = `Username: ${user.userNameField}, Password: ${user.passWordField}, Email: ${user.emailField}`;

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.onclick = () => updateUser(user._id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteUser(user._id);

        userItem.appendChild(updateButton);
        userItem.appendChild(deleteButton);

        userList.appendChild(userItem);
      });

      userListContainer.appendChild(userList);
    } else {
      const errorResult = await response.json();
      console.error(errorResult.message);
      alert("Error: " + errorResult.message);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

async function updateUser(userId) {
  const newUserName = prompt("Enter new username:");
  const newPassWord = prompt("Enter new password:");
  const newEmail = prompt("Enter new email:");

  const updatedData = {
    userNameField: newUserName,
    passWordField: newPassWord,
    emailField: newEmail,
  };

  try {
    const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.message);
      getAllUsers();
    } else {
      const errorResult = await response.json();
      console.error(errorResult.message);
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

async function deleteUser(userId) {
  const confirmDelete = confirm("Are you sure you want to delete this user?");

  if (confirmDelete) {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        getAllUsers();
      } else {
        const errorResult = await response.json();
        console.error(errorResult.message);
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getAllUsers();
});
