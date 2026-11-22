// Full name: Ma. Jamaica LJ J. Lago
// Section: IV BSIT A
// Activity: N4 - Basic HTTP Server
// Date: November 22, 2026

const http = require("node:http");

const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    response.end(`
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>N4 Home</title>
            </head>
            <body>
                <h1>N4 Basic HTTP Server</h1>
                <p>Name: Ma. Jamaica LJ J. Lago</p>
                <p>Section: IV BSIT A</p>
            </body>
        </html>
    `);
});

server.listen(8000, "127.0.0.1", () => {
    console.log("N4 server running at http://127.0.0.1:8000/");
});