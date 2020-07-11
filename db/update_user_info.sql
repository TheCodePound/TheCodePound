update users
set full_name = $2, email = $3, password = $4, profile_pic = $5
where id = $1