const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db');
require('console.table');

init();

// Display logo text, load main prompts
function init() {
    const logoText = logo({ name: "Star Wars" }).render();

    console.log(logoText);

    loadMainPrompts();
}

async function loadMainPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View Jedi",
                    value: "VIEW_JEDI"
                },
                {
                    name: "View Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View Eras",
                    value: "VIEW_ERAS"
                },
                {
                    name: "Add Jedi",
                    value: "ADD_JEDI"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add Era",
                    value: "ADD_ERA"
                },
                {
                    name: "Update Jedi Role",
                    value: "UPDATE_JEDI_ROLE"
                },
                {
                    name: "Update Jedi Master",
                    value: "UPDATE_JEDI_MASTER"
                },
                {
                    name: "Remove Jedi",
                    value: "REMOVE_JEDI"
                },
                {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "Remove Era",
                    value: "REMOVE_ERA"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case "VIEW_JEDI":
                viewJedi();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_ERAS":
                viewEras();
                break;
            case "ADD_JEDI":
                addJedi();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_ERA":
                addEra();
                break;
            case "UPDATE_JEDI_ROLE":
                updateJediRole();
                break;
            case "UPDATE_JEDI_MASTER":
                updateJediMaster();
                break;
            case "REMOVE_JEDI":
                removeJedi();
                break;
            case "REMOVE_ROLE":
                removeRole();
                break;
            case "REMOVE_ERA":
                removeEra();
                break;
            default:
                quit();
        }
    })
}

async function viewJedi() {
    const jedi = await db.findAllJedi();

    console.log("\n");
    console.table(jedi);

    loadMainPrompts();
}

async function viewRoles() {
    const roles = await db.findAllRoles();

    console.log("\n");
    console.table(roles);

    loadMainPrompts();
}

async function viewEras() {
    const eras = await db.findAllEras();

    console.log("\n");
    console.table(eras);

    loadMainPrompts();
}

async function addJedi() {
    const roles = await db.findAllRoles();
    const masters = await db.findAllJedi();

    const jedi = await prompt([
        {
            name: "first_name",
            message: "What is the Jedi's first name?"
        },
        {
            name: "last_name",
            message: "What is the Jedi's last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the Jedi's role?",
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        },
        {
            type: "list",
            name: "master_id",
            message: "Who is the Jedi's master?",
            choices: masters.map(master => ({
                name: `${master.first_name} ${master.last_name}`,
                value: master.id
            }))
        }
    ]);

    await db.createJedi(jedi);

    console.log(`Added ${jedi.first_name} ${jedi.last_name} to the database`);

    loadMainPrompts();
}

async function addRole() {
    const eras = await db.findAllEras();

    const role = await prompt([
        {
            name: "title",
            message: "What is the role's title?"
        },
        {
            name: "salary",
            message: "What is the role's salary?"
        },
        {
            type: "list",
            name: "era_id",
            message: "Which era does the role belong to?",
            choices: eras.map(era => ({
                name: era.name,
                value: era.id
            }))
        }
    ]);

    await db.createRole(role);

    console.log(`Added ${role.title} to the database`);

    loadMainPrompts();
}

async function addEra() {
    const era = await prompt([
        {
            name: "name",
            message: "What is the era's name?"
        }
    ]);

    await db.createEra(era);

    console.log(`Added ${era.name} to the database`);

    loadMainPrompts();
}

async function updateJediRole() {
    const jedi = await db.findAllJedi();
    const roles = await db.findAllRoles();

    const jediRole = await prompt([
        {
            type: "list",
            name: "id",
            message: "Which Jedi's role do you want to update?",
            choices: jedi.map(jedi => ({
                name: `${jedi.first_name} ${jedi.last_name}`,
                value: jedi.id
            }))
        },
        {
            type: "list",
            name: "role_id",
            message: "Which role do you want to assign the Jedi?",
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        }
    ]);

    await db.updateJediRole(jediRole.id, jediRole.role_id);

    console.log("Updated Jedi's role");

    loadMainPrompts();
}

async function updateJediMaster() {
    const jedi = await db.findAllJedi();

    const jediMaster = await prompt([
        {
            type: "list",
            name: "id",
            message: "Which Jedi's master do you want to update?",
            choices: jedi.map(jedi => ({
                name: `${jedi.first_name} ${jedi.last_name}`,
                value: jedi.id
            }))
        },
        {
            type: "list",
            name: "master_id",
            message: "Which Jedi do you want to set as master for the Jedi?",
            choices: jedi.map(master => ({
                name: `${master.first_name} ${master.last_name}`,
                value: master.id
            }))
        }
    ]);

    await db.updateJediMaster(jediMaster.id, jediMaster.master_id);

    console.log("Updated Jedi's master");

    loadMainPrompts();
}

async function removeJedi() {
    const jedi = await db.findAllJedi();

    const jediChoice = await prompt([
        {
            type: "list",
            name: "id",
            message: "Which Jedi do you want to remove?",
            choices: jedi.map(jedi => ({
                name: `${jedi.first_name} ${jedi.last_name}`,
                value: jedi.id
            }))
        }
    ]);

    await db.removeJedi(jediChoice.id);

    console.log("Removed Jedi from the database");

    loadMainPrompts();
}

async function removeRole() {
    const roles = await db.findAllRoles();

    const roleChoice = await prompt([
        {
            type: "list",
            name: "id",
            message: "Which role do you want to remove?",
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        }
    ]);

    await db.removeRole(roleChoice.id);

    console.log("Removed role from the database");

    loadMainPrompts();
}

async function removeEra() {
    const eras = await db.findAllEras();

    const eraChoice = await prompt([
        {
            type: "list",
            name: "id",
            message: "Which era do you want to remove?",
            choices: eras.map(era => ({
                name: era.name,
                value: era.id
            }))
        }
    ]);

    await db.removeEra(eraChoice.id);

    console.log("Removed era from the database");

    loadMainPrompts();
}

function quit() {
    console.log("May the Force be with you!");
    process.exit();
}
