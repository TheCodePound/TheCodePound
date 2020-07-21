insert into posts (user_id, title, content, post_date)
values (${user_id}, ${title}, ${content}, ${post_date}) returning *;



