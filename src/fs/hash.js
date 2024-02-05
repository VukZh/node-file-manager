import {join} from "path";
import {pipeline} from "stream"
import {createHash} from "crypto"
import {createReadStream} from "fs"
import {sep} from "path";

const calculateHash = async (path, dir, cb) => {

    if (!path) {
        throw new Error("Invalid input")
    }

    return new Promise((res, rej) => {
        let encodedFile = "";
        if (path.includes(sep)) {
            encodedFile = path;
        } else {
            encodedFile = join(dir, path)
        }

        const readStream = createReadStream(encodedFile)
        const encodedStream = createHash("sha256")
        encodedStream.setEncoding('hex')

        pipeline(readStream, encodedStream, (err) => {
            if (err) {
                rej(new Error("calculateHash error"));
            } else {
                const hashResult = encodedStream.read();
                console.log(hashResult);
                res();
                cb();
            }
        })
    })
};

export default calculateHash;