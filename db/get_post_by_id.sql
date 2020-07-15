select * from junction j
join users u
on u.user_id = j.user_junction_id 
join posts p
on p.post_id = j.post_junction_id
join img i
on i.post_img_id = j.post_junction_id  
join languages l
on l.post_languages_id = j.post_junction_id
where p.post_id = $1;