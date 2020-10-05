CREATE DATABASE IF NOT EXISTS ENUPE_BD;

USE ENUPE_BD;

CREATE TABLE IF NOT EXISTS users (
	id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(80) not null,
    userpassword varchar(80) not null,
    email varchar(80) not null,
    matricula varchar(10),
    ip varchar(80),
    type_u int,
    stayConnected boolean
);

select * from users;
/*drop table users;

insert into users(username,email) value("abimael","a@gmail.com");
insert into users(username,email) value("jubisclaiton","j@gmail.com");

SELECT username FROM users WHERE username LIKE 'claiton';SELECT email FROM users WHERE  email LIKE 'c@gmail.com';
delete from users where id = 3;
*/





