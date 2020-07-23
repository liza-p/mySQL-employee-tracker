# mySQL-employee-tracker
This application is buit using node, inquirer, and MySQL. it allows you to ADD, VIEW  departments, roles, employees and UPDATE employees roles.



## Database schema structure


![Database Schema](img/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

## Demo

![appDemo](img/employees.gif)
  ## Technologies Used
- JavaScript - Core logic
- Node and NPM
- Express
- MYSQL
- Git - version control system to track changes to source code
- GitHub - hosts repository that can be deployed to GitHub Pages