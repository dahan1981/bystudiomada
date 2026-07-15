const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const roots = ["api", "lib", "tools"];
const files = ["portal-mada/app.js"];
for (const root of roots) {
  const visit = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(filename);
      else if (entry.name.endsWith(".js")) files.push(filename);
    }
  };
  visit(root);
}

for (const filename of files) {
  const result = spawnSync(process.execPath, ["--check", filename], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}

const forbidden = ["INITIAL_MANAGER_CREDENTIAL", "passwordHash", "passwordSalt", "portal-mada`"];
const searchable = files.filter((filename) => path.normalize(filename) !== path.normalize("tools/portal-check.js"))
  .map((filename) => fs.readFileSync(filename, "utf8")).join("\n");
for (const value of forbidden) {
  if (searchable.includes(value)) {
    console.error(`Forbidden legacy credential marker: ${value}`);
    process.exit(1);
  }
}
console.log(`Checked ${files.length} JavaScript files`);
