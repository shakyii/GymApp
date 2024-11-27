const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

app.use(
  session({
    secret: "sekretne_haslo",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gym_jsp",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected with MySQL database");
});

app.use(express.json());

// app.use(require("cookie-parser")());

app.post("/loginUser", (req, res) => {
  const userData = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  connection.query(
    query,
    [userData.username, userData.password],
    (err, result) => {
      if (err) {
        console.error("Error logging in", err);
        res.status(500).send("Error logging in");
        return;
      }

      if (result.length > 0) {
        const username = userData.username;
        req.session.user = { username };
        console.log("Logged");
        console.log(req.session.user);
        res.status(200).send("Logged successfully");
      } else {
        console.log("Login failed");
        res.status(401).send("Login failed. Check username and password.");
      }
    }
  );
});
/////////////////////////
app.post("/addUser", (req, res) => {
  const userData = req.body;

  const query =
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
  connection.query(
    query,
    [userData.username, userData.password, userData.email],
    (err, result) => {
      if (err) {
        console.error("Error adding user:", err);
        res.status(500).send("Error adding user");
        return;
      }
      console.log("User added to database");
      res.status(200).send("User added to database");
    }
  );
});

////////////////////////
// ...
app.get("/plans-html", (req, res) => {
  if (req.session.user !== "") {
    console.log(req.session.user);
    const query = "SELECT * FROM training_plans";
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error downloading data:", err);
        res.status(500).send("Error downloading data");
        return;
      }
      const plansHtml = `
      <html lang="en">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${results
                .map(
                  (plan) => `
                  <tr>
                    <td>${plan.name}</td>
                    <td>${plan.description}</td>    
                    <td style="text-align:center !important;"><button class="btn" onclick="openPlan(${plan.id})">Open</button></td>              
                  </tr>`
                )
                .join("")}
            </tbody>
          </table>
      </html>
    `;
      res.setHeader("Content-Type", "text/html");
      res.send(plansHtml);
    });
  } else {
    res.redirect("/Logowanie.html");
  }
});
app.get("/user-plans-html", (req, res) => {
  if (req.session.user !== "") {
    console.log(req.session.user);
    const query = "SELECT * FROM user_plans WHERE username=?";
    connection.query(query, [req.session.user.username], (err, results) => {
      if (err) {
        console.error("Error downloading data:", err);
        res.status(500).send("Error downloading data");
        return;
      }
      const plansHtml = `
      <html lang="en">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${results
                .map(
                  (plan) => `
                  <tr>
                    <td>${plan.name}</td>
                    <td>${plan.description}</td>    
                    <td><div style="display:flex; gap:50px;justify-content:center;"><button class="btn" onclick="openUserPlan(${plan.id})">Open</button><button class="del-btn" onclick="deletePlan(${plan.id})">Delete</button></div></td>              
                  </tr>`
                )
                .join("")}
            </tbody>
          </table>
      </html>
    `;
      res.setHeader("Content-Type", "text/html");
      res.send(plansHtml);
    });
  } else {
    res.redirect("/Logowanie.html");
  }
});
app.get("/plan-details/:id", (req, res) => {
  const planId = req.params.id;

  if (req.session.user !== "") {
    const query =
      "SELECT exercises.name AS exercise_name, exercises.main_muscle_group, exercises.side_muscle_group, exercises.difficulty ,training_plans.name AS plan_name, training_plans.description, training_plan_exercises.day, training_plan_exercises.exercise_order FROM exercises JOIN training_plan_exercises ON exercises.id = training_plan_exercises.exercise_id JOIN training_plans ON training_plan_exercises.plan_id = training_plans.id WHERE training_plans.id = ? ORDER BY FIELD(training_plan_exercises.day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), training_plan_exercises.exercise_order";
    connection.query(query, [planId], (err, results) => {
      if (err) {
        console.error("Error downloading data:", err);
        res.status(500).send("Error downloading data");
        return;
      }

      if (results.length === 0) {
        window.location.href = "/Plans.html";
        return;
      }
      const exercisesByDay = {};
      results.forEach((exercise) => {
        const {
          exercise_order,
          day,
          exercise_name,
          main_muscle_group,
          side_muscle_group,
          difficulty,
        } = exercise;
        if (!exercisesByDay[day]) {
          exercisesByDay[day] = [];
        }
        exercisesByDay[day].push({
          exercise_name,
          main_muscle_group,
          side_muscle_group,
          difficulty,
          exercise_order,
        });
      });
      const daysHtml = Object.keys(exercisesByDay)
        .map((day) => {
          const exercises = exercisesByDay[day];
          const exercisesHtml = exercises
            .map(
              (exercise) => `
          <tr>
            <td>${exercise.exercise_order}</td>
            <td>${exercise.exercise_name}</td>
            <td>${exercise.main_muscle_group}</td>
            <td>${exercise.side_muscle_group}</td>
            <td>${exercise.difficulty}</td>
          </tr>
        `
            )
            .join("");
          return `
          <div class="container">
            <h2>Dzień ${day}</h2>
            <table>
              <thead>
                <tr>
                  <th>Kolejność</th>
                  <th>Ćwiczenie</th>
                  <th>Główna grupa mięśniowa</th>
                  <th>Boczna grupa mięśniowa</th>
                  <th>Trudność</th>
                </tr>
              </thead>
              <tbody>
                ${exercisesHtml}
              </tbody>
            </table>
          </div>
        `;
        })
        .join("");

      const planDetailsHtml = `
        <html lang="en">
        <head>
        <style>
    body {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    .container {
      margin: 0 auto;
      max-width: 800px;
      padding: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td  {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    h1, h2, p {
      text-align: center;
    }
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: -20px;
    }
    .header-btn-box {
      display: flex;
      gap: 10px;
    }
    .btn {
      padding: 12px 24px;
      background-color: #3498db;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    #logoutButton {
      display: none;
      /* height: 30px; */
      padding: 12px 24px;
      background-color: green;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    #welcomeMessage {
      font-weight: bold;
      font-size: 48px;
    }
    .title {
      text-align: center;
      font-weight: bold !important;
      font-size: 48px;
    }
  </style>
        </head>
          <body>
          <div class="header">
      <p id="welcomeMessage"></p>
      <div class="header-btn-box">
        <button onclick="goToExercises()" class="btn">Exercises</button>
        <button onclick="goToPlans()" class="btn">Plans</button>
        <button onclick="logout()" id="logoutButton">Logout</button>
      </div>
    </div>
    <hr />
            <h1 class="title">Training Plan</h1>
            <h2>Name: ${results[0].plan_name}</h2>
            <p>Description: ${results[0].description}</p>
            ${daysHtml}
          </body>
          <script>
          document.addEventListener("DOMContentLoaded", function () {
            fetch("http://localhost:3000/checkLoginStatus", {
              method: "GET",
              credentials: "include",
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.loggedIn) {
                  document.getElementById("logoutButton").style.display =
                  "block";         
                } else {
                  window.location.href = "/Logowanie.html";
                }
              });
          });

          fetch("http://localhost:3000/getUsername", {
  method: "GET",
  credentials: "include",
})
  .then((response) => response.json())
  .then((userData) => {
    const welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.innerText = "Welcome, " + userData.username + "!";
  })
  .catch((error) => {
    console.error("Error downloading username:", error);
  });
  function goToExercises() {
    window.location.href = "/Exercises.html";
  }
  function goToPlans() {
    window.location.href = "/Plans.html";
  }
  function logout() {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Logged out!");
          window.location.href = "/Logowanie.html";
        } else {
          console.error("Error logging out!");
        }
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  }
        </script>
        </html>
      `;

      res.setHeader("Content-Type", "text/html");
      res.send(planDetailsHtml);
    });
  } else {
    res.redirect("/Logowanie.html");
  }
});

