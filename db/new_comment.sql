insert into comments (user_id, post_comments_id, comments)
values (${user_id}, ${post_comments_id}, ${comments}) returning *;