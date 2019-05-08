select * from blood_sugar_readings
where reading_date = ${reading_date} and user_id = ${user_id}
order by reading_time asc