app.get("/uplan-details/:id", (req, res) => {
  const planId = req.params.id;

  if (req.session.user !== "") {
    const planQuery =
      "SELECT name AS plan_name, description FROM user_plans WHERE id = ?";
    connection.query(planQuery, [planId], (err, planResult) => {
      if (err) {
        console.error("Error downloading plan data:", err);
        res.status(500).send("Error downloading plan data");
        return;
      }

      if (planResult.length === 0) {
        // Brak danych o planie
        res.status(404).send("Plan details not found");
        return;
      }

      const planName = planResult[0].plan_name;
      const planDescription = planResult[0].description;

      const query =
        "SELECT exercise_name, main_muscle_group, side_muscle_group, difficulty, day, exercise_order, source_table FROM (SELECT 'user_plan_exercises' AS source_table, exercises.name AS exercise_name, exercises.main_muscle_group, exercises.side_muscle_group, exercises.difficulty, user_plan_exercises.day, user_plan_exercises.exercise_order FROM exercises JOIN user_plan_exercises ON exercises.id = user_plan_exercises.exercise_id WHERE user_plan_exercises.user_plan_id = ? UNION SELECT 'user_plan_user_exercises' AS source_table, user_exercises.name AS exercise_name, user_exercises.main_muscle_group, user_exercises.side_muscle_group, user_exercises.difficulty, user_plan_user_exercises.day, user_plan_user_exercises.exercise_order FROM user_exercises JOIN user_plan_user_exercises ON user_exercises.id = user_plan_user_exercises.user_exercise_id WHERE user_plan_user_exercises.user_plan_id = ?) AS combined ORDER BY FIELD(combined.day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), combined.exercise_order;";
      connection.query(query, [planId, planId], (err, results) => {
        if (err) {
          console.error("Error downloading data:", err);
          res.status(500).send("Error downloading data");
          return;
        }

        const exercisesByDay = {};
        results.forEach((exercise) => {
          const {
            source_table,
            exercise_order,
            day,
            exercise_name,
            main_muscle_group,
            side_muscle_group,
            difficulty,
          } = exercise;
          if (!exercisesByDay[day]) {
            exercisesByDay[day] = [];
          }
          exercisesByDay[day].push({
            exercise_name,
            main_muscle_group,
            side_muscle_group,
            difficulty,
            exercise_order,
            source_table,
          });
        });

        const daysHtml = Object.keys(exercisesByDay)
          .map((day) => {
            const exercises = exercisesByDay[day];
            const exercisesHtml = exercises
              .map(
                (exercise) => `
                <tr>
                  <td>${exercise.exercise_order}</td>
                  <td>${exercise.exercise_name}</td>
                  <td>${exercise.main_muscle_group}</td>
                  <td>${exercise.side_muscle_group}</td>
                  <td>${exercise.difficulty}</td>
                  <td>
                    <button class="del-btn" onclick="deleteExercise('${exercise.source_table}', '${day}', '${exercise.exercise_order}')">Delete</button>
                  </td>
                </tr>
              `
              )
              .join("");
            return `
              <div class="container">
                <h2>${day}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Exercise</th>
                      <th>Main muscle group</th>
                      <th>Side muscle group</th>
                      <th>Difficulty</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${exercisesHtml}
                  </tbody>
                </table>
              </div>
            `;
          })
          .join("");

        const planDetailsHtml = `
          <html lang="en">
          <head>
        <style>
    body {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    .container {
      margin: 0 auto;
      max-width: 800px;
      padding: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td  {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    h1, h2, p {
      text-align: center;
    }
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: -20px;
    }
    .header-btn-box {
      display: flex;
      gap: 10px;
    }
    .btn {
      padding: 12px 24px;
      background-color: #3498db;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    #logoutButton {
      display: none;
      /* height: 30px; */
      padding: 12px 24px;
      background-color: green;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    #welcomeMessage {
      font-weight: bold;
      font-size: 48px;
    }
    .title {
      text-align: center;
      font-weight: bold !important;
      font-size: 48px;
    }
    .addExerciseForm{
      text-align: center;
      margin-top: 36px;
      margin-bottom: 48px;
    }
    .exercise{
    border-radius: 10px;
    padding: 4px;
    box-sizing: border-box;
    }
    .day{
      border-radius: 10px;
      padding: 4px;
      box-sizing: border-box;
    }
    .order {
      border-radius: 10px;
      padding: 4px;
      box-sizing: border-box;
    }
    .del-btn {
      padding: 12px 24px;
      background-color: red;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  </style>
        </head>
          <body>
          <div class="header">
      <p id="welcomeMessage"></p>
      <div class="header-btn-box">
        <button onclick="goToExercises()" class="btn">Exercises</button>
        <button onclick="goToPlans()" class="btn">Plans</button>
        <button onclick="logout()" id="logoutButton">Logout</button>
      </div>
    </div>
    <hr />
    <h1 class="title">${planName}</h1>
    <h2>${planDescription}</h2>
            <h1>Add exercise to plan</h1>
    <form action="/add-exercise-to-plan" class="addExerciseForm" method="POST">
        <label for="exercise">Select exercise:</label>
        <select name="exercise" id="exercise" class="exercise">
            <script>
            fetch("/getExercises")
            .then(response => response.json())
            .then(data => {
                const selectExercise = document.getElementById("exercise");
                data.forEach(exercise => {
                    const option = document.createElement("option");
                    option.value = exercise.id;
                    option.textContent = exercise.name;
                    selectExercise.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Error downloading data:", error);
            });


            </script>
        </select>
        <br><br>
        <label for="day">Day:</label>
        <select name="day" id="eDay" class="day">
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
        </select>
        <br><br>
        <label for="order">Exercise order:</label>
        <input type="number" id="eOrder" class="order" name="order" min="1" value="1" required />
        <input id="planId" type="hidden" value="${planId}" />
        <br><br>
        <button class="btn" type="button" onclick="addExerciseToPlan()">Add exercise to plan</button>
    </form>


    <h1>Add your exercise</h1>
    <form action="/add-user-exercise-to-plan" class="addExerciseForm" method="POST">
        <label for="exercise">Select exercise:</label>
        <select name="user_exercise" id="user_exercise" class="exercise">
            <script>
            fetch("/getUserExercises")
            .then(response => response.json())
            .then(data => {
                const selectExercise = document.getElementById("user_exercise");
                data.forEach(exercise => {
                    const option = document.createElement("option");
                    option.value = exercise.id;
                    option.textContent = exercise.name;
                    selectExercise.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Error downloading data:", error);
            });


            </script>
        </select>
        <br><br>
        <label for="day">Day:</label>
        <select id="ueday" name="day" class="day">
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
        </select>
        <br><br>
        <label for="order">Exercise order:</label>
        <input type="number" class="order" id="ueorder" name="order" min="1" value="1" required />
        <br><br>
        <input id="uplanId" type="hidden" value="${planId}" />
        <button class="btn" onclick="addUserExerciseToPlan()" type="button">Add exercise to plan</button>
    </form>


            ${daysHtml}
          </body>
          <script>
          document.addEventListener("DOMContentLoaded", function () {
            fetch("http://localhost:3000/checkLoginStatus", {
              method: "GET",
              credentials: "include",
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.loggedIn) {
                  document.getElementById("logoutButton").style.display =
                  "block";         
                } else {
                  window.location.href = "/Logowanie.html";
                }
              });
          });

          function addExerciseToPlan() {
            const exercise_id = document.getElementById("exercise").value;
            const day = document.getElementById("eDay").value;
            const exercise_order = document.getElementById("eOrder").value;
            const plan_id = document.getElementById("planId").value;

            const exerciseToPlanData = {
              exercise_id: exercise_id,
              day: day,
              exercise_order: exercise_order,
              plan_id: plan_id,
            };
    
            fetch("http://localhost:3000/addExerciseToPlan", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(exerciseToPlanData),
              credentials: "include",
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  alert("Exercise added to plan successfully!");
                  window.location.reload();
                } else {
                  alert("Error adding exercise to plan. Try again.");
                }
              })
              .catch((error) => {
                console.error("Error sending request:", error);
              });
          }
          
          function addUserExerciseToPlan() {
            const exercise_id = document.getElementById("user_exercise").value;
            const day = document.getElementById("ueday").value;
            const exercise_order = document.getElementById("ueorder").value;
            const plan_id = document.getElementById("uplanId").value;

            const exerciseToPlanData = {
              exercise_id: exercise_id,
              day: day,
              exercise_order: exercise_order,
              plan_id: plan_id,
            };
    
            fetch("http://localhost:3000/addUserExerciseToPlan", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(exerciseToPlanData),
              credentials: "include",
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  alert("Exercise added to plan successfully!");
                  window.location.reload();
                } else {
                  alert("Error adding exercise to plan. Try again.");
                }
              })
              .catch((error) => {
                console.error("Error sending request:", error);
              });
          }

          function deleteExercise(sourceTable, day, exerciseOrder) {
            const endpoint = sourceTable === 'user_plan_exercises' ? '/deleteUserPlanExercise' : '/deleteUserPlanUserExercise';
            
            fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ day, exerciseOrder }),
            })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                alert('Exercise deleted from plan successfully!');
                window.location.reload();
              } else {
                alert('Error deleting exercise from plan. Try again.');
              }
            })
            .catch((error) => {
              console.error('Error deleting exercise from plan:', error);
              alert('Error deleting exercise from plan.');
            });
          }


          fetch("http://localhost:3000/getUsername", {
  method: "GET",
  credentials: "include",
})
  .then((response) => response.json())
  .then((userData) => {
    const welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.innerText = "Welcome, " + userData.username + "!";
  })
  .catch((error) => {
    console.error("Error downloading username:", error);
  });
  function goToExercises() {
    window.location.href = "/Exercises.html";
  }
  function goToPlans() {
    window.location.href = "/Plans.html";
  }
  function logout() {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Logged out!");
          window.location.href = "/Logowanie.html";
        } else {
          console.error("Error logging out!");
        }
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  }
        </script>
        </html>
        `;

        res.setHeader("Content-Type", "text/html");
        res.send(planDetailsHtml);
      });
    });
  } else {
    res.redirect("/Logowanie.html");
  }
});

