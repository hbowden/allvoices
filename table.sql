
CREATE TABLE Files
(
   file_name VARCHAR ( 255 ) UNIQUE NOT NULL,
   file_id SERIAL,
   PRIMARY KEY (file_id)
);

CREATE TABLE CSVRows (
   first_name VARCHAR ( 255 ) NOT NULL,
   last_name VARCHAR ( 255 ) NOT NULL,
   row_id INTEGER NOT NULL,
   file_id INT NOT NULL,
   CONSTRAINT fk_file_id FOREIGN KEY(file_id) REFERENCES Files(file_id) 
);