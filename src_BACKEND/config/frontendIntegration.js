async function registerUser() {
    var userNameField = document.getElementById('username');
    var passWordField = document.getElementById('password');
    var emailField = document.getElementById('email');

    if (userNameField.value !== "" && passWordField.value !== "" && emailField.value !== "") {
        // Prepare user data
        let userData = {
            userNameField: userNameField.value,
            passWordField: passWordField.value,
            emailField: emailField.value
        };

        try {
            // Send the data to the backend server
            let response = await fetch('http://localhost:5000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            // Handle the response
            if (response.ok) {
                let result = await response.json();
                console.log(result.message);
                alert('User registered successfully!');

                // Clear input fields
                userNameField.value = "";
                passWordField.value = "";
                emailField.value = "";
            } else {
                let errorResult = await response.json();
                console.error(errorResult.message);
                alert('Error: ' + errorResult.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to register user. Please try again later.');
        }
    }
}
