import {join} from "path";
import {pipeline} from "stream"
import {createReadStream} from "fs"
import {sep} from "path";
import {Writable} from "stream";
const cat = async (path, dir, cb) => {

    let readFilePath = "";
    if (path.includes(sep)) {
        readFilePath = path;
    } else {
        readFilePath = join(dir, path)
    }

    let capturedData = '';

    const readStream = createReadStream(readFilePath, { encoding: 'utf8' });

    const writableStream = new Writable({
        write(chunk, encoding, callback) {
            capturedData += chunk;
            callback();
        }
    });

    try {
        await pipeline(
            readStream,
            writableStream,
            (err) => {
                if (err) {
                    throw new Error("read file error")
                } else {
                    console.log(capturedData);
                    cb();
                }
            }
        );
    } catch (error) {
        console.log(error)
    }

};

export default cat;