CREATE USER IF NOT EXISTS piperr_admin;

DROP DATABASE IF EXISTS piperr_db;
CREATE DATABASE IF NOT EXISTS piperr_db;
USE piperr_db;

GRANT ALL PRIVILEGES ON piperr_db.* TO 'piperr_admin'@'%';


DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    username varchar(50),
    profile_picture varchar(100),
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS posts;

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT,
    content varchar(1000),

    upvotes INT DEFAULT 0,
    downvotes INT DEFAULT 0,
    replies INT DEFAULT 0,
    publish_date date DEFAULT CURRENT_DATE,

    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS replies;

CREATE TABLE IF NOT EXISTS replies (
    id INT AUTO_INCREMENT,
    content varchar(500),

    publish_date date DEFAULT CURRENT_DATE,

    user_id INT NOT NULL,
    post_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    PRIMARY KEY (id)
);


CREATE TRIGGER add_reply 
AFTER INSERT ON replies
FOR EACH ROW
UPDATE posts
SET posts.replies = posts.replies + 1
WHERE posts.id = new.post_id; 

CREATE TRIGGER remove_reply 
AFTER DELETE ON replies
FOR EACH ROW
UPDATE posts
SET posts.replies = posts.replies - 1
WHERE posts.id = old.post_id; 
