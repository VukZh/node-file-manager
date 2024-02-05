import {join, sep} from "path";
import {createReadStream, createWriteStream} from "fs"
import {pipeline} from "stream"
import zlib from "zlib"

const compress = async (path, dir, newDir, cb) => {
    return new Promise((res, rej) => {
        let oldFilePath = "";
        if (path.includes(sep)) {
            oldFilePath = path;
        } else {
            oldFilePath = join(dir, path)
        }

        const nameParse = oldFilePath.split(sep);
        const name = nameParse[nameParse.length - 1] + ".br";
        const newFilePath = join(newDir, name)

        const readStream = createReadStream(oldFilePath)
        const writeStream = createWriteStream(newFilePath)
        const compressStream = zlib.BrotliCompress();

        pipeline(readStream, compressStream, writeStream, (err) => {
            if (err) {
                rej(new Error("compress file error"));
            } else {
                res();
                cb();
            }
        })
    })

};

export default compress;