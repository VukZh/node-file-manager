import {readdir, stat} from "fs/promises";
import {join} from "path";

const list = async (path) => {
    const currentDir = path;

    try {
        const dirItems = await readdir(currentDir);
        const itemsPaths = dirItems.map(item => join(currentDir, item));
        const isFileArrayPromises = itemsPaths.map(async (item) => {
            let statItem;
            try {
                statItem = await stat(item, {hidden: true, includeHidden: true});
            } catch (e) {
            }
            return statItem?.isFile();
        })

        const isFileArray = await Promise.all(isFileArrayPromises);

        const dirItemsWithFlag = dirItems.map((item, ind) => ({
            Name: item,
            Type: isFileArray[ind] ? "File" : "Dir"
        }))
        const dirItemsDirs = dirItemsWithFlag.filter(item => item.Type === "Dir").sort((a, b) => a.Name.localeCompare(b.Name, 'en', {sensitivity: 'base'}))
        const dirItemsFiles = dirItemsWithFlag.filter(item => item.Type === "File").sort((a, b) => a.Name.localeCompare(b.Name, 'en', {sensitivity: 'base'}))

        return [...dirItemsDirs, ...dirItemsFiles]

    } catch (error) {
        throw new Error("FS operation failed")
    }
};

export default list;