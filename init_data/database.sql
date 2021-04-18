DROP TABLE IF EXISTS user CASCADE;
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(50) NOT NULL,  
    pwd VARCHAR(50) NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    uni VARCHAR(50) NOT NULL,
    home_country VARCHAR(50)
);

DROP TABLE IF EXISTS interests CASCADE;
CREATE TABLE IF NOT EXISTS interests (
    email VARCHAR(50) NOT NULL,  
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    home_country VARCHAR(50)
    interest1 VARCHAR(50),
    interest2 VARCHAR(50),
    interest3 VARCHAR(50),
    interest4 VARCHAR(50),
    interest5 VARCHAR(50)
);


INSERT INTO user(email, pwd, firstname, lastname, uni, home_country)
VALUES ('mach2623@colorado.edu', '123', 'Marcus', 'Chong', 'University of Colorado Boulder', 'USA')
('asge@colorado.edu', '123', 'Tom', 'James', 'University of Colorado Boulder', 'USA'),
('ydhe@colorado.edu', '123', 'Jerry', 'Winehouse', 'University of Colorado Boulder', 'USA'),
('urrg@colorado.edu', '123', 'Jamie', 'Gardner', 'University of Colorado Boulder', 'USA'),
('jres@colorado.edu', '123', 'Tasha', 'Schofield', 'University of Colorado Boulder', 'USA'),
('jserf@colorado.edu', '123', 'Abdulluh', 'Karki', 'University of Colorado Boulder', 'Nepal'),
('jwth@colorado.edu', '123', 'Magnus', 'Hansen', 'University of Colorado Boulder', 'Norway'),
('asdh@colorado.edu', '123', 'Mia', 'Muller', 'University of Colorado Boulder', 'Germany'),
('liuj@colorado.edu', '123', 'JaoWei', 'Yi', 'University of Colorado Boulder', 'China'),
('ruky@colorado.edu', '123', 'Zawadi', 'Nyongo', 'University of Colorado Boulder', 'Kenya')
;

INSERT INTO user(email, firstname, lastname, interest1, interest2, interest3, interest4, interest5)
VALUES ('mach2623@colorado.edu', 'Marcus', 'Chong', 'basketball', 'gaming', 'rap music', 'coding', 'dogs'),
('asge@colorado.edu', 'Tom', 'James', 'soccer', 'basketball', 'gaming', 'drawing', 'hiking')
('ydhe@colorado.edu', 'Jerry', 'Winehouse', 'origami', 'crochet', 'cooking', 'rap music', 'hiking')
('urrg@colorado.edu', 'Jamie', 'Gardner', 'crochet', 'cooking', 'dancing', 'origami', 'hiking')
('jres@colorado.edu', 'Tasha', 'Schofield', 'photography', 'writing', 'gardening', 'scrapbooking', 'reading'),
('jserf@colorado.edu', 'Abdulluh', 'Karki', 'basketball', 'gaming', 'rap music', 'coding', 'dogs'),
('jwth@colorado.edu', 'Magnus', 'Hansen', 'soccer', 'basketball', 'gaming', 'drawing', 'hiking')
('asdh@colorado.edu', 'Mia', 'Muller', 'crochet', 'cooking', 'dancing', 'origami', 'hiking')
('liuj@colorado.edu', 'JaoWei', 'Yi', 'photography', 'writing', 'gardening', 'scrapbooking', 'reading')
('jruky@colorado.edu', 'Zawadi', 'Nyongo', 'photography', 'writing', 'gardening', 'scrapbooking', 'reading')
;