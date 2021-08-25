CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  gender VARCHAR(1),
  age TEXT NOT NULL,
  location VARCHAR(5),
  friend_radius INTEGER CHECK (friend_radius >= 0 AND friend_radius <= 200)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  from_user VARCHAR(25) NOT NULL
    REFERENCES users ON DELETE CASCADE,
  to_user VARCHAR(25) NOT NULL
    REFERENCES users ON DELETE CASCADE
);

CREATE TABLE likes (
  user_liking VARCHAR(25) NOT NULL
    REFERENCES users ON DELETE CASCADE,
  user_liked VARCHAR(25) NOT NULL
    REFERENCES users ON DELETE CASCADE,   
  PRIMARY KEY (user_liking, user_liked)
);

CREATE TABLE hobbies (
  name TEXT PRIMARY KEY
);

CREATE TABLE users_hobbies (
  username VARCHAR(25) 
    REFERENCES users ON DELETE CASCADE,
  hobbies TEXT 
    REFERENCES hobbies ON DELETE CASCADE
);

CREATE TABLE interests (
  name TEXT PRIMARY KEY
);

CREATE TABLE users_interests (
  username VARCHAR(25) 
    REFERENCES users ON DELETE CASCADE,
  interests TEXT 
    REFERENCES interests ON DELETE CASCADE
);