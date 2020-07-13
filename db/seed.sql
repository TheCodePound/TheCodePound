CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(50)
    password TEXT,
    profile_pic TEXT
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(50),
    img TEXT,
    content TEXT
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id),
    comments TEXT,
    bones INTEGER
);

CREATE TABLE img (
  id SERIAL PRIMARY KEY,
  post_id int,
  post_img text
);

CREATE TABLE languages (
  id SERIAL PRIMARY KEY,
  languages text
);

CREATE TABLE junction (
  id SERIAL PRIMARY KEY,
  posts_id int,
  languages_id int
);

ALTER TABLE posts ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE comments ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE comments ADD FOREIGN KEY (post_id) REFERENCES posts (id);

ALTER TABLE img ADD FOREIGN KEY (post_id) REFERENCES posts (id);

ALTER TABLE languages ADD FOREIGN KEY (languages) REFERENCES posts (id);

ALTER TABLE junction ADD FOREIGN KEY (posts_id) REFERENCES posts (id);

ALTER TABLE junction ADD FOREIGN KEY (languages_id) REFERENCES languages (id);


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