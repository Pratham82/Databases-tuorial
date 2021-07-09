-- Show all Databases
show DATABASES;

-- Create databse named Employees_db
CREATE DATABASE Employees_db

-- Use the database required
use Employees_db;

-- Show tables in the database
show tables;

-- Creating schema for the table
CREATE TABLE Employees(
Id INT PRIMARY KEY AUTO_INCREMENT, 
FirstName VARCHAR(20), 
LastName VARCHAR(20), 
Email  VARCHAR(30) UNIQUE,
Phone  INT(10) UNIQUE, 
City VARCHAR(15), 
Country VARCHAR(15),
Salary DOUBLE);

-- Describe the schema
DESC Employees;



--  Show all employees from the table
SELECT * FROM Employees;

-- Insert multiple rows in table
INSERT INTO Employees VALUES 
(1,"Roxy","Johnson","roxy@gmail.com", 1234567890,"Atlanta","US",45000),
(2,"Drake","Rostand","drake@gmail.com", 3245678914,"New York","US",78000),
(3,"Justin","Timberlake","justin@gmail.com", 553588841,"Lost Angeles","US",94000),
(4,"Ron","Swanson","ron@gmail.com", 788544935,"Austin","US",64000),
(5,"Frank","Harrington","frank@gmail.com", 777888939,"Chicago","US",38000)

--  Show names of employees from the table
SELECT FirstName FROM Employees WHERE FirstName REGEXP '^r';
select firstname  FROM Employees e WHERE firstName REGEXP 'n$';

-- Delete the table
DROP TABLE Employees;

-- Empty the values in Employees table
TRUNCATE TABLE Employees;

-- Delete emplyee where firstName  is Drake
DELETE FROM Employees  WHERE firstName = "Drake"
 
--  Update Employees salary 
 UPDATE  Employees SET phone = 324567891 WHERE firstName = "Drake"
 
-- List out the salaries of emploies
 SELECT  Salary FROM Employees;

-- Find  the total salary company is spending on the people
SELECT SUM(Salary) FROM Employees;

-- Find the average salary
SELECT  AVG(Salary) FROM Employees;

