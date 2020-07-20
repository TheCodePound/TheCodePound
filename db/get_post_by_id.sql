-- select * from junction j
-- join users u
-- on u.user_id = j.user_junction_id 
-- join posts p
-- on p.post_id = j.post_junction_id
-- join img i
-- on i.post_img_id = j.post_junction_id  
-- join languages l
-- on l.post_languages_id = j.post_junction_id
-- where p.post_id = $1;

select users.full_name, users.profile_pic, posts.title, posts.content, posts.post_id, img.img, languages.languages, languages.languages_img from posts
join users on posts.user_id = users.user_id
join img on posts.post_id = img.post_img_id
join languages on posts.post_id = post_languages_id
where posts.post_id = $1;