const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const dotenv = require('dotenv');
dotenv.config()


function askQuestions () {
inquirer.prompt ({
    name: 'questionOption',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View all Employees', 'View all roles', 'View all departments', 'Add department', 'Add role', 'Add employee', 'Update employee']
}) .then(data => {
    // if statement stating which function to run
    if (data.questionOption === 'View all Employees') {
        viewEmployees();
    }

})
}

function viewEmployees () {

}


