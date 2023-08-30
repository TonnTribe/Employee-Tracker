INSERT INTO era (name)
VALUES ("Fall of the Jedi"),
       ("Reign of the Empire"),
       ("Age of Rebellion"),
       ("The New Republic");

INSERT INTO role (title, salary, era_id)
VALUES ("Jedi Master", 100000, 1),
       ("Jedi Padawan", 50000, 1),
         ("Jedi Grand Master", 150000, 2),
         ("Jedi Knight", 75000, 2),
         ("Jedi Youngling", 25000, 3),
         ("Jedi General", 125000, 3),
         ("Jedi Council Member", 175000, 4),
         ("Jedi Temple Guard", 100000, 4);
       
    



INSERT INTO jedi (first_name, last_name, role_id, master_id)
VALUES ("Qui-Gon", "Jinn", 1, NULL),
       ("Obi-Wan", "Kenobi", 2, 1),
       ("Master", "Yoda", 3, NULL),
       ("Luke", "Skywalker", 2, 3),
       ("Anakin", "Skywalker", 4, NULL),
       ("Ahsoka", "Tano", 2, 5),
       ("Mace", "Windu", 7, NULL),
       ("Depa", "Billaba", 2, 7);            