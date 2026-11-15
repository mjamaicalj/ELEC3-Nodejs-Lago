// Name: Ma. Jamaica LJ J. Lago
// Section: IV-BSIT A
// Activity: N3 - File Manager with fs and path
// Date: November 16, 2026

const fs = require("fs");
const path = require("path");

// Create the files folder
const filesFolder = path.join(__dirname, "files");
fs.mkdirSync(filesFolder, { recursive: true });

// Get command-line inputs
const [command, fileName, ...textParts] = process.argv.slice(2);
const content = textParts.join(" ");

function getFilePath(name) {
    if (!name || path.basename(name) !== name ||
        path.extname(name).toLowerCase() !== ".txt") {
        throw new Error("Please enter a valid .txt filename.");
    }

    return path.join(filesFolder, name);
}

// Create a text file
function createFile(name, text) {
    const filePath = getFilePath(name);

    if (fs.existsSync(filePath)) {
        console.log("File already exists.");
        return;
    }

    fs.writeFileSync(filePath, text, "utf8");
    console.log("File created successfully: " + name);
}

// Read a text file
function readFile(name) {
    const filePath = getFilePath(name);
    const content = fs.readFileSync(filePath, "utf8");

    console.log("File Name: " + name);
    console.log("Content: " + content);
}

try {
    switch (command) {
        case "create":
            if (!fileName || textParts.length === 0) {
                console.log('Usage: node index.js create notes.txt "Hello"');
            } else {
                createFile(fileName, content);
            }
            break;

        case "read":
            readFile(fileName);
            break;

        default:
            console.log("Available commands: create, read");
    }
} catch (error) {
    if (error.code === "ENOENT") {
        console.log("Error: File does not exist.");
    } else {
        console.log("Error: " + error.message);
    }
}