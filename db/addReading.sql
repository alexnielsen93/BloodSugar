insert into blood_sugar_readings(
sugar_level, reading_date, reading_time, note, user_id

)values(

${sugar_level}, 
${reading_date},
${reading_time},
${note},
${user_id}

);
select * from blood_sugar_readings where
user_id = ${user_id}

