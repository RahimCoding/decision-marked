DROP TABLE IF EXISTS polls;
CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  question TEXT NOT NULL,
  option TEXT[],
  url VARCHAR(255) NOT NULL,
  sent_email VARCHAR(255)[],
  ranking integer[]
);
