create table blood_sugar_readings(
reading_id serial primary key,
sugar_level int,
reading_date date,
reading_time time,
note varchar(500),
user_id int references users(user_id)

)