DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;
​
USE employee_trackerDB;
​
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);
​
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT
  title VARCHAR(30) NOT NULL,
  department_id INT NOT NULL,
  salary DECIMAL(10,4) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);
​INSERT INTO employee(first_name,last_name, role_id)
VALUES("Kevin", "Mccallister", 1)
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
