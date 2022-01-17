const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

require('dotenv').config();

// connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: "employee_db"
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  start();
});

// inquirer prompt, asking for user input by repsonding to prompts
function start() {
  inquirer
    .prompt({
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: 
      [
        'View all departments', 
        'View all roles', 
        'View all employees', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        'Update an employee role',
        'Update an employee manager',
        "View employees by department",
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'View department budgets',
        'No Action'
      ]
    })

   .then((answers) => {
     const { options } = answers;

     if (choices === "view all departments") {
       showDepartments();
     }
     if (choices === "View all roles") {
      showRoles();
    }
    if (choices === "View all employees") {
      showEmployees();
    }
    if (choices === "Add a department") {
      addDepartment();
    }
    if (choices === "Add a role") {
      addRole();
    }
    if (choices === "Add an employee") {
      addEmployee();
    }
    if (choices === "Update an employee role") {
      updateEmployee();
    }
    if (choices === "Update an employee manager") {
      updateManager();
    }
    if (choices === "View employees by department") {
      employeeDepartment();
    }
    if (choices === "Delete a department") {
      deleteDepartment();
    }
    if (choices === "Delete a role") {
      deleteRole();
    }
    if (choices === "Delete an employee") {
      deleteEmployee();
    }
    if (choices === "View department budgets") {
      viewBudget();
    }
    if (choices === "No Action") {
      connection.end()
    };
  });
};

// function to show all departments
showDepartments = () => {
  console.log('Showing all departments...\n');
  const sql =`SELECT department.id AS id, department.name AS department FROM department`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

// function to show all roles 
showRoles = () => {
  console.log('Showing all roles...\n');

  const sql = `SELECT role.id, role.title, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;
  
  connection.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows); 
    promptUser();
  })
};

// function to show all employees 
showEmployees = () => {
  console.log('Showing all employees...\n'); 
  const sql = `SELECT employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name AS department,
                      role.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
               FROM employee
                      LEFT JOIN role ON employee.role_id = role.id
                      LEFT JOIN department ON role.department_id = department.id
                      LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows);
    promptUser();
  });
};


function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the job title you want to add?",
        name: "title"
      },
      {
        type: "input",
        message: "What is the salary for this position?",
        name: "salary"
      },
      {
        type: "input",
        message: "What is the department ID for this position?",
        name: "departmentID"
      }
    ])
    .then(function(res) {
      const title = res.title;
      const salary = res.salary;
      const departmentID = res.departmentID;
      const query = `INSERT INTO role (title, salary, department_id) VALUE("${title}", "${salary}", "${departmentID}")`;
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName"
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName"
      },
      {
        type: "input",
        message: "What is the employee's role ID?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the employee's manager ID?",
        name: "managerID"
      }
    ])
    .then(function(res) {
      const firstName = res.firstName;
      const lastName = res.lastName;
      const roleID = res.roleID;
      const managerID = res.managerID;
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
}

function viewDepartment() {
  const query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewRole() {
  const query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewEmployee() {
  const query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function updateRole() {
  const query = "SELECT id, first_name, last_name, role_id  FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    {
      inquirer.prompt({
        type: "input",
        message: "Which employee needs to be updated? (please use number from id column only)",
        name: "employee"
      });
    }
  });
}
