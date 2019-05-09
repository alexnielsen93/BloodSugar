select reading_date from blood_sugar_readings
where user_id = ${user_id}
group by reading_date