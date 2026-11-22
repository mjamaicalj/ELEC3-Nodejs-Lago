
 // Name: Ma. Jamaica LJ J. Lago
 // Section: IV-BSIT A
 // Activity: N2 - Modular Calculator
 // Date: November 16, 2026

 // Format the calculator result for display
 function formatResult(operation, num1, num2, result) {
     const symbols = {
         add: "+",
         subtract: "-",
         multiply: "*",
         divide: "/"
     };

     if (operation === "average") {
         return `Average of ${num1} and ${num2} = ${result}`;
     }

     return `${num1} ${symbols[operation]} ${num2} = ${result}`;
 }

 // Export the formatting function
 module.exports = { formatResult };
