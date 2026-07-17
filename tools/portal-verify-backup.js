const crypto = require("crypto");
const fs = require("fs");

const filename = process.argv[2];
if (!filename) {
  console.error("Usage: node tools/portal-verify-backup.js <backup.json>");
  process.exit(1);
}

const backup = JSON.parse(fs.readFileSync(filename, "utf8"));
const expected = backup.sha256;
delete backup.sha256;
const actual = crypto.createHash("sha256").update(JSON.stringify(backup)).digest("hex");
if (!expected || expected !== actual) {
  console.error("Backup checksum mismatch");
  process.exit(1);
}
if (backup.format !== "portal-mada-backup-v1" || !backup.legacy || !backup.totals) {
  console.error("Unsupported backup format");
  process.exit(1);
}
const storageFiles = backup.storageBackup?.files || [];
if (backup.storageBackup?.complete) {
  for (const item of storageFiles) {
    const objectPath = require("path").resolve(require("path").dirname(filename), item.file);
    if (!fs.existsSync(objectPath)) {
      console.error(`Storage backup missing: ${item.name}`);
      process.exit(1);
    }
    const actualStorageHash = crypto.createHash("sha256").update(fs.readFileSync(objectPath)).digest("hex");
    if (actualStorageHash !== item.sha256) {
      console.error(`Storage backup checksum mismatch: ${item.name}`);
      process.exit(1);
    }
  }
}
console.log(JSON.stringify({ valid: true, createdAt: backup.createdAt, totals: backup.totals }, null, 2));