app.get("/exercises-html", (req, res) => {
  if (req.session.user !== "") {
    console.log(req.session.user);
    const query = "SELECT * FROM exercises";
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error downloading data:", err);
        res.status(500).send("Error downloading data");
        return;
      }

      const exercisesHtml = `
      <html lang="en">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Main Muscle Group</th>
                <th>Side Muscle Group</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              ${results
                .map(
                  (exercise) => `
                  <tr>
                    <td>${exercise.name}</td>
                    <td>${exercise.main_muscle_group}</td>
                    <td>${exercise.side_muscle_group}</td>
                    <td>${exercise.difficulty}</td>                   
                  </tr>`
                )
                .join("")}
            </tbody>
          </table>
      </html>
    `;

      res.setHeader("Content-Type", "text/html");
      res.send(exercisesHtml);
    });
  } else {
    res.redirect("/Logowanie.html");
  }
});

app.get("/user-exercises-html", (req, res) => {
  if (req.session.user !== "") {
    console.log(req.session.user);
    const query = "SELECT * FROM user_exercises WHERE username=?";
    connection.query(query, [req.session.user.username], (err, results) => {
      if (err) {
        console.error("Error downloading data:", err);
        res.status(500).send("Error downloading data");
        return;
      }

      const exercisesHtml = `
      <html lang="en">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Main Muscle Group</th>
                <th>Side Muscle Group</th>
                <th>Difficulty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${results
                .map(
                  (exercise) => `
                  <tr>
                    <td>${exercise.name}</td>
                    <td>${exercise.main_muscle_group}</td>
                    <td>${exercise.side_muscle_group}</td>
                    <td>${exercise.difficulty}</td>
                    <td style="text-align:center !important;"><button class="del-btn" onclick="deleteExercise(${exercise.id})">Delete</button></td>
                  </tr>`
                )
                .join("")}
            </tbody>
          </table>
      </html>
    `;

      res.setHeader("Content-Type", "text/html");
      res.send(exercisesHtml);
    });
  } else {
    res.redirect("/Logowanie.html");
  }
});
app.get("/getExercises", (req, res) => {
  const query = "SELECT id, name FROM exercises";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error downloading data:", err);
      res.status(500).json({ error: "Error downloading data" });
      return;
    }
    res.json(results);
  });
});
app.get("/getUserExercises", (req, res) => {
  const query = "SELECT id, name FROM user_exercises";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error downloading data:", err);
      res.status(500).json({ error: "Error downloading data" });
      return;
    }
    res.json(results);
  });
});
app.post("/deleteExercise", (req, res) => {
  const exerciseId = req.body.id;

  const query = "DELETE FROM user_exercises WHERE id = ?";
  connection.query(query, [exerciseId], (err, result) => {
    if (err) {
      console.error("Error downloading data:", err);
      res.status(500).json({ success: false, error: "Error downloading data" });
      return;
    }

    console.log("Exercise deleted from database");
    res.json({ success: true });
  });
});

