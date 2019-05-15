update users
set 
first_name = ${first_name},
last_name = ${last_name},
email = ${email},
phone_number = ${phone_number},
password = ${hash}
where user_id = ${user_id};
select * from users where user_id = ${user_id};