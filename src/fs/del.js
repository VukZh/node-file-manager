import {join, sep} from "path";
import {rm, access} from "fs/promises";

const del = async (path, dir, cb) => {

    if (!path) {
        throw new Error("Invalid input")
    }

    let delFilePath = "";
    if (path.includes(sep)) {
        delFilePath = path;
    } else {
        delFilePath = join(dir, path)
    }

    try {
        await access(delFilePath)
        await rm(delFilePath)
        cb()
    } catch (error) {
        throw new Error("delete file error")
    }
};

export default del;