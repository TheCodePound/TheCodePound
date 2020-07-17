select count(b.bones) from junction j
join bones b 
on b.post_bones_id = j.post_junction_id
where j.user_junction_id = $1