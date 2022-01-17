USE employee_db;

INSERT INTO  department (name) 
VALUES
("Customer Service"), 
("Information Technology"), 
("Human Resources"), 
("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES
("CSR", 30000, 1),
("IT Service", 40000, 2),
("Communications Associate", 40000, 3),
("Social Media Manager", 60000, 4),
("Director", 70000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Andrew", "H", 1, NULL),
("John", "N", 2, NULL),
("John", " Doe", 3, NULL),
("Jane", "Doe", 4, NULL),
("Craig", "Friday", 5, NULL);