app.post("/deletePlan", (req, res) => {
  const planId = req.body.id;

  const query = "DELETE FROM user_plans WHERE id = ?";
  connection.query(query, [planId], (err, result) => {
    if (err) {
      console.error("Error deleting plan:", err);
      res.status(500).json({ success: false, error: "Error deleting plan" });
      return;
    }

    console.log("Plan deleted from database");
    res.json({ success: true });
  });
});

// ...

////////////////////////

app.get("/checkLoginStatus", (req, res) => {
  console.log("Session user:", req.session.user);
  const loggedIn =
    req.session.user !== undefined && req.session.user.username !== undefined;
  console.log("Logged In:", loggedIn);
  res.json({ loggedIn });
});

app.get("/getUsername", (req, res) => {
  const username = req.session.user ? req.session.user.username : "";
  res.json({ username });
});
app.post("/addExercise", (req, res) => {
  const exerciseData = req.body;

  const query =
    "INSERT INTO user_exercises (name, main_muscle_group, side_muscle_group, difficulty, username) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    query,
    [
      exerciseData.name,
      exerciseData.main_muscle_group,
      exerciseData.side_muscle_group,
      exerciseData.difficulty,
      req.session.user.username,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding exercise:", err);
        res.json({ success: false });
        return;
      }
      console.log("New exercise added to database");
      res.json({ success: true });
    }
  );
});

