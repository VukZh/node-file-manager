import {join, sep} from "path";
import {rm} from "fs/promises";
import {createReadStream, createWriteStream} from "fs"
import {pipeline} from "stream"

const rn = async (pathOld, pathNew, dir, cb) => {

    if (!pathOld || !pathNew) {
        throw new Error("Invalid input")
    }

    return new Promise((res, rej) => {
        let oldFilePath = "";
        if (pathOld.includes(sep)) {
            oldFilePath = pathOld;
        } else {
            oldFilePath = join(dir, pathOld)
        }

        let newFilePath = "";
        if (pathNew.includes(sep)) {
            newFilePath = pathNew;
        } else {
            newFilePath = join(dir, pathNew)
        }

        const readStream = createReadStream(oldFilePath)
        const writeStream = createWriteStream(newFilePath)

        pipeline(readStream, writeStream, async (err) => {
            if (err) {
                rej(new Error("rename file error"));
            } else {
                await rm(oldFilePath)
                res();
                cb();
            }
        })
    })
};

export default rn;