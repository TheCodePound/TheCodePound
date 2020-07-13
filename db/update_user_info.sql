update users
set full_name = $2, email = $3, password = $4, new_password = $5, profile_pic = $6
where id = $1;

update users
set password = $5
where id = $1
returning full_name, email, password, profile_pic;