app.post("/addPlan", (req, res) => {
  const planData = req.body;

  const query =
    "INSERT INTO user_plans (name, description, username) VALUES (?, ?, ?)";
  connection.query(
    query,
    [planData.name, planData.description, req.session.user.username],
    (err, result) => {
      if (err) {
        console.error("Error adding plan:", err);
        res.json({ success: false });
        return;
      }
      console.log("New plan added to database");
      res.json({ success: true });
    }
  );
});
app.post("/addExerciseToPlan", (req, res) => {
  const Data = req.body;

  const checkQuery =
    "SELECT COUNT(*) AS count FROM (SELECT 1 FROM user_plan_exercises WHERE day = ? AND exercise_order = ? AND user_plan_id = ? UNION SELECT 1 FROM user_plan_user_exercises WHERE day = ? AND exercise_order = ? AND user_plan_id = ?) AS combined";
  connection.query(
    checkQuery,
    [
      Data.day,
      Data.exercise_order,
      Data.plan_id,
      Data.day,
      Data.exercise_order,
      Data.plan_id,
    ],
    (checkErr, checkResults) => {
      if (checkErr) {
        console.error("Error checking order busyness:", checkErr);
        res.json({
          success: false,
          message: "Error checking order busyness",
        });
        return;
      }

      const count = checkResults[0].count;
      if (count > 0) {
        res.json({
          success: false,
          message: "The order is already taken for this day",
        });
      } else {
        const insertQuery =
          "INSERT INTO user_plan_exercises (user_plan_id, exercise_id, day, exercise_order) VALUES (?, ?, ?, ?)";
        connection.query(
          insertQuery,
          [Data.plan_id, Data.exercise_id, Data.day, Data.exercise_order],
          (insertErr, result) => {
            if (insertErr) {
              console.error("Error adding exercise to plan:", insertErr);
              res.json({
                success: false,
                message: "Error adding exercise to plan",
              });
              return;
            }
            console.log("Exercise added to plan in database");
            res.json({ success: true });
          }
        );
      }
    }
  );
});

