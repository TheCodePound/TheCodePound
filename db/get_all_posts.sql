select user_id, full_name, user_post_id, img_id, posts.title, posts.content, img.post_img, languages.languages  from posts 
join img on posts.user_post_id = post_id
join users on posts.users_id = user_id 
join languages on posts.user_post_id = posts_id;