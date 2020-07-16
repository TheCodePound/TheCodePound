select l.languages, l.languages_img from junction j
join posts p
on p.post_id = j.post_junction_id 
join languages l
on l.post_languages_id = j.post_junction_id 
where p.post_id = $1;  