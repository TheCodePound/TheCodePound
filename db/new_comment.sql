insert into comments (user_id, post_comments_id, comments_date, comments)
values (${user_id}, ${post_comments_id}, ${comments_date}, ${comments}) returning *;