import {join, sep} from "path";
import {writeFile, access} from "fs/promises";

const add = async (path, dir, cb) => {
    let newFilePath = "";
    try {
        if (path.includes(sep)) {
            throw new Error("not current working directory")
        } else {
            newFilePath = join(dir, path)
        }
        await access(newFilePath);
        throw new Error("FS operation failed")
    } catch (error) {
        if (error.code === "ENOENT") {
            await writeFile(newFilePath, "");
            cb()
        } else {
            throw error
        }
    }
};

export default add;