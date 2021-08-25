INSERT INTO users (username, password, first_name, last_name, email, 
                    gender, age, location, friend_radius)
VALUES ('testuser1',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test1',
        'User1',
        'lancelee@test.com',
        'M',
        '19',
        '12345',
        100),
       ('testuser2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test2',
        'User2',
        'lancelee@test.com',
        'M',
        '19',
        '12345',
        100);

INSERT INTO messages(text, from_user, to_user)
VALUES ('test message1',
        'testuser1',
        'testuser2'),
       ('test message2',
        'testuser2',
        'testuser1');

INSERT INTO likes (user_liking, user_liked)
VALUES ('testuser1',
        'testuser2'),
       ('testuser2',
        'testuser1');

INSERT INTO hobbies (name) 
VALUES ('hiking'),
       ('swimming'),
       ('cooking'),
       ('reading');

INSERT INTO users_hobbies (username, hobbies)
VALUES ('testuser1',
        'hiking'),
       ('testuser2',
        'swimming');

INSERT INTO interests (name) 
VALUES ('games'),
       ('basketball'),
       ('cars');

INSERT INTO users_interests (username, interests)
VALUES ('testuser1',
        'cars'),
       ('testuser2',
        'basketball');