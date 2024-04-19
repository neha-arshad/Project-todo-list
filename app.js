#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkanimation from "chalk-animation";
const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));
const animation = chalkanimation.rainbow("Wellcome To My Todo-List📝");
await sleep();
animation.stop();
const todo = [];
let Todos = true;
async function myTodo() {
    while (Todos) {
        const mytodos = await inquirer.prompt([
            {
                name: "option",
                type: "list",
                message: "select an option",
                choices: ["Add", "change", "remove", "view list", "Exit"],
            },
        ]);
        if (mytodos.option === "Add") {
            await add();
        }
        else if (mytodos.option === "change") {
            await change();
        }
        else if (mytodos.option === "remove") {
            await remove();
        }
        else if (mytodos.option === "view list") {
            await view();
        }
        else if (mytodos.option === "Exit") {
            Todos = false;
        }
        // >> "ADD" <<
        async function add() {
            const addTodo = await inquirer.prompt([
                {
                    name: "addtodos",
                    type: "input",
                    message: chalk.magenta.blueBright.bold("What would you like to add in todos?"),
                },
            ]);
            todo.push(addTodo.addtodos);
            console.log(chalk.blackBright(`\n ${addTodo.addtodos} Add successfully ☑️ \n`));
        }
        // >> "CHANGE" <<
        async function change() {
            await view();
            const changeTodos = await inquirer.prompt([
                {
                    name: "index",
                    type: "number",
                    message: chalk.magenta.blueBright.bold("which Todo you want to change?\n Enter index No:"),
                },
                {
                    name: "newtodo",
                    type: "input",
                    message: chalk.magenta.blueBright.bold("What would you like to add in todos?"),
                },
            ]);
            todo[changeTodos.index] = changeTodos.newtodo;
            console.log(chalk.redBright(`\n new todo ${changeTodos.newtodo}`));
        }
        // >> "REMOVE" <<
        async function remove() {
            await view();
            const removeTodo = await inquirer.prompt([
                {
                    name: "index",
                    type: "number",
                    message: chalk.magenta.blueBright.bold("what would you like to remove in todos?"),
                },
            ]);
            let Removetodo = todo.splice(removeTodo.index, 1);
            console.log(Removetodo);
        }
        // >>"VIEW LIST"<<
        async function view() {
            console.log(chalk.magentaBright.italic(`\n Your Todo-List\n`));
            todo.forEach((view, index) => {
                console.log(`${index}: ${view}`);
            });
        }
    }
}
myTodo();
