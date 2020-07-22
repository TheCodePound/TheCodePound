-- select u.full_name, u.profile_pic, c.comments, c.comments_date, c.post_comments_id, p.post_id from junction j
-- join users u
-- on u.user_id = j.user_junction_id 
-- join comments c
-- on c.post_comments_id = j.post_junction_id 
-- join posts p
-- on p.post_id = j.post_junction_id 
-- where post_id = $1

-- note this does not have the user name
-- select c.user_id, c.comments, c.comments_date, c.post_comments_id, p.post_id from junction j
-- join comments c
-- on c.post_comments_id = j.post_junction_id 
-- join posts p
-- on p.post_id = j.post_junction_id 
-- where j.post_junction_id = $1

select u.full_name, u.profile_pic, c.user_id, c.comments, c.comments_date, c.post_comments_id, p.post_id from junction j
join comments c
on c.post_comments_id = j.post_junction_id 
join users u
on u.user_id = c.user_id 
join posts p
on p.post_id = j.post_junction_id 
where j.post_junction_id = $1