select * from blood_sugar_readings
where user_id = ${user_id} order by reading_date desc, reading_time desc limit 1