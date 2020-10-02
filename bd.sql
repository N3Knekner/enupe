CREATE DATABASE IF NOT EXISTS ENUPE_BD;

USE ENUPE_BD;

CREATE TABLE IF NOT EXISTS users (
	id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(80),
    userpassword varchar(80),
    email varchar(80),
    ip varchar(80),
    stayConnected boolean
);

select * from users;
/*drop table users;

insert into users(username,email) value("abimael","a@gmail.com");
insert into users(username,email) value("jubisclaiton","j@gmail.com");

SELECT username FROM users WHERE username LIKE 'claiton';SELECT email FROM users WHERE  email LIKE 'c@gmail.com';

*/





