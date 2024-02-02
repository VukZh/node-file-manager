import {createInterface} from 'readline/promises';
import {stdin, stdout} from 'process';
import {fileURLToPath} from 'url';
import {dirname} from "path";

import list from "./fs/currentDir.js";
import username from "./os/username.js";
import eol from "./os/eol.js";
import homedir from "./os/homedir.js";
import architecture from "./os/architecture.js";
import cpus from "./os/cpus.js";

let currentDir = dirname(fileURLToPath(import.meta.url));

const rl = createInterface({
    input: stdin,
    output: stdout
});


let userName = "";
if (process.argv[2] && process.argv[2].startsWith("--username=")) {
    userName = process.argv[2].slice(11);
} else {
    userName = "Noname";
}
console.log("\x1b[32m", `Welcome to the File Manager, ${userName}!`, "\x1b[0m")
console.log("\x1b[90m", `You are currently in ${currentDir}`, "\x1b[0m" );

rl.on('line', async (commandTxt) => {
    if (commandTxt === ".exit") {
        rl.close()
    }
    if (commandTxt === "ls") {
        const dirItems = await list(currentDir);
        console.table(dirItems, ['Name', 'Type']);
        console.log("\x1b[90m", `You are currently in ${currentDir}`, "\x1b[0m");
    }
    if (commandTxt === "up") {
        currentDir = dirname(currentDir);
        console.log("\x1b[90m", `You are currently in ${currentDir}`, "\x1b[0m");
    }
    if (commandTxt === "os --username") {
        console.log(username());
        console.log("\x1b[90m", `You are currently in ${currentDir}`, "\x1b[0m");
    }
    if (commandTxt === "os --EOL") {
        console.log(eol());
        console.log("\x1b[90m", `You are currently in ${currentDir}`, "\x1b[0m");
    }
    if (commandTxt === "os --homedir") {
        console.log(homedir());
        console.log("\x1b[90m", `You are currently in ${currentDir}`, "\x1b[0m");
    }
    if (commandTxt === "os --architecture") {
        console.log(architecture());
        console.log("\x1b[90m", `You are currently in ${currentDir}`, "\x1b[0m");
    }
    if (commandTxt === "os --cpus") {
        const cpuItems = cpus();
        console.table(cpuItems, ['model', 'speed']);
        console.log("\x1b[90m", `You are currently in ${currentDir}`, "\x1b[0m");
    }
});

rl.on('close', () => {
    console.log("\x1b[32m", `Thank you for using File Manager, ${userName}, goodbye!`, "\x1b[0m");
});