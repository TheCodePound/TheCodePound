select i.img from junction j
join img i
on i.post_img_id = j.post_junction_id
-- where j.post_junction_id = $1