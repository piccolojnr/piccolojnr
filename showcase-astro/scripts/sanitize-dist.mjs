import { rmSync } from "node:fs";
import { join } from "node:path";

const dataFile = join(process.cwd(), "dist", "data", "projects.json");
rmSync(dataFile, { force: true });
console.log("[sanitize-dist] Removed raw portfolio source data from the public build.");
