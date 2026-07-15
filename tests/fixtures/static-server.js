const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.resolve(process.cwd());
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".png": "image/png" };
const server = http.createServer((request, response) => {
  if (request.url.startsWith("/api/portal-auth")) {
    response.writeHead(401, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ user: null }));
    return;
  }
  const pathname = request.url === "/portal-mada/" ? "/portal-mada/index.html" : request.url.split("?")[0];
  const filename = path.resolve(root, `.${pathname}`);
  if (!filename.startsWith(root) || !fs.existsSync(filename) || fs.statSync(filename).isDirectory()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": types[path.extname(filename)] || "application/octet-stream" });
  fs.createReadStream(filename).pipe(response);
});
server.listen(4179, "127.0.0.1");
