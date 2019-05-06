insert into users(first_name, last_name, email, username, password)values(
  ${registerFirstName}, ${registerLastName},${registerEmail},${registerUsername},${hash}
) returning username, password, user_id;