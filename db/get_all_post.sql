select users.full_name, users.profile_pic, posts.title, posts.content, posts.post_id, img.img, languages.languages, languages.languages_img from posts
join users on posts.user_id = users.user_id
join img on posts.post_id = img.post_img_id
join languages on posts.post_id = post_languages_id
