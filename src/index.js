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

let currentDir = homedir();

const currentDirPrint = (dir) => {
    console.log("\x1b[90m", `You are currently in ${dir}`, "\x1b[0m");
}

const errorPrint = (error) => {
    if (error.message === "Invalid input") {
        console.log("\x1b[33m", "Invalid input", "\x1b[0m");
    } else {
        console.log("\x1b[91m", "Operation failed", "\x1b[0m");
    }
}

const inputSplitter = (input) => {
    const regex = /"([^"]+)"|\S+/g;
    const matches = input.match(regex) || [];
    const splittedInput = [];

    for (let match of matches) {
        if (match.startsWith('"')) {
            splittedInput.push(match.slice(1, -1));
        } else {
            splittedInput.push(match);
        }
    }
    return splittedInput;
}

const rl = createInterface({
    input: stdin,
    output: stdout
});


let userName = "";
if (process.argv[2] && process.argv[2].startsWith("--username=")) {
    userName = process.argv[2].split('=')[1];
} else {
    userName = "Unknown";
}
console.log("\x1b[32m", `Welcome to the File Manager, ${userName}!`, "\x1b[0m")
currentDirPrint(currentDir);

rl.on('line', async (commandTxt) => {
    const splittedInput = inputSplitter(commandTxt);
    if (commandTxt === ".exit") {
        rl.close()
    } else if (commandTxt === "ls") {
        try {
            const dirItems = await list(currentDir);
            console.table(dirItems, ['Name', 'Type']);
            currentDirPrint(currentDir);
        } catch (e) {
            errorPrint(e)
        }
    } else if (commandTxt === "up") {
        currentDir = dirname(currentDir);
        currentDirPrint(currentDir);
    } else if (commandTxt === "os --username") {
        console.log(username());
        currentDirPrint(currentDir);
    } else if (commandTxt === "os --EOL") {
        console.log(eol());
        currentDirPrint(currentDir);
    } else if (commandTxt === "os --homedir") {
        console.log(homedir());
        currentDirPrint(currentDir);
    } else if (commandTxt === "os --architecture") {
        console.log(architecture());
        currentDirPrint(currentDir);
    } else if (commandTxt === "os --cpus") {
        const cpuItems = cpus();
        console.table(cpuItems, ['model', 'speed']);
        currentDirPrint(currentDir);
    } else if (commandTxt.startsWith("hash ")) {
        try {
            await hash(splittedInput[1], currentDir, () => currentDirPrint(currentDir));
        } catch (e) {
            errorPrint(e)
        }
    } else if (commandTxt.startsWith("cd ")) {
        try {
            currentDir = await cd(splittedInput[1], currentDir);
            currentDirPrint(currentDir);
        } catch (e) {
            errorPrint(e)
        }
    } else if (commandTxt.startsWith("cat ")) {
        try {
            await cat(splittedInput[1], currentDir, () => currentDirPrint(currentDir));
        } catch (e) {
            errorPrint(e)
        }
    } else if (commandTxt.startsWith("rm ")) {
        try {
            await del(splittedInput[1], currentDir, () => currentDirPrint(currentDir));
        } catch (e) {
            errorPrint(e)
        }

    } else if (commandTxt.startsWith("rn ")) {
        try {
            await rn(splittedInput[1], splittedInput[2], currentDir, () => currentDirPrint(currentDir));
        } catch (e) {
            errorPrint(e)
        }
    } else if (commandTxt.startsWith("cp ")) {
        try {
            await cp(splittedInput[1], splittedInput[2], currentDir, () => currentDirPrint(currentDir));
        } catch (e) {
            errorPrint(e)
        }
    } else if (commandTxt.startsWith("add ")) {
        try {
            await add(splittedInput[1], currentDir, () => currentDirPrint(currentDir));
        } catch (e) {
            errorPrint(e)
        }
    } else if (commandTxt.startsWith("mv ")) {
        try {
            await mv(splittedInput[1], currentDir, splittedInput[2], () => currentDirPrint(currentDir));
        } catch (e) {
            errorPrint(e)
        }
    } else if (commandTxt.startsWith("compress ")) {
        try {
            await compress(splittedInput[1], currentDir, splittedInput[2], () => currentDirPrint(currentDir));
        } catch (e) {
            errorPrint(e)
        }
    } else if (commandTxt.startsWith("decompress ")) {
        try {
            await decompress(splittedInput[1], currentDir, splittedInput[2], () => currentDirPrint(currentDir));
        } catch (e) {
            errorPrint(e)
        }
    } else {
        console.log("\x1b[33m", "Invalid input", "\x1b[0m");
    }
});

rl.on('close', () => {
    console.log("\x1b[32m", `Thank you for using File Manager, ${userName}, goodbye!`, "\x1b[0m");
});