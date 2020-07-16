-- select count(*) from junction j
-- join posts p
-- on p.user_id = j.user_junction_id
-- join bones b
-- on b.post_bones_id = j.user_junction_id
-- where p.user_id = $1;

-- select count(bones.bones) from bones 
-- where post_bones_id = $1