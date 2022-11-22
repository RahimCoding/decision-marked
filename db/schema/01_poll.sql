DROP TABLE IF EXISTS polls;
CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  question TEXT NOT NULL,
  url VARCHAR(255) NOT NULL,
  sent_email VARCHAR(255)[]
);

DROP TABLE IF EXISTS polls_options;
CREATE TABLE polls_options (
  id SERIAL PRIMARY KEY NOT NULL,
  option TEXT,
 ranking integer,
 polls_id INTEGER REFERENCES polls(id)
);


