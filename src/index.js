import {createInterface} from 'readline/promises';
import {stdin, stdout} from 'process';
import {dirname} from "path";
import {fileURLToPath} from 'url';

import list from "./fs/currentDir.js";
import username from "./os/username.js";
import eol from "./os/eol.js";
import homedir from "./os/homedir.js";
import architecture from "./os/architecture.js";
import cpus from "./os/cpus.js";
import hash from "./fs/hash.js";
import cd from "./fs/cd.js";
import cat from "./fs/cat.js";
import del from "./fs/del.js";
import rn from "./fs/rn.js";
import cp from "./fs/cp.js";
import add from "./fs/add.js";
import mv from "./fs/mv.js";
import compress from "./fs/compress.js";
import decompress from "./fs/decompress.js";

// let currentDir = homedir();
let currentDir = dirname(fileURLToPath(import.meta.url));

const currentDirPrint = (dir) => {
    console.log("\x1b[90m", `You are currently in ${dir}`, "\x1b[0m");
}

const operationFailedPrint = () => {
    console.log("\x1b[91m", "Operation failed", "\x1b[0m");
}

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
currentDirPrint(currentDir);

rl.on('line', async (commandTxt) => {
    if (commandTxt === ".exit") {
        rl.close()
    }
    if (commandTxt === "ls") {
        try {
            const dirItems = await list(currentDir);
            console.table(dirItems, ['Name', 'Type']);
            currentDirPrint(currentDir);
        } catch (e) {
            operationFailedPrint()
        }
    }
    if (commandTxt === "up") {
        currentDir = dirname(currentDir);
        currentDirPrint(currentDir);
    }
    if (commandTxt === "os --username") {
        console.log(username());
        currentDirPrint(currentDir);
    }
    if (commandTxt === "os --EOL") {
        console.log(eol());
        currentDirPrint(currentDir);
    }
    if (commandTxt === "os --homedir") {
        console.log(homedir());
        currentDirPrint(currentDir);
    }
    if (commandTxt === "os --architecture") {
        console.log(architecture());
        currentDirPrint(currentDir);
    }
    if (commandTxt === "os --cpus") {
        const cpuItems = cpus();
        console.table(cpuItems, ['model', 'speed']);
        currentDirPrint(currentDir);
    }
    if (commandTxt.startsWith("hash ")) {
        try {
            await hash(commandTxt.split(' ')[1], currentDir, () => currentDirPrint(currentDir));
        } catch (e) {
            operationFailedPrint()
        }
    }
    if (commandTxt.startsWith("cd ")) {
        try {
            currentDir = await cd(commandTxt.slice(2).trim(), currentDir);
            currentDirPrint(currentDir);
        } catch (e) {
            operationFailedPrint()
        }
    }
    if (commandTxt.startsWith("cat ")) {
        try {
            await cat(commandTxt.split(' ')[1], currentDir, () => currentDirPrint(currentDir));
        } catch (e) {
            operationFailedPrint()
        }
    }
    if (commandTxt.startsWith("rm ")) {
        try {
            await del(commandTxt.split(' ')[1], currentDir, () => currentDirPrint(currentDir));
        } catch (e) {
            operationFailedPrint()
        }

    }
    if (commandTxt.startsWith("rn ")) {
        try {
            await rn(commandTxt.split(' ')[1], commandTxt.split(' ')[2], currentDir, () => currentDirPrint(currentDir));
        } catch (e) {
            operationFailedPrint()
        }

    }
    if (commandTxt.startsWith("cp ")) {
        try {
            await cp(commandTxt.split(' ')[1], commandTxt.split(' ')[2], currentDir, () => currentDirPrint(currentDir));
        } catch (e) {
            operationFailedPrint()
        }

    }
    if (commandTxt.startsWith("add ")) {
        try {
            await add(commandTxt.split(' ')[1], currentDir, () => currentDirPrint(currentDir));
        } catch (e) {
            operationFailedPrint()
        }
    }
    if (commandTxt.startsWith("mv ")) {
        try {
            await mv(commandTxt.split(' ')[1], currentDir, commandTxt.split(' ')[2], () => currentDirPrint(currentDir));
        } catch (e) {
            operationFailedPrint()
        }
    }
    if (commandTxt.startsWith("compress ")) {
        try {
            await compress(commandTxt.split(' ')[1], currentDir, commandTxt.split(' ')[2], () => currentDirPrint(currentDir));
        } catch (e) {
            operationFailedPrint()
        }
    }
    if (commandTxt.startsWith("decompress ")) {
        try {
            await decompress(commandTxt.split(' ')[1], currentDir, commandTxt.split(' ')[2], () => currentDirPrint(currentDir));
        } catch (e) {
            operationFailedPrint()
        }
    }
});

rl.on('close', () => {
    console.log("\x1b[32m", `Thank you for using File Manager, ${userName}, goodbye!`, "\x1b[0m");
});