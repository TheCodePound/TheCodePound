
select users.full_name, users.profile_pic, posts.title, posts.content, posts.post_id, img.img, languages.languages, languages.languages_img, comments.comments, bones.bones from posts
join users on posts.user_id = users.user_id
join img on posts.post_id = img.post_img_id
join languages on posts.post_id = post_languages_id
join comments on posts.post_id = post_comments_id
join bones on posts.post_id = post_bones_id