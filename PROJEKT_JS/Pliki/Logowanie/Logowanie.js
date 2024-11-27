document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = {
      username: username,
      password: password,
    };

    fetch("http://localhost:3000/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Logged in!");
          alert("Logged in");
          window.location.href = "/Exercises.html";
        } else {
          response.text().then((errorMessage) => {
            console.error("Server Error:", errorMessage);
            alert("Server Error: " + errorMessage);
          });
        }
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  });
