import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

import { runLandExpand } from "./lib/process";

async function main() {
  const limitArg = process.argv.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : undefined;

  console.log("Starting land-and-expand run...");
  const result = await runLandExpand({ limit: Number.isFinite(limit) ? limit : undefined });
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
