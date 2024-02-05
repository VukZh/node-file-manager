import {join, sep, dirname} from "path";
import {access} from "fs/promises";

const cd = async (path, dir) => {
    let nextPath = "";
    if (path === "..") {
        nextPath = dirname(dir);
    } else if (path.includes(sep) || path.endsWith(":")) {
        nextPath = path;
    } else {
        nextPath = join(dir, path)
    }
    const nextDir = nextPath.endsWith(sep) ? nextPath : nextPath + sep;
    try {
        const r = await access(nextDir);
    } catch (err) {
        if (err.code === "ENOENT") {
            throw new Error("Operation failed")
        }
        return dir
    }
    return nextDir
};

export default cd;