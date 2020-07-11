insert into users (full_name, email, password, profile_pic)
values ( $1, $2, $3, $4 ) returning full_name, email, password, profile_pic;