import {join} from "path";
import {pipeline} from "stream"
import {createHash} from "crypto"
import {createReadStream} from "fs"
import {sep} from "path";

const calculateHash = async (path, dir) => {

    let encodedFile = "";
    if (path.includes(sep)) {
        encodedFile = path;
    } else {
        encodedFile = join(dir, path)
    }

    const readStream = createReadStream(encodedFile)
    const encodedStream = createHash("sha256")
    encodedStream.setEncoding('hex')

    try {
        await pipeline(readStream, encodedStream, (err) => {
            if (err) {
                throw new Error("calculateHash error")
            }
            const hashResult = encodedStream.read();
            console.log(hashResult);
        })
    } catch (error) {
        console.log(error)
    }
};

export default calculateHash;