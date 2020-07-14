insert into img (post_img_id, img)
values (${post_img_id}, ${img}) returning *;