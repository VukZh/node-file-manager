import {join, sep} from "path";
import {createReadStream, createWriteStream} from "fs"
import {pipeline} from "stream"
import zlib from "zlib"

const decompress = async (path, dir, newDir, cb) => {

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

    try {
        await pipeline(readStream, compressStream, writeStream, (err) => {
            if (err) throw new Error("compress error")
        })
        cb()
    } catch (error) {
        console.log(error)
    }
};

export default decompress;