app.post("/addUserExerciseToPlan", (req, res) => {
  const Data = req.body;

  const checkQuery =
    "SELECT COUNT(*) AS count FROM (SELECT 1 FROM user_plan_exercises WHERE day = ? AND exercise_order = ? AND user_plan_id = ? UNION SELECT 1 FROM user_plan_user_exercises WHERE day = ? AND exercise_order = ? AND user_plan_id = ?) AS combined";
  connection.query(
    checkQuery,
    [
      Data.day,
      Data.exercise_order,
      Data.plan_id,
      Data.day,
      Data.exercise_order,
      Data.plan_id,
    ],
    (checkErr, checkResults) => {
      if (checkErr) {
        console.error("Error checking order business:", checkErr);
        res.json({
          success: false,
          message: "Error checking order business",
        });
        return;
      }

      const count = checkResults[0].count;
      if (count > 0) {
        res.json({
          success: false,
          message: "The order is already taken for this day",
        });
      } else {
        const insertQuery =
          "INSERT INTO user_plan_user_exercises (user_plan_id, user_exercise_id, day, exercise_order) VALUES (?, ?, ?, ?)";
        connection.query(
          insertQuery,
          [Data.plan_id, Data.exercise_id, Data.day, Data.exercise_order],
          (insertErr, result) => {
            if (insertErr) {
              console.error("Error adding exercise to plan:", insertErr);
              res.json({
                success: false,
                message: "Error adding exercise to plan",
              });
              return;
            }
            console.log("Exercise added to plan in database");
            res.json({ success: true });
          }
        );
      }
    }
  );
});

