select users.full_name, posts.title, posts.content, img.img, languages.languages from posts
join users on posts.user_id = users.user_id
join img on posts.post_id = img.post_img_id
join languages on posts.post_id = post_languages_id