insert into languages (languages, languages_img)
values (${languages}, ${languages_img}) returning *;