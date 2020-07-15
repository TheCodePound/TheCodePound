insert into comments (user_id, comments)
values (${user_id}, ${comments}) returning *;