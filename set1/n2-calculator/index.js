
 // Name: Ma. Jamaica LJ J. Lago
 // Section: IV-BSIT A
 // Activity: N2 - Modular Calculator
 // Date: November 16, 2026

 // Import custom modules
 const operations = require("./operations");
 const { formatResult } = require("./formatter");

 // Import a built-in Node.js module
const path = require("path");

// Built-in module used to identify the current script
const scriptName = path.basename(__filename);

 // Read the operation and numbers from the command line
 const [operation, input1, input2] = process.argv.slice(2);

 // Check if all required arguments were entered
 if (!operation || input1 === undefined || input2 === undefined) {
     console.log("ELEC 3 - Modular Calculator");
     console.log("Student: Ma. Jamaica LJ J. Lago");
     console.log("Usage: node index.js <operation> <number1> <number2>");
     console.log("Operations: add, subtract, multiply, divide, average");

 } else if (!Object.prototype.hasOwnProperty.call(operations, operation)) {
     console.log(`Error: Unknown operation "${operation}".`);

 } else {
     const num1 = Number(input1);
     const num2 = Number(input2);

     // Validate both numbers
     if (
         input1.trim() === "" ||
         input2.trim() === "" ||
         !Number.isFinite(num1) ||
         !Number.isFinite(num2)
     ) {
         console.log("Error: Please enter two valid numbers.");

     } else {
         try {
             // Call the selected calculator function
             const result = operations[operation](num1, num2);

             console.log("--------------------------------");
             console.log("ELEC 3 - MODULAR CALCULATOR");
             console.log("Student: Ma. Jamaica LJ J. Lago");

             console.log("--------------------------------");
             console.log(formatResult(operation, num1, num2, result));

         } catch (error) {
             console.log("Error: " + error.message);
         }
     }
 }
