// Full name: Ma. Jamaica LJ J. Lago
// Section: IV BSIT A
// Activity: N6 - Middleware and API Testing
// Date: November 23, 2026

const http = require("node:http");

const HOST = "127.0.0.1";
const PORT = 8002;
const BASE_URL = `http://${HOST}:${PORT}`;

const books = [
    { id: 1, title: "Noli Me Tangere", author: "José Rizal" },
    { id: 2, title: "Florante at Laura", author: "Francisco Balagtas" },
    { id: 3, title: "Dekada '70", author: "Lualhati Bautista" }
];

let nextBookId = 4;

function logger(request, response, next) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} | ${request.method} ${request.url}`);
    return next();
}

function jsonHeader(request, response, next) {
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    return next();
}

function sendJson(response, statusCode, data) {
    response.statusCode = statusCode;
    response.end(JSON.stringify(data));
}

async function readBookDetails(request) {
    request.setEncoding("utf8");

    let body = "";
    for await (const chunk of request) {
        body += chunk;
    }

    const data = JSON.parse(body);
    const title = typeof data?.title === "string" ? data.title.trim() : "";
    const author = typeof data?.author === "string" ? data.author.trim() : "";

    if (!title || !author) {
        throw new Error("Title and author are required");
    }

    return { title, author };
}

async function handleRequest(request, response) {
    const { pathname } = new URL(request.url, BASE_URL);
    const method = request.method;

    if (pathname === "/api/books") {
        if (method === "GET") {
            return sendJson(response, 200, books);
        }

        if (method === "POST") {
            const details = await readBookDetails(request);
            const book = { id: nextBookId++, ...details };

            books.push(book);
            return sendJson(response, 201, book);
        }

        response.setHeader("Allow", "GET, POST");
        return sendJson(response, 405, { message: "Method not allowed" });
    }

    const match = pathname.match(/^\/api\/books\/(\d+)$/);
    if (!match) {
        return sendJson(response, 404, { message: "Route not found" });
    }

    if (!["GET", "PUT", "DELETE"].includes(method)) {
        response.setHeader("Allow", "GET, PUT, DELETE");
        return sendJson(response, 405, { message: "Method not allowed" });
    }

    const id = Number(match[1]);
    const details = method === "PUT" ? await readBookDetails(request) : null;
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
        return sendJson(response, 404, { message: "Book not found" });
    }

    if (method === "GET") {
        return sendJson(response, 200, books[index]);
    }

    if (method === "PUT") {
        books[index] = { id, ...details };
        return sendJson(response, 200, books[index]);
    }

    const [deletedBook] = books.splice(index, 1);
    return sendJson(response, 200, {
        message: "Book deleted",
        book: deletedBook
    });
}

const server = http.createServer((request, response) => {
    return logger(request, response, () =>
        jsonHeader(request, response, () =>
            handleRequest(request, response).catch((error) => {
                const message = error instanceof SyntaxError
                    ? "Invalid JSON"
                    : "Title and author are required";

                return sendJson(response, 400, { message });
            })
        )
    );
});

server.listen(PORT, HOST, () => {
    console.log(`N6 Books API running at ${BASE_URL}/api/books`);
});