import {join, sep} from "path";
import {createReadStream, createWriteStream} from "fs"
import {pipeline} from "stream"
import zlib from "zlib"

const decompress = async (path, dir, newDir, cb) => {

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
        const name = nameParse[nameParse.length - 1].endsWith(".br") ? nameParse[nameParse.length - 1].slice(0, -3) : nameParse[nameParse.length - 1];
        const newFilePath = join(newDir, name)

        const readStream = createReadStream(oldFilePath)
        const writeStream = createWriteStream(newFilePath)
        const decompressStream = zlib.BrotliDecompress();

        pipeline(readStream, decompressStream, writeStream, (err) => {
            if (err) {
                rej(new Error("decompress file error"));
            } else {
                res();
                cb();
            }
        })
    })
};

export default decompress;