import {join} from "path";
import {pipeline} from "stream"
import {createReadStream} from "fs"
import {sep} from "path";
import {Writable} from "stream";

const cat = async (path, dir, cb) => {

    if (!path) {
        throw new Error("Invalid input")
    }

    return new Promise((res, rej) => {
        let readFilePath = "";
        if (path.includes(sep)) {
            readFilePath = path;
        } else {
            readFilePath = join(dir, path)
        }

        let capturedData = '';

        const readStream = createReadStream(readFilePath, {encoding: 'utf8'});

        const writableStream = new Writable({
            write(chunk, encoding, callback) {
                capturedData += chunk;
                callback();
            }
        });

        pipeline(
            readStream,
            writableStream,
            (err) => {
                if (err) {
                    rej(new Error("read file error"));
                } else {
                    console.log(capturedData);
                    res();
                    cb();
                }
            }
        );
    })
};

export default cat;