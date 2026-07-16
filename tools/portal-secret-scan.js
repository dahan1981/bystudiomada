const { execFileSync } = require("child_process");

const patterns = [
  /sb_(?:secret|service_role)_[A-Za-z0-9_-]{20,}/i,
  /postgres(?:ql)?:\/\/[^\s"']+:[^\s"']+@/i,
  /(?:euDahan123|Joao123|Nina123)/i,
];

let files = [];
try {
  files = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], { encoding: "utf8" })
    .split(/\r?\n/).filter(Boolean).filter((file) => !file.startsWith("DS/"));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const findings = [];
for (const file of files) {
  if (file === "tools/portal-secret-scan.js") continue;
  let content;
  try { content = require("fs").readFileSync(file, "utf8"); } catch { continue; }
  if (patterns.some((pattern) => pattern.test(content))) findings.push(file);
}
if (findings.length) {
  console.error(`Possible credential material found in: ${findings.join(", ")}`);
  process.exit(1);
}
console.log(`Secret scan passed for ${files.length} tracked files`);
