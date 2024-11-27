document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    const userData = {
      username: username,
      email: email,
      password: password,
    };

    fetch("http://localhost:3000/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User added!");
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
          document.getElementById("email").value = "";

          alert("User added!");
        } else {
          console.error("Adding user failed.");
        }
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  });
