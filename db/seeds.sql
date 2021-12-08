USE employeeDB;

INSERT INTO  department (name) VALUES
("Customer Service"), ("Service");

INSERT INTO role (title, salary, department_id)
VALUES
("CSR", 30000, 1),
("Service", 40000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Andrew", "H", 1, NULL),
("John", "N", 2, NULL);