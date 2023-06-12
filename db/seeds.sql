INSERT INTO department (dep_name)
VALUES ("Fall of the Jedi"),
       ("Rise of the First Order"),
       ("Clone Wars"),
       ("Age of Rebellion");

INSERT INTO roles (title, salary, department_id)
VALUES ("Jedi Master", 100000, 1),
       ("Jedi Knight", 50000, 1),
       ("Last Jedi Master", 120000, 2),
       ("Padawan", 65000, 2),
       ("General", 150000, 3),
       ("Jedi Padawan", 90000, 3),
       ("Emperor", 125000, 4),
       ("Sith Lord", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Qui-Gon", "Jinn", 1, NULL),
       ("Obi-Wan", "Kenobi", 2, 1),
       ("Luke", "Skywalker", 3, NULL),
       ("Kylo", "Ren", 4, 3),
       ("Anakin", "Skywalker", 5, NULL),
       ("Ahsoka", "Tano", 6, 5),
       ("Lord", "Palpatine", 7, NULL),
       ("Darth", "Vader", 8, 7);            