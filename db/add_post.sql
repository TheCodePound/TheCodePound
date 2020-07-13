insert into posts (user_id, title, content)
values ($1, $3, $4);

insert into img (post_id, post_img)
values ($2, $5);

insert into languages (posts_id, languages)
values ($2, $6);
 
select user_id, posts.title, posts.content, img.post_img, languages.languages  from posts 
join img on posts.user_post_id = post_id
join languages on posts.user_post_id = posts_id;

-- insert into posts (user_id, title, content)
-- values ($1, $2, $3);