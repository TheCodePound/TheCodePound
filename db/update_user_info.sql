update users
set full_name = $2, email = $3, new_email = $4, password = $5, new_password = $6, profile_pic = $7
where id = $1;

update users
set email = $4, password = $6
where id = $1
returning full_name, email, password, profile_pic;

