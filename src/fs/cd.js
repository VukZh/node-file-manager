import {join, sep, dirname} from "path";
import {access} from "fs/promises";

const cd = async (path, dir) => {
    if (!path) {
        throw new Error("Invalid input")
    }
    let nextPath = "";
    if (path === "..") {
        nextPath = dirname(dir);
    } else if (path.includes(":")) {
        nextPath = path.endsWith(":") ? path + sep : path
    } else {
        nextPath = join(dir, path)
    }
    try {
        await access(nextPath);
    } catch (err) {
        if (err.code === "ENOENT") {
            throw new Error("directory not exists")
        }
        return dir
    }
    return nextPath
};

export default cd;