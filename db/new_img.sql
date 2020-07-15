insert into img (user_img_id, post_img_id, img)
values (${user_img_id}, ${post_img_id}, ${img}) returning *;

