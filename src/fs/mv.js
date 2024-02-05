import {join, sep} from "path";
import {rm} from "fs/promises";
import {createReadStream, createWriteStream} from "fs"
import {pipeline} from "stream"

const mv = async (path, dir, newDir, cb) => {

    if (!path || !newDir) {
        throw new Error("Invalid input")
    }

    return new Promise((res, rej) => {
        let oldFilePath = "";
        if (path.includes(sep)) {
            oldFilePath = path;
        } else {
            oldFilePath = join(dir, path)
        }

        const nameParse = oldFilePath.split(sep);
        const name = nameParse[nameParse.length - 1];
        const newFilePath = join(newDir, name)

        const readStream = createReadStream(oldFilePath)
        const writeStream = createWriteStream(newFilePath)

        pipeline(readStream, writeStream, async (err) => {
            if (err) {
                rej(new Error("move file error"));
            } else {
                await rm(oldFilePath)
                res();
                cb();
            }
        })
    })
};

export default mv;