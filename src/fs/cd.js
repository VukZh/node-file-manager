import {join, sep, dirname} from "path";

const cd = (path, dir) => {
    let nextPath = "";
    if (path === "..") {
        nextPath = dirname(dir);
    } else if (path.includes(sep) || path.endsWith(":")) {
        nextPath = path;
    } else {
        nextPath = join(dir, path)
    }
    return nextPath.endsWith(sep) ? nextPath : nextPath + sep;
};

export default cd;