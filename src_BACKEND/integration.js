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
      alert("Invalid email, try register again (e.g., email@like.this).");
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
      } else {
        const errorResult = await response.json();
        console.error(errorResult.message);
        alert("Error: " + errorResult.message);
      }
    } catch (error) {
      alert("Error:", error);
    }
  } else {
    alert("Fill out all the fields, try register again.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loadUsersButton = document.createElement("button");
  loadUsersButton.textContent = "Load Users";
  loadUsersButton.onclick = getAllUsers;

  const userListContainer = document.createElement("div");
  userListContainer.id = "userList";

  document.body.appendChild(loadUsersButton);
  document.body.appendChild(userListContainer);
});

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
      alert("All users are about to be displayed.");

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
        updateButton.style.marginLeft = "10px";
        updateButton.onclick = () => updateUser(user._id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = () => deleteUser(user._id);

        userItem.appendChild(updateButton);
        userItem.appendChild(deleteButton);

        userList.appendChild(userItem);
      });

      userListContainer.appendChild(userList);
    } else {
      const errorResult = await response.json();
      console.error(errorResult.message);
      alert("Error fetching users: " + errorResult.message);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    alert("An error occurred while fetching users.");
  }
}

async function updateUser(userId) {
  const newUserName = prompt("Enter new username:");
  const newPassWord = prompt("Enter new password:");
  const newEmail = prompt("Enter new email:");

  if (newEmail && !validator.isEmail(newEmail)) {
    alert("Invalid email format. Please try again.");
    return;
  }

  const updatedData = {
    userNameField: newUserName || undefined,
    passWordField: newPassWord || undefined,
    emailField: newEmail || undefined,
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
      alert("User updated successfully!");
      getAllUsers();
    } else {
      const errorResult = await response.json();
      console.error(errorResult.message);
      alert("Error updating user: " + errorResult.message);
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

async function deleteUser(userId) {
  if (!confirm("Are you sure you want to delete this user?")) return;

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
      alert("User deleted successfully!");
      getAllUsers();
    } else {
      const errorResult = await response.json();
      console.error(errorResult.message);
      alert("Error deleting user: " + errorResult.message);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
async function loginUser(event) {
  event.preventDefault(); 

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
    
      document.getElementById("logoutSection").style.display = "block";
      document.getElementById("loginSection").style.display = "none";

      alert("Login successful!");
    } else {
      const errorData = await response.json();
      alert("Error: " + errorData.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  }
}

function logoutUser() {
  localStorage.removeItem("token");

  document.getElementById("logoutSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";

  alert("You have been logged out.");
}

async function fetchSecretData() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/secret", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Error fetching secret data: ${errorData.message}`);
      return;
    }

    const data = await response.json();
    console.log("Secret data received:", data);

    const secretDataContainer = document.getElementById("secretDataContainer");
    secretDataContainer.textContent = data.message;
  } catch (error) {
    console.error("Error fetching secret data:", error);
    alert("An error occurred while fetching secret data. Please try again.");
  }
}

document.getElementById("loginButton").addEventListener("click", loginUser);
document.getElementById("logoutButton").addEventListener("click", logoutUser);
document.getElementById("getSecretData").addEventListener("click", fetchSecretData);
