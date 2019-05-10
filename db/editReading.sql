update blood_sugar_readings
set note = ${note},
sugar_level = ${sugar_level},
reading_date = ${reading_date},
reading_time = ${reading_time}
where reading_id = ${reading_id};

