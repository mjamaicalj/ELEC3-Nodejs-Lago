
 // Name: Ma. Jamaica LJ J. Lago
 // Section: IV-BSIT A
 // Activity: N3 - File Manager with fs and path
 // Date: November 16, 2026

 const fs = require("fs");
 const path = require("path");

 // Create the folder where text files are stored
 const filesFolder = path.join(__dirname, "files");
 fs.mkdirSync(filesFolder, { recursive: true });

 // Read commands from the terminal
 const [command, fileName, ...textParts] = process.argv.slice(2);
 const content = textParts.join(" ");

 console.log("--------------------------------");
 console.log("ELEC 3 - NODE.JS FILE MANAGER");
 console.log("Student: Ma. Jamaica LJ J. Lago");
 console.log("--------------------------------");

 // Validate the filename and build its path
 function getFilePath(name) {
     if (
         !name ||
         path.basename(name) !== name ||
         name.includes("/") ||
         name.includes("\\") ||
         name.includes(":") ||
         path.extname(name).toLowerCase() !== ".txt"
     ) {
         throw new Error("Please enter a valid .txt filename.");
     }

     return path.join(filesFolder, name);
 }

 // CREATE - Create a new text file
 function createFile(name, text) {
     const filePath = getFilePath(name);

     if (fs.existsSync(filePath)) {
         console.log("Error: File already exists.");
         return;
     }

     fs.writeFileSync(filePath, text, "utf8");
     console.log(`File created successfully: ${name}`);
 }

 // READ - Display the contents of a file
 function readFile(name) {
     const filePath = getFilePath(name);
     const text = fs.readFileSync(filePath, "utf8");

     console.log(`File Name: ${name}`);
     console.log(`Content: ${text}`);
 }

 // UPDATE - Append new content to a file
 function updateFile(name, text) {
     const filePath = getFilePath(name);

     if (!fs.existsSync(filePath)) {
         console.log("Error: File does not exist.");
         return;
     }

     fs.appendFileSync(filePath, "\n" + text, "utf8");
     console.log(`File updated successfully: ${name}`);
 }

 // DELETE - Delete an existing text file
 function deleteFile(name) {
     const filePath = getFilePath(name);

     fs.unlinkSync(filePath);
     console.log(`File deleted successfully: ${name}`);
 }

 // LIST - Display all text files and their information
 function listFiles() {
     const files = fs.readdirSync(filesFolder);

     const textFiles = files.filter(name => {
         const filePath = path.join(filesFolder, name);

         return (
             fs.statSync(filePath).isFile() &&
             path.extname(name).toLowerCase() === ".txt"
         );
     });

     if (textFiles.length === 0) {
         console.log("No text files found.");
         return;
     }

     console.log(`Total Text Files: ${textFiles.length}`);

     textFiles.forEach((name, index) => {
         const filePath = path.join(filesFolder, name);
         const fileContent = fs.readFileSync(filePath, "utf8");

         console.log(`\nFile ${index + 1}`);
         console.log(`Full Path: ${filePath}`);
         console.log(`File Name: ${path.basename(filePath)}`);
         console.log(`Extension: ${path.extname(filePath)}`);
         console.log(`Contents:\n${fileContent}`);
         console.log("--------------------------------");
     });
 }

 // Run the selected command
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

         case "update":
             if (!fileName || textParts.length === 0) {
                 console.log('Usage: node index.js update notes.txt "New text"');
             } else {
                 updateFile(fileName, content);
             }
             break;

         case "delete":
             deleteFile(fileName);
             break;

         case "list":
             listFiles();
             break;

         default:
             console.log("Available commands:");
             console.log("create, read, update, delete, list");
     }
 } catch (error) {
     if (error.code === "ENOENT") {
         console.log("Error: File does not exist.");
     } else {
         console.log("Error: " + error.message);
     }
 }
