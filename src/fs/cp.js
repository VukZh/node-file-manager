import {join, sep} from "path";
import {createReadStream, createWriteStream} from "fs"
import {pipeline} from "stream"


const cp = async (pathOld, pathNew, dir, cb) => {

    return new Promise((res, rej) => {
        let oldFilePath = "";
        if (pathOld.includes(sep)) {
            oldFilePath = pathOld;
        } else {
            oldFilePath = join(dir, pathOld)
        }

        const nameParse = oldFilePath.split(sep);
        const name = nameParse[nameParse.length - 1];
        const newFilePath = join(pathNew, name)

        const readStream = createReadStream(oldFilePath)
        const writeStream = createWriteStream(newFilePath)

        pipeline(readStream, writeStream, (err) => {
            if (err) {
                rej(new Error("copy file error"));
            } else {
                res();
                cb();
            }
        })
    })
};

export default cp;