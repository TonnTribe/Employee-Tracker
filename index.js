const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db');
require('dotenv').config();
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
    await db.findAllJedi()
    .then(([rows]) => {
        let jedi = rows;
        console.log("\n");
        console.table(jedi);
    })
    .then(() => loadMainPrompts());
}

async function viewRoles() {
    await db.findAllRoles()
    .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
    })
    .then(() => loadMainPrompts());
}

async function viewEras() {
    await db.findAllEras()
    .then(([rows]) => {
        let eras = rows;
        console.log("\n");
        console.table(eras);
    })
    .then (() => loadMainPrompts());
}

async function addJedi() {
    await prompt([
        {
            name: "first_name",
            message: "What is the Jedi's first name?"
        },
        {
            name: "last_name",
            message: "What is the Jedi's last name?"
        }
    ])
    .then(res => {
        let first_name = res.first_name;
        let last_name = res.last_name;

        db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));

            prompt({
                type: "list",
                name: "role_id",
                message: "What is the Jedi's role?",
                choices: roleChoices
            })
            .then(res => {
                let role_id = res.role_id;

                db.findAllJedi()
                .then(([rows]) => {
                    let jedi = rows;
                    const masterChoices = jedi.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));

                    prompt({
                        type: "list",
                        name: "master_id",
                        message: "Who is the Jedi's master?",
                        choices: masterChoices
                    })
                    .then(res => {
                        let master_id = res.master_id;

                        const jedi = {
                            first_name,
                            last_name,
                            role_id,
                            master_id
                        }

                        db.createJedi(jedi);
                    })    
                        .then (() => console.log(`Added ${first_name} ${last_name} to the database`))

                        .then (() => loadMainPrompts());
                    })
                })
            })
        })
    }

async function addRole() {
    db.findAllEras()
    .then(([rows]) => {
        let eras = rows;
        const eraChoices = eras.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        prompt([
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
            choices: eraChoices
            }
        ])
        .then(role => {
            db.createRole(role)
            .then (() => console.log(`Added ${role.title} to the database`))
            .then (() => loadMainPrompts());
        })
    })
}

async function addEra() {
    await prompt([
        {
            name: "name",
            message: "What is the era's name?"
        }
    ])
    .then(era => {
        db.createEra(era)
        .then (() => console.log(`Added ${era.name} to the database`))
        .then (() => loadMainPrompts());
    })
}

async function updateJediRole() {
    db.findAllJedi()
    .then(([rows]) => {
        let jedi = rows;
        const jediChoices = jedi.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        prompt([
            {
                type: "list",
                name: "id",
                message: "Which Jedi's role do you want to update?",
                choices: jediChoices
            }
        ])
        .then(res => {
            let jedi_id = res.id;
            db.findAllRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));

                prompt([
                    {
                        type: "list",
                        name: "role_id",
                        message: "Which role do you want to assign the Jedi?",
                        choices: roleChoices
                    }
                ])
                .then(res => db.updateJediRole(jedi_id, res.role_id))
                .then (() => console.log("Updated Jedi's role"))
                .then (() => loadMainPrompts());
            });
        });
    })
}

async function updateJediMaster() {
    db.findAllJedi()
    .then(([rows]) => {
        let jedi = rows;
        const jediChoices = jedi.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        prompt([
            {
                type: "list",
                name: "id",
                message: "Which Jedi's master do you want to update?",
                choices: jediChoices
            }
        ])
        .then(res => {
            let jedi_id = res.id;
            db.findAllJedi()
            .then(([rows]) => {
                let masters = rows;
                const masterChoices = masters.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));

                prompt([
                    {
                        type: "list",
                        name: "master_id",
                        message: "Which Jedi do you want to assign as the master?",
                        choices: masterChoices
                    }
                ])
                .then(res => db.updateJediMaster(jedi_id, res.master_id))
                .then (() => console.log("Updated Jedi's master"))
                .then (() => loadMainPrompts());
            });
        });
    })
}

async function removeJedi() {
    db.findAllJedi()
    .then(([rows]) => {
        let jedi = rows;
        const jediChoices = jedi.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        prompt([
            {
                type: "list",
                name: "id",
                message: "Which Jedi do you want to remove?",
                choices: jediChoices
            }
        ])
        .then(res => db.removeJedi(res.id))
        .then (() => console.log("Removed Jedi from the database"))
        .then (() => loadMainPrompts());
    })
}

async function removeRole() {
    db.findAllRoles()
    .then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));

        prompt([
            {
                type: "list",
                name: "id",
                message: "Which role do you want to remove?",
                choices: roleChoices
            }
        ])
        .then(res => db.removeRole(res.id))
        .then (() => console.log("Removed role from the database"))
        .then (() => loadMainPrompts());
    })
}

async function removeEra() {
    db.findAllEras()
    .then(([rows]) => {
        let eras = rows;
        const eraChoices = eras.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        prompt([
            {
                type: "list",
                name: "id",
                message: "Which era do you want to remove?",
                choices: eraChoices
            }
        ])
        .then(res => db.removeEra(res.id))
        .then (() => console.log("Removed era from the database"))
        .then (() => loadMainPrompts());
    })
}

function quit() {
    console.log("May the Force be with you!");
    process.exit();
}