app.post("/deleteUserPlanExercise", (req, res) => {
  const Data = req.body;

  const query =
    "DELETE FROM user_plan_exercises WHERE day = ? AND exercise_order = ?";
  connection.query(query, [Data.day, Data.exerciseOrder], (err, result) => {
    if (err) {
      console.error("Error deleting record:", err);
      res.json({ success: false, message: "Error deleting record" });
      return;
    }
    console.log("Record deleted from user_plan_exercises");
    res.json({ success: true });
  });
});

app.post("/deleteUserPlanUserExercise", (req, res) => {
  const Data = req.body;

  const query =
    "DELETE FROM user_plan_user_exercises WHERE day = ? AND exercise_order = ?";
  connection.query(query, [Data.day, Data.exerciseOrder], (err, result) => {
    if (err) {
      console.error("Error deleting record:", err);
      res.json({ success: false, message: "Error deleting record" });
      return;
    }
    console.log("Record deleted from user_plan_user_exercises");
    res.json({ success: true });
  });
});

app.post("/logout", (req, res) => {
  console.log(req.session.user);
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      res.status(500).send("Error logging out");
    } else {
      console.log("User logged out");

      res.status(200).send("Logged out successfully");
    }
  });
});

app.use(express.static("../Main"));

app.use(express.static(path.join(__dirname, "../Main")));
app.use(express.static(path.join(__dirname, "../Logowanie")));
app.use(express.static(path.join(__dirname, "../Rejestracja")));
// app.use(express.static(path.join(__dirname, "../Logowanie")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Logowanie/Logowanie.html"));
});
app.use((err, req, res, next) => {
  console.error("Błąd ogólny:", err);
  res.status(500).send("Unexpected error has occured");
});
app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});

////////////////////////
