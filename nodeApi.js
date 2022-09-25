import {fileURLToPath} from "url";
import * as fs from 'fs';
import path from 'path';

// NODE API
export function writeToFile(fileName, newlyGeneratedCode) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const absolutePath = path.join(__dirname, fileName);
    fs.writeFile(absolutePath, newlyGeneratedCode, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

export function readFromFile(fileName) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const absolutePath = path.join(__dirname, fileName);
    return fs.readFileSync(
        absolutePath,
        {
            encoding: 'utf-8',
        },
    );
}
