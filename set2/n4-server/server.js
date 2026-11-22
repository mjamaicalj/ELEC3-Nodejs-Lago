// Full name: Ma. Jamaica LJ J. Lago
// Section: IV BSIT A
// Activity: N4 - Basic HTTP Server
// Date: November 22, 2026

const http = require("node:http");

const pages = new Map([
    ["/", {
        title: "N4 Basic HTTP Server",
        description: "Welcome to my home page."
    }],
    ["/about", {
        title: "About",
        description: "I am a BSIT student learning how to build web servers with Node.js."
    }],
    ["/contact", {
        title: "Contact",
        description: "You can reach me through our class communication channel."
    }]
]);

const server = http.createServer((request, response) => {
    const path = new URL(request.url, "http://127.0.0.1:8000").pathname;
    const page = pages.get(path);

    const title = page ? page.title : "404 - Page not found";
    const description = page ? page.description : "The requested page does not exist.";

    response.writeHead(page ? 200 : 404, {
        "Content-Type": "text/html; charset=utf-8"
    });

    response.end(`
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>${title}</title>
            </head>
            <body>
                <nav>
                    <a href="/">Home</a> |
                    <a href="/about">About</a> |
                    <a href="/contact">Contact</a>
                </nav>

                <h1>${title}</h1>
                <p>${description}</p>
                <p>Name: Ma. Jamaica LJ J. Lago</p>
                <p>Section: IV BSIT A</p>
            </body>
        </html>
    `);
});

server.listen(8000, "127.0.0.1", () => {
    console.log("N4 server running at http://127.0.0.1:8000/");
});