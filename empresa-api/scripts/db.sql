USE [master]
CREATE DATABASE [company]
GO

USE [company]
GO

CREATE TABLE [User](
	id INT PRIMARY KEY IDENTITY(1,1),
	name VARCHAR(150) NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
	birth_date DATETIME NOT NULL,
    token_recovery VARCHAR(70) NULL,
    CONSTRAINT uc_username UNIQUE (username),
    CONSTRAINT uc_email UNIQUE (email)
);


CREATE TABLE [Employee](
	id INT PRIMARY KEY IDENTITY(1,1),
    DPI  VARCHAR(13) NOT NULL,
	fullName VARCHAR(150) NOT NULL,
    numberChildren INT NOT NULL,
	baseSalary DECIMAL(12,2) NOT NULL,
    userId INT NOT NULL,
    createdAt DATETIME NOT NULL,
    status BIT NOT NULL

    FOREIGN KEY (userId) REFERENCES [User] (id)
);

CREATE TABLE [Bonus](
	id INT PRIMARY KEY IDENTITY (1,1),
	bonusName VARCHAR (150) NOT NULL,
    amount DECIMAL(6,2) NOT NULL,
);

CREATE TABLE [Bonus_employee](
	id INT PRIMARY KEY IDENTITY (1,1),
    employeeId INT NOT NULL,
    bonusId INT NOT NULL,
    FOREIGN KEY (employeeId) REFERENCES [Employee] (id),
    FOREIGN KEY (bonusId) REFERENCES [Bonus] (id)
);
