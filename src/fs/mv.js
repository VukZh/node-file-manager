import {join, sep} from "path";
import {rm} from "fs/promises";
import {createReadStream, createWriteStream} from "fs"
import {pipeline} from "stream"

const mv = async (path, dir, newDir, cb) => {

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

    try {
        await pipeline(readStream, writeStream, (err) => {
            if (err) throw new Error("move file error")
        })
        await rm(oldFilePath)
        cb()
    } catch (error) {
        console.log(error)
    }
};

export default mv;