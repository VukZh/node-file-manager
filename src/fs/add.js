import {join, sep} from "path";
import {writeFile, access} from "fs/promises";

const add = async (path, dir, cb) => {

    if (!path) {
        throw new Error("Invalid input")
    }

    let newFilePath = "";
    try {
        if (path.includes(sep)) {
            throw new Error("not current working directory")
        } else {
            newFilePath = join(dir, path)
        }
        await access(newFilePath);
        throw new Error("file exists")
    } catch (error) {
        if (error.code === "ENOENT") {
            await writeFile(newFilePath, "");
            cb()
        } else {
            throw new Error("add error")
        }
    }
};

export default add;