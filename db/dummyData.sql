create table users(
user_id serial primary key,
first_name varchar(50),
last_name varchar(50),
phone_number varchar(20),
email varchar(100),
username varchar(50),
password text
);

insert into users(first_name, last_name, phone_number, email, username, password)values(
'bob', 'bobberton', '801-111-1111', 'bobsemail@bob.com', 'bobman','bobspassword'
),
(
'bill', 'bilberton','801-222-2222', 'billsemail@bill.com', 'billman','billspassword'
);