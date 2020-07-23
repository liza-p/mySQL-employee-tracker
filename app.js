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
  // addDepart first function becouse does not have dependencies
  function addDepartment(){
    inquirer.prompt({
      name: "department",
      type: "input",
      message: "Enter the department name"
    })
    .then(function(answer) {
      console.log(answer);
      connection.query("INSERT INTO department SET ?", {name: answer.department},
      function(err) {
        if (err) throw err;
        console.log("Department was added successfully!");
        start();
      });
    });
}
 // once created addDepart now i can viewDepart
  function viewDepartments(){
    connection.query("SELECT * FROM department", function(err, res){
      if(err) throw err;
      console.table(res);
      start();
    })
  }
// next addRole becouse now i have departmentID
  function addRole(){
    connection.query("SELECT * FROM department", function(err, res){
      console.log(res);
      if(err) throw err;
      // Console.log("!!!!mapped choises(name, value) from res!!!!!")
      // console.log(res.map(function(row) {
      //   return {
      //     name: row.name,
      //     value: row.id
      //   };
      // })) 
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
        connection.query("INSERT INTO role SET ?", {title: answer.roleTitle, salary: answer.roleSalary, department_id: answer.departmentID},
        function(err) {
          if (err) throw err;
          console.log("Role was added successfully!");
          start();
        });
      });
    })
    
  }
  function viewRoles(){
    // joining two tables to bring department name from the department table
    connection.query("SELECT role.id, role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id",
     function(err, res){
      if(err) throw err;
      console.table(res);
      start();
    })
  }
 function addEmployee(){
  connection.query(`SELECT role.id, role.title, department.name 
  FROM role
  LEFT JOIN department
  ON role.department_id = department.id`, function(err, resRole){
    console.log("ROLE res")
    // console.log(resRole);
    if(err) throw err;
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title
    FROM employee 
    LEFT JOIN role 
    ON employee.role_id = role.id`,
     function(err, resEmp){
      console.log(resEmp);
      if(err) throw err;
      inquirer.prompt([
        {
        name: "firstName",
        type: "input",
        message: "Enter the employee first name"
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter the employee last name"
      },
      {
        name: "roleID",
        type: "list",
        message: "Choose the role for the employee",
        choices: resRole.map(function(row) {
          return {
            name: `${row.title} (${row.name})`,
            value: row.id
          }
        })
      },
      {
        name: "managerID",
        type: "list",
        message: "Choose the manager for the employee",
        choices: resEmp.map(function(row) {
          return {
            name: `${row.first_name} ${row.last_name} (${row.title})`,
            value: row.id

          }
        })
      }
      ]).then(function(answer) {
        console.log(answer);
        connection.query("INSERT INTO employee SET ?", {first_name: answer.firstName, last_name: answer.lastName, role_id: answer.roleID, manager_id: answer.managerID},
        function(err) {
          if (err) throw err;
          console.log("Employee was added successfully!");
          start();
        });
      });
    });
  });
}
function viewEmployees(){
  connection.query
  (`SELECT e.id, e.first_name, e.last_name, role.title, m.first_name AS manager_first_name, m.last_name  AS manager_last_name
  FROM employee e 
  LEFT JOIN employee m 
  ON e.manager_id = m.id
  LEFT JOIN role
  ON e.role_id = role.id`, 
  function(err,res){
      if(err) throw err;
      console.table(res);
      start();
  });
}
function updateEmplRole(){
  connection.query(`SELECT e.id, e.first_name, e.last_name, role.title
  FROM employee e
  LEFT JOIN role
  ON e.role_id = role.id
  `, function(err,res){
    if(err)throw err;
    console.log(res);
    connection.query(`SELECT role.id, role.title, department.name 
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id`, function(err,resRole){
      if(err)throw err;
      console.log(resRole)
      inquirer.prompt([
        {
          name: "employeeID",
          type: "list",
          message: "Choose the employee to update",
          choices: res.map(function(row) {
            return {
              name: `${row.first_name} ${row.last_name} (${row.title})`,
              value: row.id
            }
          })
        },
        {
          name: "newRoleID",
          type: "list",
          message: "Choose the new role",
          
          choices: resRole.map(function(row) {
            return {
              name: `${row.title} (${row.name}) `,
              value: row.id
            };
          })
        }
        ]).then(function(answer) {
          console.log(answer);
          connection.query("UPDATE employee SET ?", {role_id: answer.newRoleID},
          function(err) {
            if (err) throw err;
            console.log("Employee ROLE was UPDATED successfully!");
            start();
          });
        });
    });
    
  });
}