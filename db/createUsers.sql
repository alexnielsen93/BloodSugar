create table users(
user_id serial primary key,
first_name varchar(50),
last_name varchar(50),
phone_number varchar(20),
email varchar(100),
password text
);