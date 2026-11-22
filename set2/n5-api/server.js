// Full name: Ma. Jamaica LJ J. Lago
// Section: IV BSIT A
// Activity: N5 - REST API
// Date: November 23, 2026

const http = require("node:http");

const books = [
    { id: 1, title: "Noli Me Tangere", author: "José Rizal" },
    { id: 2, title: "Florante at Laura", author: "Francisco Balagtas" },
    { id: 3, title: "Dekada '70", author: "Lualhati Bautista" }
];

function sendJson(response, statusCode, data) {
    response.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8"
    });
    response.end(JSON.stringify(data));
}

const server = http.createServer((request, response) => {
    const { pathname } = new URL(request.url, "http://127.0.0.1:8001");

    if (request.method === "GET" && pathname === "/api/books") {
        return sendJson(response, 200, books);
    }

    // A path like /api/books/2 gives us the ID in match[1].
    const match = pathname.match(/^\/api\/books\/(\d+)$/);
    if (request.method === "GET" && match) {
        const id = Number(match[1]);
        const book = books.find((item) => item.id === id);

        if (!book) {
            return sendJson(response, 404, { message: "Book not found" });
        }

        return sendJson(response, 200, book);
    }

    return sendJson(response, 404, { message: "Route not found" });
});

server.listen(8001, "127.0.0.1", () => {
    console.log("N5 Books API running at http://127.0.0.1:8001/api/books");
});