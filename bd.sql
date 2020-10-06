CREATE DATABASE IF NOT EXISTS ENUPE_BD;

USE ENUPE_BD;

CREATE TABLE IF NOT EXISTS users (
	id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(80) not null,
    userpassword varchar(80) not null,
    email varchar(80) not null,
    matricula varchar(10),
    hashcode varchar(80),
    type_u int,
    stayConnected boolean
);

select * from users;






