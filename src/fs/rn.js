import {join, sep} from "path";
import {rm} from "fs/promises";
import {createReadStream, createWriteStream} from "fs"
import {pipeline} from "stream"

const rn = async (pathOld, pathNew, dir, cb) => {

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

    try {
        await pipeline(readStream, writeStream, (err) => {
            if (err) throw new Error("rename file error")
        })
        await rm(oldFilePath)
        cb()
    } catch (error) {
        console.log(error)
    }
};

export default rn;