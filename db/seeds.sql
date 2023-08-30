INSERT INTO era (name)
VALUES ("Fall of the Jedi"),
       ("Reign of the Empire"),
       ("Age of Rebellion"),
       ("The New Republic");

INSERT INTO roles (title, salary, era_id)
VALUES ("Jedi Master", 100000, 1),
       ("Jedi Padawan", 50000, 1),
       ("Jedi Master", 100000, 2),
       ("Jedi Padawan", 50000, 2),
       ("Jedi Master", 100000, 3),
       ("Jedi Padawan", 50000, 3),
       ("Jedi Master", 100000, 4),
       ("Jedi Padawan", 50000, 4);
    



INSERT INTO jedi (first_name, last_name, role_id, master_id)
VALUES ("Qui-Gon", "Jinn", 1, NULL),
       ("Obi-Wan", "Kenobi", 2, 1),
       ("Master", "Yoda", 3, NULL),
       ("Luke", "Skywalker", 4, 3),
       ("Anakin", "Skywalker", 5, NULL),
       ("Ahsoka", "Tano", 6, 5),
       ("Mace", "Windu", 7, NULL),
       ("Darth", "Vader", 8, 7);            