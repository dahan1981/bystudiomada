const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "public");

if (path.dirname(output) !== root || path.basename(output) !== "public") {
  throw new Error("Unexpected public output path");
}

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

function copyFile(source, destination = source) {
  const sourcePath = path.join(root, source);
  const destinationPath = path.join(output, destination);
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
}

function copyDirectory(source) {
  fs.cpSync(path.join(root, source), path.join(output, source), { recursive: true });
}

["index.html", "styles.css", "script.js"].forEach((file) => copyFile(file));
["Logos", "CEOs"].forEach((directory) => copyDirectory(directory));
[
  "DS/origin.jpeg",
  "DS/history.jpeg",
  "DS/instagram-svgrepo-com.svg",
  "DS/tiktok-svgrepo-com.svg",
  "DS/threads.svg",
].forEach((file) => copyFile(file));
[
  "portal-mada/index.html",
  "portal-mada/styles.css",
  "portal-mada/app.js",
].forEach((file) => copyFile(file));

process.stdout.write(`Static output created at ${output}`);
