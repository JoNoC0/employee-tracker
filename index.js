const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const dotenv = require('dotenv');
const Connection = require('mysql2/typings/mysql/lib/Connection');
dotenv.config()

const db = new Database ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_db"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start () {
inquirer.prompt ({
    name: 'startOption',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
            'View all departments', 
            'View all roles', 
            'View all employees', 
            'Add department', 
            'Add role', 
            'Add employee', 
            'Update employee role'
        ]
}) .then(data => {
    // if statement stating which function to run
    if (data.startOption === 'View all Employees') {
        viewEmployees();
    } else if ( data.startOption === 'View all departments') {
        viewRoles;
    } else if (data.startOption === 'View all employees') {
        viewDepartments;
    } else if (data.startOption === 'Add department') {
        addDepartment;
    } else if (data.startOption === 'Add role') {
        addRole;
    } else if (data.startOption === 'Add employee') {
        addEmployee;
    } else if (data.startOption === 'Update employee role') {
        updateEmployeeRole;
    } else if (data.startOption === 'Exit') {
        connection.end()
    }

})
}

function viewEmployees () {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        console.log(`DEPARTMENTS:`)
        res.forEach(department => {
            console.log(`ID: ${department.id} | Name: ${department.name}`)
        })
        start();
    });
};

function viewEmployees () {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        console.log(`ROLES:`)
        res.forEach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
        })
        start();
    });
};

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What is the name of the new department?",
          })
        .then(function(answer) {
        var query = "INSERT INTO department (name) VALUES ( ? )";
        connection.query(query, answer.department, function(err, res) {
            console.log(`You have added this department: ${(answer.department).toUpperCase()}.`)
        })
        viewDepartments();
        })
}

function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw (err);
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: "What is the title of the new role?",
          }, 
          {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?",
          },
          {
            name: "departmentName",
            type: "list",
// is there a way to make the options here the results of a query that selects all departments?`
            message: "Which department does this role fall under?",
            choices: function() {
                var choicesArray = [];
                res.forEach(res => {
                    choicesArray.push(
                        res.name
                    );
                })
                return choicesArray;
              }
          }
          ]) 
// in order to get the id here, i need a way to grab it from the departments table 
        .then(function(answer) {
        const department = answer.departmentName;
        connection.query('SELECT * FROM DEPARTMENT', function(err, res) {
        
            if (err) throw (err);
         let filteredDept = res.filter(function(res) {
            return res.name == department;
        }
        )
        let id = filteredDept[0].id;
       let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
       let values = [answer.title, parseInt(answer.salary), id]
       console.log(values);
        connection.query(query, values,
            function(err, res, fields) {
            console.log(`You have added this role: ${(values[0]).toUpperCase()}.`)
        })
            viewRoles()
            })
        })
    })
}