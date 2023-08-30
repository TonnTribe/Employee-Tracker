const connection = require('../config/connection');

class db {
    constructor(connection) {
        this.connection = connection;
    }

    // Find all jedi, join with roles and eras to display their roles, salaries, eras, and masters
    findAllJedi() {
        return this.connection.promise().query(
            "SELECT jedi.id, jedi.first_name, jedi.last_name, role.title, role.name AS role, role.salary, CONCAT(master.first_name, ' ', master.last_name) AS master FROM jedi LEFT JOIN role on jedi.role_id = role.id LEFT JOIN era on role.era_id = era.id LEFT JOIN jedi master on master.id = jedi.master_id;"
        );
    }

    // Find all jedi except the given jedi id
    findAllPossibleMasters(jediId) {
        return this.connection.promise().query(
          "SELECT id, first_name, last_name FROM jedi WHERE id != ?",
          jediId
        );
    }

    // Create a new jedi
    createJedi(jedi) {
        return this.connection.promise().query("INSERT INTO jedi SET ?", jedi);
    }

    // Remove a jedi with the given id
    removeJedi(jediId) {
        return this.connection.promise().query(
          "DELETE FROM jedi WHERE id = ?",
          jediId
        );
    }

    // Update the given jedi's role
    updateJediRole(jediId, roleId) {
        return this.connection.promise().query(
          "UPDATE jedi SET role_id = ? WHERE id = ?",
          [roleId, jediId]
        );
    }

    // Update the given jedi's master
    updateJediMaster(jediId, masterId) {
        return this.connection.promise().query(
          "UPDATE jedi SET master_id = ? WHERE id = ?",
          [masterId, jediId]
        );
    }

    // Find all roles, join with eras to display the era name
    findAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, role.name AS role, role.salary, era.name AS era FROM role LEFT JOIN era on role.era_id = era.id;"
        );
    }

    // Create a new role
    createRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    }

    // Remove a role from the db
    removeRole(roleId) {
        return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
    }

    // Find all eras, join with roles to display role titles
    findAllEras() {
        return this.connection.promise().query(
            "SELECT era.id, era.name, COUNT(role.id) AS count FROM era LEFT JOIN role ON role.era_id = era.id GROUP BY era.id, era.name;"
        );
    }

    // Remove an era from the db
    removeEra(eraId) {
        return this.connection.promise().query("DELETE FROM era WHERE id = ?", eraId);
    }

    // Find all masters, join with roles to display roles titles
    findAllMasters() {
        return this.connection.promise().query(
            "SELECT jedi.id, jedi.first_name, jedi.last_name, role.title FROM jedi LEFT JOIN role on jedi.role_id = role.id WHERE jedi.id IN (SELECT master_id FROM jedi);"
        );
    }

    // Create a new era
    createEra(era) {
        return this.connection.promise().query("INSERT INTO era SET ?", era);
    }

    // Create a new master
    createMaster(master) {
        return this.connection.promise().query("INSERT INTO jedi SET ?", master);
    }

    // Remove a master from the db
    removeMaster(masterId) {
        return this.connection.promise().query("DELETE FROM jedi WHERE id = ?", masterId);
    }

    // Find all masters and their apprentices
    findAllMastersAndApprentices() {
        return this.connection.promise().query(
            "SELECT master.first_name AS master_first_name, master.last_name AS master_last_name, apprentice.first_name AS apprentice_first_name, apprentice.last_name AS apprentice_last_name FROM jedi master LEFT JOIN jedi apprentice ON apprentice.master_id = master.id;"
        );
    }

    // Find all apprentices and their masters
    findAllApprenticesAndMasters() {
        return this.connection.promise().query(
            "SELECT apprentice.first_name AS apprentice_first_name, apprentice.last_name AS apprentice_last_name, master.first_name AS master_first_name, master.last_name AS master_last_name FROM jedi apprentice LEFT JOIN jedi master ON apprentice.master_id = master.id;"
        );
    }
}

module.exports = new db(connection);