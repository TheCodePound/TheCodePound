# CodePound- Group Project
## Members:
Benjamin Doggett, Eric Camp, Jason Towner, Paul Brooks

## IDEA and USER:
Welcome to the CodePound! A social media site geared toward developers and the ability for said developers to share the creative projects they have built throughout their careers. The CodePound is comparable to Instagram in sense of the post comment/ like of each project (the “like” can be a “bone” or something to set itself apart) However, not only does it allow developers to share projects, but receive feedback and or help on projects in order to better refine these projects for live hosting. Thus, when employers or others see these projects there is a more polished project backed by a community of developers who are helping one another grow... Also great for any developer hoping to get some extra teaching experience and learn some new things by helping other developers.

## Features:
<img src = "./pictures/mvp-part1.png">
<img src = "./pictures/mvp-part2.png">

## Tree / Controller-WireFrame / Mockups
### Tree
<img src = "./pictures/Tree FINAL.png">

### Controller
<img src = "./pictures/Controller-wireframe FINAL.png">

### Mockups
### Landing component
<img src = "./pictures/Landing FINAL component.png">

### Register component
<img src = "./pictures/Register component.png">

### Home component
<img src = "./pictures/Home FINAL 3 component.png">

### Home adding a language view
<img src = "./pictures/Language Select Screen.png">

### Home adding a image to your project
<img src = "./pictures/Add a image.png">

### Home adding a comment to a post
<img src = "./pictures/Comment view.png">

### Profile component
<img src = "./pictures/Profile FINAL 3 component.png">

### Update user profile component
<img src = "./pictures/Profile Update view.png">

### Click a individual post
<img src = "./pictures/Click post.png">

### Edit individual post
<img src = "./pictures/Edit post.png">

## Schema (DataBase Design):
<img src = "./pictures/finished-db-codepound.png">


### Users TABLE
```SQL
create table users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(50),
    new_email VARCHAR(50),
    password TEXT,
    new_password TEXT,
    profile_pic TEXT 
);
```

### Posts TABLE 
```SQL
CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    title VARCHAR(50),
    content TEXT,
    post_date TEXT
);
```

### Comments TABLE
```SQL 
CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    post_comments_id INTEGER REFERENCES posts(post_id),
    comments TEXT
);
```

### image TABLE 
```SQL 
CREATE TABLE img (
  img_id SERIAL PRIMARY KEY,
  user_img_id int REFERENCES users(user_id),
  post_img_id int REFERENCES posts(post_id), 
  img text
); 
```

### languages TABLE 
```SQL
CREATE TABLE languages (
  languages_id SERIAL PRIMARY KEY,
  user_languages_id int REFERENCES users(user_id),
  post_languages_id int REFERENCES posts(post_id), 
  languages text,
  languages_img text 
);
```
### bones TABLE 
```SQL
CREATE TABLE bones (
  bones_id SERIAL PRIMARY KEY,
  post_bones_id int REFERENCES posts(post_id), 
  bones int
);
```

### junction TABLE 
```SQL
CREATE TABLE junction (
  junction_id SERIAL PRIMARY KEY,
  user_junction_id int REFERENCES users(user_id),
  post_junction_id int REFERENCES posts(post_id)
);
```
