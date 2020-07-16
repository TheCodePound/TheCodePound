insert into languages (user_languages_id, post_languages_id,languages, languages_img)
values ( ${user_languages_id}, ${post_languages_id}, ${languages}, ${languages_img}) returning *;