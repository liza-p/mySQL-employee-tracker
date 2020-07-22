var mysql = require("mysql");
var inquirer = require("inquirer");
var console_table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
    inquirer.prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role"
      ]
    }).then(function(answer) {
      switch (answer.action) {
      case "Add department":
        addDepartment();
        break;

      case "Add role":
        addRole();
        break;

      case "Add employee":
        addEmployee();
        break;

      case "View departments":
        viewDepartments();
        break;

      case "View roles":
        viewRoles();
        break;
      case "View employees":
        viewEmployees();
        break;
      
      case "Update employee role":
          updateEmplRole();
          break;

      }
    });
  }
  
  function addDepartment(){
    inquirer.prompt({
      name: "department",
      type: "input",
      message: "Enter the department name"
    })
    .then(function(answer) {
      connection.query("INSERT INTO department SET ?", {name: answer.department},
      function(err) {
        if (err) throw err;
        console.log("Department was added successfully!");
        start();
      });
    });
}

  function viewDepartments(){
    connection.query("SELECT * FROM department", function(err, res){
      if(err) throw err;
      console.table(res);
    })
  }

  function addRole(){
    connection.query("SELECT * FROM department", function(err, res){
      if(err) throw err;

      inquirer.prompt([
        {
        name: "roleTitle",
        type: "input",
        message: "Enter the role title"
      },
      {
        name: "roleSalary",
        type: "number",
        message: " Enter the role salary"
      },
      {
        name: "departmentID",
        type: "list",
        message: "Choose the department",
        choices: res.map(function(row) {
          return {
            name: row.name,
            value: row.id
          };
        })
      }

    ])
      .then(function(answer) {
        console.log(answer);
        // connection.query("INSERT INTO department SET ?", {name: answer.department},
        // function(err) {
        //   if (err) throw err;
        //   console.log("Department was added successfully!");
        //   start();
        // });
      });
    })
    
  }