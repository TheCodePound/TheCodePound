-- this is the one in uses right now 1:02pm 7/14/2020
create table users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(50),
    new_email VARCHAR(50),
    password TEXT,
    new_password TEXT,
    profile_pic TEXT 
);

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    user_post_id INTEGER REFERENCES users(user_id),
    title VARCHAR(50),
    content TEXT
);

CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    user_comments_id INTEGER REFERENCES users(user_id),
    post_comments_id INTEGER REFERENCES posts(post_id),
    comments TEXT,
    bones INTEGER
);

CREATE TABLE img (
  img_id SERIAL PRIMARY KEY,
  user_img_id int REFERENCES users(user_id),
  post_img_id int REFERENCES posts(post_id), 
  img text
); 

CREATE TABLE languages (
  languages_id SERIAL PRIMARY KEY,
  user_languages_id int REFERENCES users(user_id),
  post_languages_id int REFERENCES posts(post_id), 
  languages text
);

CREATE TABLE junction (
  junction_id SERIAL PRIMARY KEY,
  user_junction_id int REFERENCES users(user_id),
  img_junction_id int REFERENCES img(img_id),  
  post_junction_id int REFERENCES posts(post_id),
  languages_junction_id int REFERENCES languages(languages_id),
  comments_junction_id int REFERENCES comments(comment_id)
);



-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     full_name VARCHAR(100),
--     email VARCHAR(50)
--     password TEXT,
--     profile_pic TEXT
-- );

-- CREATE TABLE posts(
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(id),
--     title VARCHAR(50),
--     img TEXT,
--     content TEXT
-- );

-- CREATE TABLE comments(
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(id),
--     post_id INTEGER REFERENCES posts(id),
--     comments TEXT,
--     bones INTEGER
-- );

-- CREATE TABLE img (
--   id SERIAL PRIMARY KEY,
--   post_id int,
--   post_img text
-- );

-- CREATE TABLE languages (
--   id SERIAL PRIMARY KEY,
--   languages text
-- );

-- CREATE TABLE junction (
--   id SERIAL PRIMARY KEY,
--   posts_id int,
--   languages_id int
-- );

-- ALTER TABLE posts ADD FOREIGN KEY (user_id) REFERENCES users (id);

-- ALTER TABLE comments ADD FOREIGN KEY (user_id) REFERENCES users (id);

-- ALTER TABLE comments ADD FOREIGN KEY (post_id) REFERENCES posts (id);

-- ALTER TABLE img ADD FOREIGN KEY (post_id) REFERENCES posts (id);

-- ALTER TABLE languages ADD FOREIGN KEY (languages) REFERENCES posts (id);

-- ALTER TABLE junction ADD FOREIGN KEY (posts_id) REFERENCES posts (id);

-- ALTER TABLE junction ADD FOREIGN KEY (languages_id) REFERENCES languages (id);


-- note this is the most up to date db

-- drop table junction;
-- drop table languages;
-- drop table img;
-- drop table comments;
-- drop table posts;
-- drop table users;

-- CREATE TABLE users(
--     user_id SERIAL PRIMARY KEY,
--     full_name VARCHAR(100),
--     email VARCHAR(50),
--     new_email VARCHAR(50),
--     password TEXT,
--     new_password TEXT,
--     profile_pic TEXT
-- ); 

-- CREATE TABLE posts(
--     user_post_id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(user_id),
--     title VARCHAR(50),
--     content TEXT
-- );

-- CREATE TABLE comments(
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(user_id),
--     post_id INTEGER REFERENCES posts(user_post_id),
--     comments TEXT,
--     bones INTEGER
-- );

-- CREATE TABLE img (
--   img_id SERIAL PRIMARY KEY,
--   post_id int REFERENCES posts(user_post_id), 
--   post_img text
-- );

-- CREATE TABLE languages (
--   languages_id SERIAL PRIMARY KEY,
--   posts_id int REFERENCES posts(user_post_id), 
--   languages text
-- );
 
-- CREATE TABLE junction (
--   id SERIAL PRIMARY KEY,
--   img_id int REFERENCES img(img_id),  
--   post_id int REFERENCES posts(user_post_id),
--   languages_id int REFERENCES languages(languages_id) 
-- );

-- 7/14/2020 12:58 db before changing everything
-- drop table junction;
-- drop table languages;
-- drop table img;
-- drop table comments;
-- drop table posts;
-- drop table users;

-- CREATE TABLE users(
--     user_id SERIAL PRIMARY KEY,
--     full_name VARCHAR(100),
--     email VARCHAR(50),
--     new_email VARCHAR(50),
--     password TEXT,
--     new_password TEXT,
--     profile_pic TEXT
-- ); 

-- CREATE TABLE posts(
--     user_post_id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(user_id),
--     title VARCHAR(50),
--     content TEXT
-- );

-- CREATE TABLE comments(
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(user_id),
--     post_id INTEGER REFERENCES posts(user_post_id),
--     comments TEXT,
--     bones INTEGER
-- );

-- CREATE TABLE img (
--   img_id SERIAL PRIMARY KEY,
--   img_post_id int REFERENCES posts(user_post_id), 
--   post_img text
-- );

-- CREATE TABLE languages (
--   languages_id SERIAL PRIMARY KEY,
--   posts_id int REFERENCES posts(user_post_id), 
--   languages text
-- );
 
-- CREATE TABLE junction (
--   id SERIAL PRIMARY KEY,
--   img_id int REFERENCES img(img_id),  
--   post_id int REFERENCES posts(user_post_id),
--   languages_id int REFERENCES languages(languages_id) 
-- );

-- insert into posts (user_id, title, content)
-- values (1, 'testing post', 'this is a test post');

-- insert into img (img_post_id, post_img)
-- values (6, 'testing.com/pic');

-- insert into languages (posts_id, languages)
-- values (6, 'js, html, css');
 
-- select user_id, user_post_id, img_id, posts.title, posts.content, img.post_img, languages.languages  from posts 
-- join img on posts.user_post_id = img_post_id
-- join languages on posts.user_post_id = posts_id; 