insert into posts (user_id, title, content)
values (${user_id}, ${title}, ${content}) returning *;



