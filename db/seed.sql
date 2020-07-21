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
    user_id INTEGER REFERENCES users(user_id),
    title VARCHAR(50),
    content TEXT,
    post_date TEXT
);

CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    post_comments_id INTEGER REFERENCES posts(post_id),
    comments TEXT
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
  languages text,
  languages_img text 
);

CREATE TABLE bones (
  bones_id SERIAL PRIMARY KEY,
  post_bones_id int REFERENCES posts(post_id), 
  bones int
);
 
CREATE TABLE junction (
  junction_id SERIAL PRIMARY KEY,
  user_junction_id int REFERENCES users(user_id),
  post_junction_id int REFERENCES posts(post_id),
  img_junction_id int REFERENCES img(img_id),  
  languages_junction_id int REFERENCES languages(languages_id),
  comments_junction_id int REFERENCES comments(comment_id)
);


 